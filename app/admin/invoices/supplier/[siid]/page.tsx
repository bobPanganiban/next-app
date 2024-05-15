import React from "react";
import { prisma } from "@/prisma/client";
import { format } from "date-fns";
import { useCurrency } from "@/app/hooks/useCurrency";
import { supplierInvoiceQuery } from "@/app/queries/supplierInvoice";
import SupplierInvoice from "./SupplierInvoice";

interface Props {
  params: { siid: string };
}

const SupplierInvoiceDownloadPage = async ({ params }: Props) => {
  const formatCurrency = useCurrency();
  const invoiceDetails = await prisma.supplierInvoices.findUnique(
    supplierInvoiceQuery(params.siid)
  );

  return (
    <>
      <div className="w-[700px]">
        <SupplierInvoice invoice={invoiceDetails} />
      </div>
    </>
  );
};

export const dynamic = "force-dynamic";

export default SupplierInvoiceDownloadPage;
