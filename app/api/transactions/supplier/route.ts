import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { invoiceSchema } from "@/app/validationSchema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = invoiceSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const supplier = await prisma.suppliers.findUnique({
      where: { id: body.supplierId },
      select: {
        termId: true,
      },
    });

    // create a new invoice record
    const invoiceData = await prisma.supplierInvoices.create({
      data: {
        supplierId: body.supplierId,
        invoiceNumber: body.invoiceNumber,
        invoiceDate: new Date(body.invoiceDate),
        totalAmount: body.totalAmount,
        isfulfilled: supplier?.termId === 1 ? true : false,
      },
    });

    // Process all items
    for (const item of body.items) {
      let inventoryId;
      const inventory = await prisma.inventory.findFirst({
        where: {
          itemId: item.id,
          price: parseFloat(item.price),
          warehouseId: parseInt(body.warehouseId),
        },
      });

      if (!inventory) {
        const newInventory = await prisma.inventory.create({
          data: {
            count: parseInt(item.qty),
            itemId: item.id,
            warehouseId: body.warehouseId,
            price: parseFloat(item.price),
          },
        });
        inventoryId = newInventory.id;
      } else {
        await prisma.inventory.update({
          where: { id: inventory.id },
          data: { count: parseInt(item.qty) + inventory.count },
        });
        inventoryId = inventory.id;
      }

      await prisma.supplierTransactions.create({
        data: {
          invoiceId: invoiceData.id,
          quantity: parseInt(item.qty),
          itemId: item.id,
        },
      });
    }

    console.log(invoiceData); // Consider removing or replacing console.log if used for debugging
    return NextResponse.json(
      { invoiceId: invoiceData.id, status: "Success" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
