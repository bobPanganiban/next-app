"use client";
import { CheckVoucher } from "@/app/entities/entities";
import { useCurrency } from "@/app/hooks/useCurrency";
import Link from "next/link";
import React, { useState } from "react";
import { GrFormView } from "react-icons/gr";
import { BiSolidError } from "react-icons/bi";

interface Props {
  checkVouchers: CheckVoucher[];
}

const CheckVoucherTable = ({ checkVouchers }: Props) => {
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 10;

  const formatCurrency = useCurrency();
  const TotalPages = Math.ceil(checkVouchers.length / itemsPerPage);

  return (
    <div>
      <h1 className="text-lg font-bold text-gray-800 mb-4">CHECK VOUCHERS</h1>
      <table className="table table-xs table-bordered">
        <thead>
          <tr>
            <th className="w-[5%]">ID</th>
            <th className="w-[15%]">DUE DATE</th>
            <th className="w-[50%]" align="center">
              SUPPLIER
            </th>
            <th className="w-[15%]" align="right">
              AMOUNT
            </th>
            <th className="w-[15%]" align="center">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {checkVouchers
            .filter(
              (checkVoucher: CheckVoucher, index: number) =>
                index >= page * itemsPerPage - itemsPerPage &&
                index < itemsPerPage * page
            )
            .map((checkVoucher: CheckVoucher) => (
              <tr key={checkVoucher.id}>
                <td>{checkVoucher.id}</td>
                <td>{checkVoucher.dueDate.toLocaleDateString()}</td>
                <td>
                  <Link href={`/admin/suppliers/${checkVoucher.supplierId}`}>
                    {checkVoucher.Supplier?.name}
                  </Link>
                </td>
                <td align="right">
                  {formatCurrency(checkVoucher.totalAmount)}
                </td>
                <td className="flex justify-center">
                  <Link href={`/admin/check-vouchers/${checkVoucher.id}`}>
                    <GrFormView className="text-lg text-green-800" />
                  </Link>
                  {checkVoucher.SupplierInvoices?.length === 0 ? (
                    <BiSolidError className="text-lg text-red-800" />
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="join mt-4">
        <button
          className="join-item btn btn-xs"
          disabled={page === 1}
          onClick={() => setPage((page) => page - 1)}
        >
          «
        </button>
        <button className="join-item btn btn-xs">
          Page {page} of {TotalPages}
        </button>
        <button
          className="join-item btn btn-xs"
          onClick={() => setPage((page) => page + 1)}
          disabled={page === TotalPages}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default CheckVoucherTable;
