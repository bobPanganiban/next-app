import React, { useState } from "react";
import { prisma } from "@/prisma/client";
import InventoryForm from "./InventoryForm";

interface Props {
  params: { iid: string };
}

const InventoryEditPage = async ({ params: { iid } }: Props) => {
  const inventoryItem = await prisma.inventory.findUnique({
    where: { id: parseInt(iid) },
    select: {
      count: true,
      warehouseId: true,
      item: {
        select: {
          desc1: true,
          desc2: true,
          desc3: true,
        },
      },
    },
  });

  return (
    <InventoryForm
      wid={inventoryItem!.warehouseId}
      count={inventoryItem?.count}
      item={`${inventoryItem?.item?.desc1}${inventoryItem?.item?.desc2}${inventoryItem?.item?.desc3}`}
      id={iid}
    />
  );
};

export default InventoryEditPage;
