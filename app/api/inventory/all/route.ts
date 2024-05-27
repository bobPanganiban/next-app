import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  const items = await prisma.inventory.findMany({
    select: {
      count: true,
      price: true,
      id: true,
      item: {
        select: {
          desc1: true,
          desc2: true,
          desc3: true,
          brand: {
            select: {
              name: true,
            },
          },
          supplier: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(items, { status: 200 });
}
