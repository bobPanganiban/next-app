import { warehouseInvoiceSchema } from "@/app/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = warehouseInvoiceSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const payload = {
    from: body.warehouseId,
    to: body.targetWarehouseId,
    transactions: body.transactions,
  };

  try {
    const invoice = await prisma.warehouseInvoices.create({
      data: {
        warehouseId: payload.from,
        targetWarehouseId: payload.to,
      },
    });

    if (invoice) {
      for (let transaction of body.transactions) {
        const trans = await prisma.warehouseTransactions.create({
          data: {
            count: transaction.quantityTransfered,
            invoiceId: invoice.id,
            inventoryId: transaction.id,
          },
        });

        if (trans) {
          await prisma.inventory.update({
            where: {
              id: transaction.id,
            },
            data: {
              count: transaction.quantityRemain,
            },
          });
        }
      }
      return NextResponse.json(
        {
          message: `Invoice created: ${JSON.stringify(invoice)}`,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 400 }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { message: `Internal Server Error : ${err.message}` },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  const invoice = await prisma.warehouseInvoices.findUnique({
    where: {
      id: body.id,
    },
  });

  if (!invoice)
    return NextResponse.json({ message: "Invoice not found" }, { status: 404 });

  const transactions = await prisma.warehouseTransactions.findMany({
    where: {
      invoiceId: invoice.id,
    },
    select: {
      count: true,
      Inventory: {
        select: {
          itemId: true,
          price: true,
        },
      },
    },
  });

  if (transactions.length === 0)
    return NextResponse.json({ message: "Invoice is empty" }, { status: 200 });

  // loop thru transactions
  for (let transaction of transactions) {
    // check if current inventory exists
    const existingInventory = await prisma.inventory.findFirst({
      where: {
        itemId: transaction.Inventory.itemId,
        price: transaction.Inventory.price,
        warehouseId: invoice.targetWarehouseId,
      },
    });
    // update if have
    if (existingInventory) {
      await prisma.inventory.update({
        where: {
          id: existingInventory.id,
        },
        data: {
          count: existingInventory.count + transaction.count,
        },
      });
    } else {
      await prisma.inventory.create({
        data: {
          count: transaction.count,
          itemId: transaction.Inventory.itemId,
          price: transaction.Inventory.price,
          warehouseId: invoice.targetWarehouseId,
        },
      });
    }
  }

  const updatedInvoice = await prisma.warehouseInvoices.update({
    where: {
      id: invoice.id,
    },
    data: {
      isFullfilled: true,
    },
  });

  return NextResponse.json(updatedInvoice, { status: 200 });
}
