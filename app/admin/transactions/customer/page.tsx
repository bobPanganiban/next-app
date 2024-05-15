import React from "react";
import { prisma } from "@/prisma/client";
import CustomerFormHeader from "./CustomerFormContainer";

interface Props {
  searchParams: { cid: string };
}

const CustomerInvoicePage = async ({ searchParams: { cid = "0" } }: Props) => {
  const customers = await prisma.customers.findMany();
  const terms = await prisma.terms.findMany();
  return (
    <div>
      <CustomerFormHeader customers={customers} terms={terms} />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default CustomerInvoicePage;
