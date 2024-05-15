import React from "react";
import CustomerForm from "./CustomerForm";
import { prisma } from "@/prisma/client";

const NewCustomerPage = async () => {
  const terms = await prisma.terms.findMany();
  return (
    <div>
      <h1 className="font-bold text-gray-800 text-lg">Add new customer</h1>
      <CustomerForm terms={terms} />
    </div>
  );
};

export default NewCustomerPage;
