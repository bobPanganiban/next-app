import React from "react";
import WarehouseInvoicesTable from "./WarehouseInvoicesTable";
import { prisma } from "@/prisma/client";
import { Invoices } from "@/app/entities/entities";

const WarehouseInvoicePage = async () => {
  const invoices = await prisma.warehouseInvoices.findMany({
    include: {
      WarehouseTransactions: {
        include: {
          Inventory: {
            include: {
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
      <WarehouseInvoicesTable invoices={invoices as Invoices[]} />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default WarehouseInvoicePage;
