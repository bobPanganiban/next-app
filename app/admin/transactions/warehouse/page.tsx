import React from "react";
import { prisma } from "@/prisma/client";
import WarehouseTransfer from "./WarehouseTransfer";

const WarehouseTransactionsPage = async () => {
  const inventories = await prisma.inventory.findMany({
    include: {
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

  return (
    <div>
      {inventories.length > 0 && (
        <WarehouseTransfer inventories={inventories} />
      )}
    </div>
  );
};
export const dynamic = "force-dynamic";

export default WarehouseTransactionsPage;
