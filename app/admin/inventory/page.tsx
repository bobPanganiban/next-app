import React from "react";
import { prisma } from "@/prisma/client";
import FormHeader from "./FormHeader";
import InventoriesTable from "./InventoriesTable";

interface Props {
  searchParams: { s: string };
}

const InventoryPage = async ({ searchParams: { s } }: Props) => {
  // dropdown for supplier
  const suppliers = await prisma.suppliers.findMany();
  const itemInventories = await prisma.items.findMany({
    where: {
      supplierId: s ? parseInt(s) : suppliers[0].id,
    },
    select: {
      id: true,
      brand: true,
      desc1: true,
      desc2: true,
      desc3: true,
      inventories: {
        select: {
          warehouseId: true,
          count: true,
          price: true,
        },
      },
    },
  });

  // on supplier select (default supplier is 1)
  // display a table containing the following fields
  // item id, item (brand and description), warehouse inventory, and total
  // warehouse inventory should display key value pairs (e.g.) W1 column, 55 badge @price
  // total
  return (
    <div className="flex-row">
      <div className="mb-4 text-lg font-bold text-gray-800">Inventory Page</div>
      <FormHeader suppliers={suppliers} />
      <div>
        <InventoriesTable itemInventories={itemInventories} />
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default InventoryPage;
