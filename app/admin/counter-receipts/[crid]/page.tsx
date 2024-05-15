import React from "react";
import { prisma } from "@/prisma/client";
import { CounterReceipt as CRInterface } from "@/app/entities/entities";
import CounterReceipt from "./CounterReceipt";

interface Props {
  params: { crid: string };
}

const CounterReceiptDetailPage = async ({ params }: Props) => {
  const counterReceipt = await prisma.counterReceipts.findUnique({
    where: {
      id: parseInt(params.crid),
    },
    include: {
      Customers: {
        include: {
          term: true,
        },
      },
      CustomerInvoices: {
        select: {
          invoiceDate: true,
          invoiceNumber: true,
          totalAmount: true,
          id: true,
        },
      },
    },
  });
  return (
    <div className="w-[700px]">
      <CounterReceipt
        counterReceipt={counterReceipt as unknown as CRInterface}
      />
    </div>
  );
};

export default CounterReceiptDetailPage;
