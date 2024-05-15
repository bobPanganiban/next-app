import React from "react";
import ItemsTable, { Item, Warehouse } from "./ItemsTable";
import { prisma } from "@/prisma/client";
import FormHeader from "./FormHeader";

interface Props {
  searchParams: { s: string };
}

const SupplierPage = async ({ searchParams: { s } }: Props) => {
  const warehouses = await prisma.warehouses.findMany();
  const suppliers = await prisma.suppliers.findMany();
  const items = await prisma.items.findMany({
    where: {
      supplierId: s ? parseInt(s) : suppliers[0].id,
    },
    select: {
      id: true,
      desc1: true,
      desc2: true,
      desc3: true,
      brand: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  return (
    <>
      <FormHeader suppliers={suppliers} />
      <ItemsTable
        items={items as Item[]}
        sid={s ? s : suppliers[0].id.toString()}
        warehouses={warehouses as Warehouse[]}
      />
    </>
  );
};

export const dynamic = "force-dynamic";

export default SupplierPage;
