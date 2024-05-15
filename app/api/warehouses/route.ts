import { warehouseSchema } from "@/app/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = warehouseSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newWarehouse = await prisma.warehouses.create({
    data: {
      name: body.name,
      location: body.location,
    },
  });

  return NextResponse.json(newWarehouse, { status: 201 });
}
