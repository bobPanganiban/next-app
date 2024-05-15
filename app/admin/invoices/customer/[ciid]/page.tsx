import React from "react";
import { prisma } from "@/prisma/client";
import CustomerInvoice from "./CustomerInvoice";
import { customerInvoiceQuery } from "@/app/queries/customerInvoice";

interface Props {
  params: { ciid: string };
}

const CustomerInvoiceDownloadPage = async ({ params }: Props) => {
  const customerInvoice = await prisma.customerInvoices.findUnique(
    customerInvoiceQuery(params.ciid)
  );

  return (
    <div className="w-[700px]">
      <CustomerInvoice invoice={customerInvoice} />
    </div>
  );
};

export default CustomerInvoiceDownloadPage;
