import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { itemSchema } from "../../validationSchema";

export async function GET(request: NextRequest) {
  const items = await prisma.items.findMany({
    include: {
      brand: true,
      supplier: true,
      unit: true,
    },
  });

  const inventoryCounts = await prisma.inventory.groupBy({
    by: ["itemId"],
    _sum: {
      count: true,
    },
  });

  const countMap = new Map(
    inventoryCounts.map((item: any) => [item.itemId, item._sum.count])
  );

  const itemsWithInventoryCount = items.map((item: any) => {
    return {
      ...item,
      inventoryCount: countMap.get(item.id) || 0, // Default to 0 if no inventory found
    };
  });

  return NextResponse.json(itemsWithInventoryCount);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = itemSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newItem = await prisma.items.create({
    data: {
      supplierId: body.supplierId,
      brandId: body.brandId,
      unitId: body.unitId,
      desc1: body.desc1,
      desc2: body.desc2 || "",
      desc3: body.desc3 || "",
      discount1: body.discount1,
      discount2: body.discount2,
      discount3: body.discount3,
      discount4: body.discount4,
      cal1: body.cal1,
      cal2: body.cal2,
      cal3: body.cal3,
      ws1: body.ws1,
      ws2: body.ws2,
      ws3: body.ws3,
      store: body.store,
    },
  });

  return NextResponse.json(newItem, { status: 201 });
}
