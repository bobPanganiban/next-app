import React from "react";
import { prisma } from "@/prisma/client";
import CustomerTransactions from "./CustomerTransactions";
import { CounterReceipt, Customer } from "@/app/entities/entities";
import CustomerHeader from "./CustomerHeader";

interface Props {
  params: { cid: string };
}

const CustomerEditPage = async ({ params: { cid } }: Props) => {
  const terms = await prisma.terms.findMany();
  const customer = await prisma.customers.findUnique({
    where: {
      id: parseInt(cid),
    },
    include: {
      term: true,
      CustomerInvoices: true,
    },
  });

  const counterReceipts = await prisma.counterReceipts.findMany({
    where: { customerId: parseInt(cid) },
    orderBy: {
      dateCreated: "desc",
    },
  });

  return (
    <>
      <section className="flex-row w-[667px]">
        <CustomerHeader customer={customer as Customer} terms={terms} />
      </section>
      <div>
        <CustomerTransactions
          counterReceipts={counterReceipts as CounterReceipt[]}
          invoices={customer!.CustomerInvoices}
          customerId={parseInt(cid)}
          term={customer!.term!.days}
        />
      </div>
    </>
  );
};

export default CustomerEditPage;
