import React from "react";
import { prisma } from "@/prisma/client";
import WarehouseTransfer from "./WarehouseTransfer";

const WarehouseTransactionsPage = async () => {
  const inventories = await prisma.inventory.findMany({
    include: {
      warehouse: true,
      item: {
        select: {
          id: true,
          desc1: true,
          desc2: true,
          desc3: true,
          brand: {
            select: { name: true, id: true },
          },
          supplier: {
            select: { name: true, id: true },
          },
        },
      },
    },
  });

  console.log(inventories);

  return (
    <div>
      <WarehouseTransfer />
    </div>
  );
};

export default WarehouseTransactionsPage;
