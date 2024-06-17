import React from "react";
import { prisma } from "@/prisma/client";
import InventoriesTable from "./InventoriesTable";
interface Props {
  searchParams: { b: string; wso?: string; siw?: string };
}

const InventoryPage = async ({ searchParams: { b, wso, siw } }: Props) => {
  // dropdown for supplier
  const brands = await prisma.brands.findMany({ orderBy: { name: "asc" } });
  const allInventories = await prisma.items.findMany({
    select: {
      id: true,
      brand: true,
      desc1: true,
      desc2: true,
      desc3: true,
      supplierId: true,
      brandId: true,
      inventories: {
        select: {
          warehouseId: true,
          count: true,
          price: true,
        },
      },
    },
    orderBy: [
      { brandId: "asc" },
      { desc1: "asc" },
      { desc2: "asc" },
      { desc3: "asc" },
    ],
  });

  // on supplier select (default supplier is 1)
  // display a table containing the following fields
  // item id, item (brand and description), warehouse inventory, and total
  // warehouse inventory should display key value pairs (e.g.) W1 column, 55 badge @price
  // total
  return (
    <div className="flex-row max-w-[950px]">
      <div className="flex justify-between">
        <div className="mb-4 text-lg font-bold text-gray-800">
          Inventory <span>as of {new Date().toLocaleDateString()}</span>
        </div>
      </div>
      <div>
        <InventoriesTable itemInventories={allInventories} brands={brands} />
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default InventoryPage;
