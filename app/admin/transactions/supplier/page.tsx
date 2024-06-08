import React from "react";
import ItemsTable, { Item, Warehouse } from "./ItemsTable";
import { prisma } from "@/prisma/client";
import FormHeader from "./FormHeader";
import Link from "next/link";
import {
  bodegaItemQuery,
  supplierItemsQuery,
} from "@/app/queries/supplierItems";

interface Props {
  searchParams: { s: string };
}

const SupplierPage = async ({ searchParams: { s } }: Props) => {
  const warehouses = await prisma.warehouses.findMany();
  const suppliers = await prisma.suppliers.findMany();

  if (suppliers.length === 0)
    return <Link href={"/admin/suppliers/new"}>Create Supplier</Link>;

  let query: any;
  if (parseInt(s) === 1) {
    query = bodegaItemQuery();
  } else {
    query = supplierItemsQuery(s, suppliers);
  }

  const items: any = await prisma.items.findMany(query);

  return (
    <>
      <FormHeader suppliers={suppliers} />
      <ItemsTable
        items={items as Item[]}
        sid={s ? s : suppliers[1].id.toString()}
        warehouses={warehouses as Warehouse[]}
      />
    </>
  );
};

export const dynamic = "force-dynamic";

export default SupplierPage;
