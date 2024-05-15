import React from "react";
import { prisma } from "@/prisma/client";
import SupplierInvoicesTable from "./SupplierInvoicesTable";
import { orderBy } from "lodash";
import { SupplierInvoice } from "@/app/entities/entities";

const SupplierInvoicesPage = async () => {
  const invoices = await prisma.supplierInvoices.findMany({
    include: {
      supplier: true,
    },
    orderBy: {
      invoiceDate: "desc",
    },
  });

  return (
    <div>
      <SupplierInvoicesTable supplierInvoices={invoices as SupplierInvoice[]} />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default SupplierInvoicesPage;
