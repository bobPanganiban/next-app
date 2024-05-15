import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { counterReceiptSchema } from "@/app/validationSchema";

interface CounterReceiptPayload {
  customerId: number;
  dueDate: Date;
  totalAmount: number;
  invoiceIds: number[];
}

export async function POST(request: NextRequest) {
  const body: CounterReceiptPayload = await request.json();
  const validation = counterReceiptSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const counterReceipt = await prisma.counterReceipts.create({
    data: {
      customerId: body.customerId,
      dueDate: body.dueDate,
      totalAmount: body.totalAmount,
    },
  });

  if (counterReceipt.id) {
    for (const invoiceId of body.invoiceIds) {
      await prisma.customerInvoices.update({
        where: { id: invoiceId },
        data: {
          isfulfilled: true,
          counterReceiptsId: counterReceipt.id,
        },
      });
    }
  } else {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }

  return NextResponse.json(counterReceipt, { status: 201 });
}
