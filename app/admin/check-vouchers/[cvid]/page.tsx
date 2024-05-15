import React from "react";
import { prisma } from "@/prisma/client";
import CheckVoucher from "./CheckVoucher";
import { CheckVoucher as CVInterface } from "@/app/entities/entities";

interface Props {
  params: { cvid: string };
}

const CheckVoucherDetailPage = async ({ params }: Props) => {
  const checkVoucher = await prisma.checkVouchers.findUnique({
    where: {
      id: parseInt(params.cvid),
    },
    include: {
      Supplier: {
        include: {
          Terms: true,
        },
      },
      SupplierInvoices: true,
    },
  });

  return (
    <div className="w-[700px]">
      <CheckVoucher checkVoucher={checkVoucher as CVInterface} />
    </div>
  );
};

export default CheckVoucherDetailPage;
