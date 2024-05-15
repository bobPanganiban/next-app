import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

interface Payload {
  newSuppliers: string[];
}

export async function POST(request: NextRequest) {
  const body: Payload = await request.json();
  let newSuppliers: any = [];

  console.log(body);
  if (
    body.newSuppliers.length === 0 ||
    body.newSuppliers.every((element: string) => element === null)
  )
    return NextResponse.json(
      { message: "No New Supplier Added" },
      { status: 200 }
    );

  for (const supplier of body.newSuppliers) {
    if (supplier) {
      const newSupplier = await prisma.suppliers.create({
        data: {
          name: supplier,
          address: "",
          termId: 2,
        },
      });

      newSuppliers.push(newSupplier);
    }
  }

  return NextResponse.json(newSuppliers, { status: 201 });
}
