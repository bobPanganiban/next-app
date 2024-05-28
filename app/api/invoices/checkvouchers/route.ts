import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { checkVoucherSchema } from "@/app/validationSchema";

interface CheckVoucherPayload {
  supplierId: number;
  dueDate: Date;
  totalAmount: number;
  discount: number;
  bank: string;
  invoiceIds: number[];
}

export async function POST(request: NextRequest) {
  const body: CheckVoucherPayload = await request.json();
  const validation = checkVoucherSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  // create check voucher entry
  const checkVoucher = await prisma.checkVouchers.create({
    data: {
      supplierId: body.supplierId,
      dueDate: body.dueDate,
      totalAmount: body.totalAmount,
      discount: body.discount,
      bank: body.bank,
    },
  });

  if (checkVoucher.id) {
    // if success update invoice isFullfilled to true and checkVoucherId to returned id
    for (const invoiceId of body.invoiceIds) {
      await prisma.supplierInvoices.update({
        where: { id: invoiceId },
        data: {
          isfulfilled: true,
          checkVouchersId: checkVoucher.id,
        },
      });
    }
  } else {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }

  return NextResponse.json(checkVoucher, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();

  try {
    const updateVoucher = await prisma.checkVouchers.update({
      where: {
        id: body.id,
      },
      data: {
        checkNumber: body.checkNumber,
      },
    });
    return NextResponse.json(updateVoucher);
  } catch (err) {
    throw err;
  }
}
