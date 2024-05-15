import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { supplierSchema } from "../../validationSchema";

export async function GET(request: NextRequest) {
  const suppliers = await prisma.suppliers.findMany();

  return NextResponse.json(suppliers);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = supplierSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newSupplier = await prisma.suppliers.create({
    data: {
      name: body.name,
      termId: body.termId,
      address: body.address,
    },
  });

  return NextResponse.json(newSupplier, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const validation = supplierSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const updatedSupplier = await prisma.suppliers.update({
    where: {
      id: body.id,
    },
    data: {
      name: body.name,
      termId: body.termId,
      address: body.address,
    },
  });

  return NextResponse.json(updatedSupplier, { status: 200 });
}
