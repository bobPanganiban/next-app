import React from "react";
import { prisma } from "@/prisma/client";
import CreateNewButton from "@/app/components/CreateNewButton";
import TableActions from "@/app/components/TableActions";
import Link from "next/link";
import { Item } from "@/app/entities/entities";
import ProductTable from "./ProductTable";

const ProductPage = async () => {
  const items = await prisma.items.findMany({
    select: {
      id: true,
      desc1: true,
      desc2: true,
      desc3: true,
      discount1: true,
      discount2: true,
      discount3: true,
      discount4: true,
      discount5: true,
      store: true,
      supplier: {
        select: {
          name: true,
        },
      },
      brand: {
        select: {
          name: true,
        },
      },
      unit: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <div className="flex gap-x-2">
        <CreateNewButton href="/admin/products/new" label="New Item" />
        <Link
          href="/admin/products/upload"
          className="btn bg-slate-100 text-gray-800 btn-sm"
        >
          Upload
        </Link>
      </div>
      <div className="max-w-[900px]">
        <ProductTable items={items as Item[]} />
      </div>
    </>
  );
};

export const dynamic = "force-dynamic";

export default ProductPage;
