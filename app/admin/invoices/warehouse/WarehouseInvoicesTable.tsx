"use client";
import { Invoices } from "@/app/entities/entities";
import { useRouter } from "next/navigation";
import React from "react";
interface Props {
  invoices: Invoices[];
}

const WarehouseInvoicesTable = ({ invoices }: Props) => {
  const router = useRouter();

  const handleView = (id: number) => {
    router.push(`/admin/invoices/warehouse/${id}`);
  };

  return (
    <div>
      <table className="table table-bordered table-xs w-full">
        <thead>
          <tr>
            <th className="w-[20%]">ID</th>
            <th className="w-[20%]">Date</th>
            <th className="w-[20%]">From</th>
            <th className="w-[20%]">To</th>
            <th className="w-[20%]">Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr
              key={invoice.id}
              className="hover cursor-pointer"
              onClick={(e) => handleView(invoice.id)}
            >
              <td>{invoice.id}</td>
              <td>{invoice.dateCreated.toLocaleDateString()}</td>
              <td>{invoice.warehouseId}</td>
              <td>{invoice.targetWarehouseId}</td>
              <td>{invoice.isFullfilled ? "COMPLETE" : "IN TRANSIT"}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WarehouseInvoicesTable;
