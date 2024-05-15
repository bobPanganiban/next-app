"use client";
import Spinner from "@/app/components/Spinner";
import { CounterReceipt, CustomerInvoice } from "@/app/entities/entities";
import { useCurrency } from "@/app/hooks/useCurrency";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  counterReceipts: CounterReceipt[];
  invoices: CustomerInvoice[];
  customerId: number;
  term: string;
}

const CustomerTransactions = ({
  counterReceipts,
  invoices,
  customerId,
  term,
}: Props) => {
  const router = useRouter();
  const [selectedInvoices, setSelectedInvoices] = useState<number[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [pendingPage, setPendingPage] = useState<number>(1);
  const invoicePerPage = 10;
  const TotalInvoicePages = Math.ceil(invoices.length / invoicePerPage);
  const formatCurrency = useCurrency();

  const handleInvoiceSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedInvoices((prev) => [...prev, parseInt(e.target.value)]);
      setTotalAmount(
        (prev) =>
          prev +
          invoices.find((invoice) => invoice.id === parseInt(e.target.value))!
            .totalAmount
      );
    } else {
      setSelectedInvoices((prev) =>
        prev.filter((invoiceId) => invoiceId !== parseInt(e.target.value))
      );
      setTotalAmount(
        (prev) =>
          prev -
          invoices.find((invoice) => invoice.id === parseInt(e.target.value))!
            .totalAmount
      );
    }
  };

  const handleCreateCounterReceipt = async () => {
    if (selectedInvoices.length > 0) {
      const dueDate = new Date(
        invoices.find(
          (invoice) =>
            invoice.id === selectedInvoices[selectedInvoices.length - 1]
        )!.invoiceDate
      );

      dueDate.setDate(dueDate.getDate() + parseInt(term));

      const body = {
        customerId: customerId,
        dueDate: dueDate.toISOString(),
        totalAmount: totalAmount,
        invoiceIds: selectedInvoices,
      };

      setLoading(true);
      axios
        .post("/api/invoices/counter-receipts", body)
        .then((res) => {
          setTotalAmount(0);
          setSelectedInvoices([]);
          console.log(res);
          router.push(`/admin/counter-receipts/${res.data.id}`);
          router.refresh();
          setLoading(false);
        })
        .catch((err: any) => setLoading(false));
    }
  };
  return (
    <>
      <section className="flex gap-x-4">
        <div id="notFullfilled" className="shadow-md border py-4">
          <div className="flex justify-between">
            <h1 className="font-semibold ml-4">Pending</h1>
            <div className="join mr-4">
              <button
                className="join-item btn btn-xs"
                disabled={pendingPage === 1}
                onClick={() => setPendingPage((page) => page - 1)}
              >
                «
              </button>
              <button className="join-item btn btn-xs">
                Page {pendingPage}
              </button>
              <button
                className="join-item btn btn-xs"
                onClick={() => setPendingPage((page) => page + 1)}
                disabled={pendingPage === TotalInvoicePages}
              >
                »
              </button>
            </div>
          </div>
          <div className="mx-2 h-[274px]">
            <table className="table table-xs w-[300px]">
              <thead>
                <tr>
                  <th align="left">Invoice#</th>
                  <th align="center">Date</th>
                  <th align="right">Amount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {invoices
                  .filter((invoice: CustomerInvoice) => !invoice.isfulfilled)
                  .filter(
                    (invoice: CustomerInvoice, index: number) =>
                      index >= pendingPage * invoicePerPage - invoicePerPage &&
                      index < invoicePerPage * pendingPage
                  )
                  .map((invoice: CustomerInvoice, index: number) => (
                    <tr key={index} className="hover">
                      <td>{invoice.invoiceNumber}</td>
                      <td align="center">
                        {invoice.invoiceDate.toLocaleDateString()}
                      </td>
                      <td align="right">
                        {formatCurrency(invoice.totalAmount)}
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          value={invoice.id}
                          name="invoice"
                          checked={selectedInvoices.includes(invoice.id)}
                          onChange={handleInvoiceSelected}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="flex mt-2 border-t border-gray-400 pt-2 px-2 justify-between">
              <p className="text-sm">Total</p>
              <p className="text-sm pr-[40px]">{formatCurrency(totalAmount)}</p>
            </div>
            <div className="flex mt-2 border-t border-gray-400 pt-2 px-2 justify-between">
              <p className="text-md font-semibold">Grand Total:</p>
              <p className="text-md font-bold">
                {formatCurrency(totalAmount - totalAmount * (discount / 100))}
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="btn btn-xs bg-slate-800 text-white mt-2 mr-2"
              onClick={(e) => handleCreateCounterReceipt()}
              disabled={loading}
            >
              {loading ? (
                <span>
                  <Spinner />
                  &nbsp;CREATING COUNTER RECEIPT
                </span>
              ) : (
                "CREATE COUNTER RECEIPT"
              )}
            </button>
          </div>
        </div>
        {/* COUNTER RECEIPTS */}
        <div className="shadow-md border p-4">
          <h1 className="font-semibold ml-2">Check Vouchers</h1>
          <table className="table table-xs  w-[300px]">
            <thead>
              <tr>
                <th align="left">Due Date</th>
                <th align="right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {counterReceipts.map(
                (counterReceipt: CounterReceipt, index: number) => (
                  <tr key={index} className="hover">
                    <td>
                      <Link
                        href={`/admin/counter-receipts/${counterReceipt.id}`}
                      >
                        {counterReceipt.dueDate.toLocaleDateString()}
                      </Link>
                    </td>
                    <td align="right">
                      {formatCurrency(counterReceipt.totalAmount)}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default CustomerTransactions;
