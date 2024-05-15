import React from "react";
import { prisma } from "@/prisma/client";
import CheckVoucherTable from "./CheckVoucherTable";
import { CheckVoucher } from "@/app/entities/entities";

const CheckVoucherPage = async () => {
  const checkVouchers = await prisma.checkVouchers.findMany({
    include: {
      Supplier: true,
      SupplierInvoices: true,
    },
  });
  return (
    <div className="w-[950px]">
      <CheckVoucherTable checkVouchers={checkVouchers as CheckVoucher[]} />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default CheckVoucherPage;
