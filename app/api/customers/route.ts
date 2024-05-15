import { customerSchema } from "@/app/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = customerSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newCustomer = await prisma.customers.create({
    data: {
      name: body.name,
      address: body.address,
      termId: body.termId,
    },
  });

  return NextResponse.json(newCustomer, { status: 200 });
}

export async function GET(request: NextRequest) {
  const customers = await prisma.customers.findMany();

  return NextResponse.json(customers);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const validation = customerSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const updatedCustomer = await prisma.customers.update({
    where: {
      id: body.id,
    },
    data: {
      name: body.name,
      termId: body.termId,
      address: body.address,
    },
  });

  return NextResponse.json(updatedCustomer, { status: 200 });
}
