import React from "react";
import { prisma } from "@/prisma/client";
import CounterReceiptsTable from "./CounterReceiptsTable";
import { CounterReceipt } from "@/app/entities/entities";

const CounterReceiptsPage = async () => {
  const counterReceipts = await prisma.counterReceipts.findMany({
    include: {
      Customers: true,
      CustomerInvoices: true,
    },
    orderBy: {
      dateCreated: "desc",
    },
  });

  return (
    <div className="w-[950px]">
      <CounterReceiptsTable
        counterRecipts={counterReceipts as CounterReceipt[]}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default CounterReceiptsPage;
