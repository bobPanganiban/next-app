import { customerInvoiceSchema } from "@/app/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { ItemFormEntry } from "@/app/admin/transactions/customer/CustomerItemTable";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = customerInvoiceSchema.safeParse(body);
  let customer = body.customer;

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // set invoice number
  if (body.invoiceNumber) {
    const lastInvoice = await prisma.customerInvoices.findFirst({
      where: {
        invoiceNumber: {
          startsWith: body.invoiceNumber,
        },
      },
      orderBy: {
        dateCreated: "desc",
      },
    });

    if (!lastInvoice) {
      body.invoiceNumber = `${body.invoiceNumber}001`;
    } else {
      let lastNumber = parseInt(
        lastInvoice.invoiceNumber.replace(body.invoiceNumber, "")
      );
      if (lastNumber === 200) {
        lastNumber = 1;
      } else {
        lastNumber++;
      }
      body.invoiceNumber = `${body.invoiceNumber}${lastNumber
        .toString()
        .padStart(3, "0")}`;

      await prisma.customerInvoices.deleteMany({
        where: {
          invoiceNumber: body.invoiceNumber,
        },
      });
    }

    // find invoice number and
  } else {
    return NextResponse.json(
      { message: "Invoice Creation Failed" },
      { status: 500 }
    );
  }

  //   check if the customer exists
  if (!customer.existingCustomer) {
    //   if not create new customer
    const newCustomer = await prisma.customers.create({
      data: {
        name: customer.name,
        address: customer.address,
        termId: customer.termId,
      },
    });

    customer.id = newCustomer.id;
  }
  // create a customerInvoice Entry
  const newInvoice = await prisma.customerInvoices.create({
    data: {
      invoiceDate: new Date(body.invoiceDate),
      invoiceNumber: body.invoiceNumber,
      customerId: customer.id,
      totalAmount: body.totalAmount,
      isfulfilled: customer.termId === 1 ? true : false,
      isCompleted: body.transactions.some(
        (transaction: ItemFormEntry) => transaction.supplied !== "ALL"
      ),
    },
  });
  // create transaction entries
  if (newInvoice.id) {
    for (const transaction of body.transactions) {
      const newTransaction = await prisma.customerTransactions.create({
        data: {
          invoiceId: newInvoice.id,
          customerPrice: transaction.price,
          quantity: transaction.quantity,
          supplied: transaction.quantitySupplied,
          itemId: transaction.itemId,
          storePrice: transaction.storePrice,
          isSpecialPrice: transaction.isSpecialPrice,
        },
      });

      if (newTransaction.id) {
        const inventoryEntriesMain = await prisma.inventory.findMany({
          where: {
            itemId: newTransaction.itemId,
            warehouseId: body.warehouseId,
          },
          orderBy: { price: "asc" },
        });

        let quantityToDeduct = newTransaction.quantity;

        for (let inventory of inventoryEntriesMain) {
          if (quantityToDeduct <= 0) break;
          if (inventory.count >= quantityToDeduct) {
            await prisma.inventory.update({
              where: { id: inventory.id },
              data: { count: { decrement: quantityToDeduct } },
            });
            quantityToDeduct = 0;
          } else {
            quantityToDeduct -= inventory.count;
            await prisma.inventory.delete({
              where: { id: inventory.id },
            });
          }
        }

        if (quantityToDeduct > 0) {
          const inventoryEntriesSecondary = await prisma.inventory.findMany({
            where: {
              itemId: newTransaction.itemId,
              warehouseId: {
                not: body.warehouseId,
              },
            },
            orderBy: { price: "asc" },
          });

          for (let inventory of inventoryEntriesSecondary) {
            if (quantityToDeduct <= 0) break;
            if (inventory.count >= quantityToDeduct) {
              await prisma.inventory.update({
                where: { id: inventory.id },
                data: { count: { decrement: quantityToDeduct } },
              });
              quantityToDeduct = 0;
            } else {
              quantityToDeduct -= inventory.count;
              await prisma.inventory.delete({
                where: { id: inventory.id },
              });
            }
          }
        }

        if (quantityToDeduct > 0) {
          await prisma.customerTransactions.update({
            where: { id: newTransaction.id },
            data: {
              supplied: newTransaction.quantity - quantityToDeduct,
            },
          });

          await prisma.customerInvoices.update({
            where: { id: newInvoice.id },
            data: { isCompleted: false },
          });

          console.log("Not enough inventory to fulfill the transaction.");
        }
      }
    }
  }
  return NextResponse.json(newInvoice, { status: 200 });
}
