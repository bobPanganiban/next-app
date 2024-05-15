import React from "react";
import { prisma } from "@/prisma/client";
import SupplierTransactions from "./SupplierTransactions";
import SupplierHeader from "./SupplierHeader";

interface Props {
  params: { sid: string };
}

const SupplierDetailPage = async ({ params: { sid } }: Props) => {
  const supplier = await prisma.suppliers.findUnique({
    where: {
      id: parseInt(sid),
    },
    include: {
      Terms: true,
      Invoices: {
        orderBy: {
          invoiceDate: "asc",
        },
      },
    },
  });

  const terms = await prisma.terms.findMany();

  const checkVouchers = await prisma.checkVouchers.findMany({
    where: {
      supplierId: parseInt(sid),
    },
    orderBy: {
      dateCreated: "desc",
    },
  });

  return (
    <section className="flex-row w-[667px]">
      <SupplierHeader supplier={supplier} terms={terms} />
      <SupplierTransactions
        checkVouchers={checkVouchers}
        invoices={supplier!.Invoices}
        supplierId={parseInt(sid)}
        term={supplier!.Terms!.days}
      />
    </section>
  );
};

export const dynamic = "force-dynamic";

export default SupplierDetailPage;
