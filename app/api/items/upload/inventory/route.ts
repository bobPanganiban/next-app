import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // getUnitId
  const unit = await prisma.units.findFirst({
    where: {
      name: body.item.unit,
    },
    select: {
      id: true,
    },
  });

  // find item id
  const item = await prisma.items.findFirst({
    where: {
      desc1: body.item.description.desc1
        ? body.item.description.desc1.trim()
        : "",
      desc2: body.item.description.desc2
        ? body.item.description.desc2.trim()
        : "",
      desc3: body.item.description.desc3
        ? body.item.description.desc3.trim()
        : "",
      unitId: unit?.id,
    },
    select: {
      id: true,
    },
  });

  // create inventory entry
  if (item && body.item.quantity) {
    const newInventory = await prisma.inventory.create({
      data: {
        count: parseInt(body.item.quantity),
        itemId: item.id,
        warehouseId: 1,
        price: parseFloat(body.item.customerPrice.ib.replaceAll(",", "")),
      },
    });
    if (newInventory) {
      return NextResponse.json(
        {
          message: `inventory created`,
          item: `${body.item.desc1} ${body.item.desc2} ${body.item.desc3}`,
        },
        { status: 201 }
      );
    } else {
      throw new Error(`Failed creating inventory`);
    }
  }

  return NextResponse.json({ message: "skipped" }, { status: 200 });
}
