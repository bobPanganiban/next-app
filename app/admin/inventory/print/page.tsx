import Print from "./Print";
import { prisma } from "@/prisma/client";

const InventoryPrintPage = async () => {
  const allInventories = await prisma.items.findMany({
    select: {
      id: true,
      brand: true,
      desc1: true,
      desc2: true,
      desc3: true,
      supplierId: true,
      inventories: {
        select: {
          warehouseId: true,
          count: true,
          price: true,
        },
      },
    },
  });
  return (
    <div className="w-[775px]">
      <Print inventories={allInventories} />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default InventoryPrintPage;
