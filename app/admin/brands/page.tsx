import React from "react";
import { prisma } from "@/prisma/client";
import CreateNewButton from "@/app/components/CreateNewButton";
import BrandsTable from "./BrandsTable";

export default async function BrandsPage() {
  const brands = await prisma.brands.findMany();
  return (
    <>
      <CreateNewButton href="/admin/brands/new" label="New Brand" />
      <div>
        <BrandsTable brands={brands} />
      </div>
    </>
  );
}

export const dynamic = "force-dynamic";
