"use client";
import { CounterReceipt } from "@/app/entities/entities";
import { useCurrency } from "@/app/hooks/useCurrency";
import Link from "next/link";
import React from "react";
import { BiSolidError } from "react-icons/bi";
import { GrFormView } from "react-icons/gr";

interface Props {
  counterRecipts: CounterReceipt[];
}

const CounterReceiptsTable = ({ counterRecipts }: Props) => {
  const formatCurrency = useCurrency();
  return (
    <div>
      <h1 className="text-lg font-bold text-gray-800 mb-4">COUNTER RECEIPTS</h1>
      <table className="table table-xs table-bordered">
        <thead>
          <tr>
            <th className="w-[5%]">ID</th>
            <th className="w-[15%]">DUE DATE</th>
            <th className="w-[50%]" align="center">
              CUSTOMER
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
          {counterRecipts.map((counterReceipt: CounterReceipt) => (
            <tr key={counterReceipt.id}>
              <td>{counterReceipt.id}</td>
              <td>{counterReceipt.dueDate.toLocaleDateString()}</td>
              <td>
                <Link href={`/admin/customers/${counterReceipt.customerId}`}>
                  {counterReceipt.Customers?.name}
                </Link>
              </td>
              <td align="right">
                {formatCurrency(counterReceipt.totalAmount)}
              </td>
              <td className="flex justify-center">
                <Link href={`/admin/counter-receipts/${counterReceipt.id}`}>
                  <GrFormView className="text-lg text-green-800" />
                </Link>
                {counterReceipt.CustomerInvoices?.length === 0 ? (
                  <BiSolidError className="text-lg text-red-800" />
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CounterReceiptsTable;
