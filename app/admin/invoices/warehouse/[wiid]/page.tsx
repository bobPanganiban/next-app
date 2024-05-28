import React from "react";
import { prisma } from "@/prisma/client";
import WarehouseInvoice from "./WarehouseInvoice";
interface Props {
  params: { wiid: string };
}
const WarehouseInvoiceDetailPage = async ({ params }: Props) => {
  const invoice = await prisma.warehouseInvoices.findUnique({
    where: {
      id: parseInt(params.wiid),
    },
    include: {
      WarehouseTransactions: {
        select: {
          count: true,
          Inventory: {
            select: {
              price: true,
              item: {
                select: {
                  desc1: true,
                  desc2: true,
                  desc3: true,
                  brand: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  return (
    <div className="w-[900px]">
      <WarehouseInvoice invoice={invoice} />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default WarehouseInvoiceDetailPage;
