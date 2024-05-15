"use client";
import { useCurrency } from "@/app/hooks/useCurrency";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Invoice {
  id: number;
  supplierId: number;
  invoiceNumber: string;
  invoiceDate: Date;
  isfulfilled: boolean;
  totalAmount: number;
  dateCreated: Date;
  dateUpdated: Date;
  checkVouchersId: number | null;
}

interface CheckVoucher {
  id: number;
  discount: number;
  totalAmount: number;
  bank: string;
  checkNumber: string;
  dueDate: Date;
  dateCreated: Date;
  supplierId: number | null;
}

interface Props {
  invoices: Invoice[];
  checkVouchers: CheckVoucher[];
  supplierId: number;
  term: string;
}

const SupplierTransactions = ({
  invoices,
  supplierId,
  term,
  checkVouchers,
}: Props) => {
  const router = useRouter();
  const [selectedInvoices, setSelectedInvoices] = useState<number[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [pendingPage, setPendingPage] = useState<number>(1);
  const [bank, setBank] = useState<string>();
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

  const handleCreateCheckVoucher = async () => {
    // check if theres selected invoice
    if (selectedInvoices.length > 0) {
      const dueDate = new Date(
        invoices.find(
          (invoice) =>
            invoice.id === selectedInvoices[selectedInvoices.length - 1]
        )!.invoiceDate
      );
      dueDate.setDate(dueDate.getDate() + parseInt(term));

      const body = {
        supplierId: supplierId,
        dueDate: dueDate.toISOString(),
        totalAmount: totalAmount,
        discount: discount,
        invoiceIds: selectedInvoices,
        bank: bank,
      };

      // update local invoices
      setLoading(true);
      try {
        const checkVoucher = await axios.post(
          "/api/invoices/checkvouchers",
          body
        );
        setTotalAmount(0);
        setDiscount(0);
        setSelectedInvoices([]);
        console.log(checkVoucher);
        router.push(`/admin/check-vouchers/${checkVoucher.data.id}`);
        router.refresh();
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
    // update localInvoices
    // perform post call to create check voucher entry
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
                  ?.filter((invoice) => !invoice.isfulfilled)
                  .filter(
                    (invoice: Invoice, index: number) =>
                      index >= pendingPage * invoicePerPage - invoicePerPage &&
                      index < invoicePerPage * pendingPage
                  )
                  .map((invoice: Invoice, index: number) => (
                    <tr key={index} className="hover">
                      <td align="left">{invoice.invoiceNumber}</td>
                      <td align="center">
                        {invoice.invoiceDate.toLocaleDateString()}
                      </td>
                      <td align="right">
                        {formatCurrency(invoice.totalAmount)}
                      </td>
                      <td align="right">
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
              <p className="text-sm">{formatCurrency(totalAmount)}</p>
            </div>
            <div className="flex justify-between px-2">
              <p className="text-xs">Discount:</p>
              <p>
                <input
                  type="number"
                  className="input input-bordered input-xs w-[70px] text-right"
                  value={discount}
                  max={100}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                />
                %
              </p>
            </div>
            <div className="flex mt-2 border-t border-gray-400 pt-2 px-2 justify-between">
              <p className="text-md font-semibold">Grand Total:</p>
              <p className="text-md font-bold">
                {formatCurrency(totalAmount - totalAmount * (discount / 100))}
              </p>
            </div>
          </div>
          <div className="flex justify-between mx-2">
            <select
              className="select select-xs mt-2 select-bordered"
              name=""
              id=""
              defaultValue={""}
              onChange={(e) => setBank(e.target.value)}
              value={bank}
            >
              <option value="" disabled>
                SELECT BANK
              </option>
              <option value="Eastwest Bank">Eastwest Bank</option>
              <option value="Bank of the Philippine Island">BPI</option>
              <option value="Chinabank">Chinabank</option>
              <option value="Maybank">Maybank</option>
            </select>
            <button
              className="btn btn-xs bg-slate-800 text-white mt-2"
              onClick={(e) => handleCreateCheckVoucher()}
              disabled={loading}
            >
              CREATE CHECK VOUCHER
            </button>
          </div>
        </div>
        {/* FULLFILLED */}
        {/* <div id="fulfilled" className="shadow-md border p-4">
          <h1 className="font-semibold ml-2">Completed</h1>
          <table className="table table-xs  w-[300px]">
            <thead>
              <tr>
                <th align="left">Invoice#</th>
                <th align="center">Date</th>
                <th align="right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoices
                ?.filter((invoice) => invoice.isfulfilled)
                .map((invoice: Invoice, index: number) => (
                  <tr key={index} className="hover">
                    <td align="left">{invoice.invoiceNumber}</td>
                    <td align="center">
                      {invoice.invoiceDate.toLocaleDateString()}
                    </td>
                    <td align="right">{formatCurrency(invoice.totalAmount)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div> */}
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
              {checkVouchers.map(
                (checkVoucher: CheckVoucher, index: number) => (
                  <tr key={index}>
                    <td>{checkVoucher.dueDate.toLocaleDateString()}</td>
                    <td align="right">
                      {formatCurrency(checkVoucher.totalAmount)}
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

export default SupplierTransactions;
