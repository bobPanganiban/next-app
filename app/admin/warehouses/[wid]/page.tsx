import React from "react";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: { wid: string };
}

const WarehouseEditPage = async ({ params }: Props) => {
  const warehouse = await prisma.warehouses.findUnique({
    where: { id: parseInt(params.wid) },
  });

  if (!warehouse) notFound();

  return <div>{warehouse.name}</div>;
};

export default WarehouseEditPage;
