"use client";
import React, { useState } from "react";
import { SupplierInvoice } from "@/app/entities/entities";
import { format } from "date-fns";
import Link from "next/link";
import { useCurrency } from "@/app/hooks/useCurrency";
import { GrFormView } from "react-icons/gr";

interface Props {
  supplierInvoices: SupplierInvoice[];
}

const SupplierInvoicesTable = ({ supplierInvoices }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [itemPerPage, setItemPerPage] = useState<number>(10);
  const [invoiceSearch, setInvoiceSearch] = useState<string>("");
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const formatCurrency = useCurrency();
  const TotalPages = Math.ceil(supplierInvoices.length / itemPerPage);

  return (
    <div>
      <div className="flex gap-x-4">
        <div>
          <input
            placeholder="search invoice..."
            type="text"
            className="input input-bordered input-sm mb-2 ml-2"
            value={invoiceSearch}
            onChange={(e) => setInvoiceSearch(e.target.value)}
          />
        </div>
        <div className="ml-4">
          <span className="text-xs">Show completed?</span>
        </div>
        <div>
          <input
            type="checkbox"
            className="checkbox checkbox-sm mt-1"
            checked={showCompleted}
            onChange={(e) => setShowCompleted(e.target.checked)}
          />
        </div>
      </div>
      <table className="table table-xs w-[900px]">
        <thead>
          <tr>
            <th className="w-[10%]">Invoice#</th>
            <th className="w-[10%]">Date</th>
            <th className="w-[45%]">Supplier</th>
            <th className="w-[15%]">Amount</th>
            <th className="w-[15%]">Status</th>
            <th className="w-[20%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* page 2, 20((p*ipp)-ipp) - 40(ipp*p) */}
          {supplierInvoices
            .filter((invoice: SupplierInvoice, index: number) => {
              let show = showCompleted || !invoice.isfulfilled;
              let paginated =
                index >= page * itemPerPage - itemPerPage &&
                index < itemPerPage * page;

              let search =
                invoiceSearch === ""
                  ? true
                  : invoice.invoiceNumber
                      .toUpperCase()
                      .includes(invoiceSearch.toUpperCase());
              return paginated && search && show;
            })
            .map((invoice: SupplierInvoice) => (
              <tr key={invoice.id} className="hover">
                <td>
                  <Link href={`/admin/invoices/supplier/${invoice.id}`}>
                    {invoice.invoiceNumber}
                  </Link>
                </td>
                <td>{format(invoice.invoiceDate, "MM/dd/yyyy")}</td>
                <td>
                  <Link href={`/admin/suppliers/${invoice.supplierId}`}>
                    {invoice.supplier!.name}
                  </Link>
                </td>
                <td>{formatCurrency(invoice.totalAmount)}</td>
                <td>{invoice.isfulfilled ? "COMPLETED" : "PENDING"}</td>
                <td>
                  <Link href={`/admin/invoices/supplier/${invoice.id}`}>
                    <GrFormView className="text-lg text-green-800" />
                  </Link>
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

export default SupplierInvoicesTable;
