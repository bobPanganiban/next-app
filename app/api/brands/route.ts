import { NextRequest, NextResponse } from "next/server";
import { brandSchema } from "../../validationSchema";
import { prisma } from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = brandSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newBrand = await prisma.brands.create({
    data: {
      name: body.name,
    },
  });

  return NextResponse.json(newBrand, { status: 201 });
}

export async function GET(request: NextRequest) {
  const brands = await prisma.brands.findMany();

  return NextResponse.json(brands);
}
