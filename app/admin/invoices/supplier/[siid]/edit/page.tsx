import React from "react";
import { prisma } from "@/prisma/client";
import InvoiceDetailsEditPage from "./InvoiceDetailsEditPage";

interface Props {
  params: { siid: string };
}

const InvoiceEditPage = async ({ params: { siid } }: Props) => {
  if (!siid) return <div>Ooops Something went wrong</div>;

  const transactions = await prisma.supplierTransactions.findMany({
    where: {
      invoiceId: parseInt(siid),
    },
    include: {
      item: {
        include: {
          brand: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return (
    <div>
      <InvoiceDetailsEditPage />
    </div>
  );
};

export default InvoiceEditPage;
