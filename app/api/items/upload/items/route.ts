import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { ItemDetails } from "@/app/entities/entities";

interface Payload {
  item: ItemDetails;
}

export async function POST(request: NextRequest) {
  const body: Payload = await request.json();

  // get brand id
  // get supplier id
  if (!body.item.supplier)
    return NextResponse.json({ message: "Skipped" }, { status: 200 });

  const supplier = await prisma.suppliers.findFirst({
    where: {
      name: body.item.supplier as string,
    },
  });

  const brand = await prisma.brands.findFirst({
    where: {
      name: body.item.brand as string,
    },
  });

  const unit = await prisma.units.findFirst({
    where: {
      name: body.item.unit as string,
    },
  });

  const existingItem = await prisma.items.findFirst({
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
      unitId: body.item.unitId,
      supplierId: supplier?.id,
    },
  });

  supplier ? (body.item.supplierId = supplier.id) : 0;
  brand ? (body.item.brandId = brand.id) : 0;
  unit ? (body.item.unitId = unit.id) : 0;

  if (!existingItem) {
    const item = await prisma.items.create({
      data: {
        supplierId: supplier!.id,
        brandId: brand!.id,
        unitId: unit!.id,
        cal1:
          parseFloat(
            body.item.customerPrice.c1?.replaceAll(",", "") as string
          ) || 0,
        cal2:
          parseFloat(
            body.item.customerPrice.c2?.replaceAll(",", "") as string
          ) || 0,
        cal3:
          parseFloat(
            body.item.customerPrice.c3?.replaceAll(",", "") as string
          ) || 0,
        desc1: body.item.description.desc1
          ? body.item.description.desc1.trim()
          : "",
        desc2: body.item.description.desc2
          ? body.item.description.desc2.trim()
          : "",
        desc3: body.item.description.desc3
          ? body.item.description.desc3.trim()
          : "",
        ws1:
          parseFloat(
            body.item.customerPrice.w1?.replaceAll(",", "") as string
          ) || 0,
        ws2:
          parseFloat(
            body.item.customerPrice.w2?.replaceAll(",", "") as string
          ) || 0,
        ws3:
          parseFloat(
            body.item.customerPrice.w3?.replaceAll(",", "") as string
          ) || 0,
        store:
          parseFloat(
            body.item.customerPrice.ib?.replaceAll(",", "") as string
          ) || 0,
        discount1:
          parseFloat(body.item.srpAndDiscount.discount1 as string) || 0,
        discount2:
          parseFloat(body.item.srpAndDiscount.discount2 as string) || 0,
        discount3:
          parseFloat(body.item.srpAndDiscount.discount3 as string) || 0,
        discount4:
          parseFloat(body.item.srpAndDiscount.discount4 as string) || 0,
        discount5:
          parseFloat(body.item.srpAndDiscount.discount5 as string) || 0,
      },
    });
    return NextResponse.json(
      { message: "Item Created", item: item },
      { status: 201 }
    );
  } else {
    const itemUpdate = await prisma.items.update({
      where: { id: existingItem.id },
      data: {
        cal1:
          parseFloat(
            body.item.customerPrice.c1?.replaceAll(",", "") as string
          ) || 0,
        cal2:
          parseFloat(
            body.item.customerPrice.c2?.replaceAll(",", "") as string
          ) || 0,
        cal3:
          parseFloat(
            body.item.customerPrice.c3?.replaceAll(",", "") as string
          ) || 0,
        ws1:
          parseFloat(
            body.item.customerPrice.w1?.replaceAll(",", "") as string
          ) || 0,
        ws2:
          parseFloat(
            body.item.customerPrice.w2?.replaceAll(",", "") as string
          ) || 0,
        ws3:
          parseFloat(
            body.item.customerPrice.w3?.replaceAll(",", "") as string
          ) || 0,
        store:
          parseFloat(
            body.item.customerPrice.ib?.replaceAll(",", "") as string
          ) || 0,
        discount1:
          parseFloat(body.item.srpAndDiscount.discount1 as string) || 0,
        discount2:
          parseFloat(body.item.srpAndDiscount.discount2 as string) || 0,
        discount3:
          parseFloat(body.item.srpAndDiscount.discount3 as string) || 0,
        discount4:
          parseFloat(body.item.srpAndDiscount.discount4 as string) || 0,
        discount5:
          parseFloat(body.item.srpAndDiscount.discount5 as string) || 0,
      },
    });
    return NextResponse.json(
      { message: "Item Updated", item: itemUpdate },
      { status: 201 }
    );
  }
}
