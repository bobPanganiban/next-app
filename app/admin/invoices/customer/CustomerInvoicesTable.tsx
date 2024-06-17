"use client";
import { CustomerInvoice } from "@/app/entities/entities";
import { useCurrency } from "@/app/hooks/useCurrency";
import { useUserProfile } from "@/app/hooks/useUserProfile";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { GrFormView } from "react-icons/gr";

interface Props {
  customerInvoices: CustomerInvoice[];
}

const CustomerInvoicesTable = ({ customerInvoices }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [itemPerPage, setItemPerPage] = useState<number>(10);
  const [invoiceSearch, setInvoiceSearch] = useState<string>("");
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(
    Math.ceil(customerInvoices.length / itemPerPage)
  );
  const formatCurrency = useCurrency();

  const { status, data: session } = useSession();
  const user = useUserProfile(session?.user?.email || "");

  return (
    <div className="flex-row">
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
            <th className="w-[45%]">Customer</th>
            <th className="w-[15%]">Amount</th>
            <th className="w-[15%]">Status</th>
            <th className="w-[20%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customerInvoices
            .reduce(
              (
                acc: CustomerInvoice[],
                invoice: CustomerInvoice,
                index: number
              ) => {
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
                if (paginated && search && show) {
                  acc.push(invoice);
                }

                return acc;
              },
              [] as CustomerInvoice[]
            )
            .map((invoice: CustomerInvoice) => (
              <tr key={invoice.id} className="hover">
                <td>
                  <Link href={`/admin/invoices/customer/${invoice.id}`}>
                    {invoice.invoiceNumber}
                  </Link>
                </td>
                <td>{invoice.invoiceDate.toLocaleDateString()}</td>
                <td>
                  {user?.data?.data.role === "admin" ? (
                    <Link href={`/admin/customers/${invoice.customerId}`}>
                      {invoice.customer?.name}
                    </Link>
                  ) : (
                    invoice.customer?.name
                  )}
                </td>
                <td>{formatCurrency(invoice.totalAmount)}</td>
                <td>{invoice.isfulfilled ? "COMPLETED" : "PENDING"}</td>
                <td>
                  <Link href={`/admin/invoices/customer/${invoice.id}`}>
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
          Page {page} of {totalPages}
        </button>
        <button
          className="join-item btn btn-xs"
          onClick={() => setPage((page) => page + 1)}
          disabled={page === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default CustomerInvoicesTable;
