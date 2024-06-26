import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return new Response("ID not provided", { status: 400 });
  }

  try {
    const item = await prisma.items.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        store: true,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    // Handle any other errors
    return new Response("Error fetching inventory item", { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  if (!body.id)
    return NextResponse.json({ error: "No id count" }, { status: 400 });
  const updatedInventory = await prisma.inventory.update({
    where: {
      id: parseInt(body.id),
    },
    data: {
      count: parseInt(body.count),
    },
  });

  return NextResponse.json(updatedInventory);
}
