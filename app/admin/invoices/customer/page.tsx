import React from "react";
import { prisma } from "@/prisma/client";
import CustomerInvoicesTable from "./CustomerInvoicesTable";
import { CustomerInvoice } from "@/app/entities/entities";

const CustomerInvoicesPage = async () => {
  const invoices = await prisma.customerInvoices.findMany({
    include: {
      customer: true,
    },
  });

  return (
    <div>
      <CustomerInvoicesTable customerInvoices={invoices as CustomerInvoice[]} />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default CustomerInvoicesPage;
