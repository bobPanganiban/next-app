import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  let newBrands = [];

  if (
    body.newBrands.length === 0 ||
    body.newBrands.every((element: string) => element === null)
  )
    return NextResponse.json(
      { message: "No New Brands Added" },
      { status: 200 }
    );

  for (const brand of body.newBrands) {
    if (brand) {
      const newBrand = await prisma.brands.create({
        data: {
          name: brand,
        },
      });

      newBrands.push(newBrand);
    }
  }

  return NextResponse.json(newBrands, { status: 200 });
}
