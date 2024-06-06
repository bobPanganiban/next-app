"use client";
import React, { useState } from "react";
import InvoiceHeader from "./InvoiceHeader";
import { useCurrency } from "@/app/hooks/useCurrency";
import { downloadPDF } from "@/app/utils/downloadPdf";
import { useSession } from "next-auth/react";
import { useUserProfile } from "@/app/hooks/useUserProfile";

const SupplierInvoice = ({ invoice }: { invoice: any }) => {
  const [loader, setLoader] = useState(false);
  const formatCurrency = useCurrency();
  const { data: user } = useSession();
  const { data: userProfile } = useUserProfile(user?.user?.email || "");

  return (
    <div>
      <button
        className="btn btn-sm bg-gray-800 text-white"
        onClick={() => downloadPDF(invoice.invoiceNumber, "S", "#supInvoice")}
        disabled={loader}
      >
        {loader ? "Downloading" : "Download"}
      </button>
      <section id="supInvoice" className="px-8 pb-2 mt-0 pt-0">
        <div className="flex w-full justify-end font-thin text-sm">
          {invoice.invoiceNumber}
        </div>
        <div className="w-full flex justify-center font-semibold text-lg underline mb-8">
          SUPPLIER INVOICE
        </div>
        <div className="border-b-[3px] pb-2 mb-1 border-gray-800">
          <InvoiceHeader
            supplier={invoice.supplier}
            date={invoice.invoiceDate}
          />
        </div>
        <div className="border-b-2 border-gray-800 h-[275px]">
          <table className="table table-xs">
            <thead>
              <tr className="border-b-transparent">
                <th>QTY</th>
                <th>Brand</th>
                <th align="center">Description</th>
                <th align="right">Price</th>
                <th align="right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.Transactions.map((transaction: any) => (
                <tr className="border-b-transparent" key={transaction.id}>
                  <td>{transaction.quantity}</td>
                  <td>{transaction.item.brand.name}</td>
                  <td>
                    {transaction.item.desc1} {transaction.item.desc2}{" "}
                    {transaction.item.desc3}
                  </td>
                  <td align="right">
                    {formatCurrency(transaction.inventory.price)}
                  </td>
                  <td align="right">
                    {formatCurrency(
                      transaction.quantity * transaction.inventory.price
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-x-2 text-xs font-semibold">&nbsp;</div>
          <div className="flex gap-x-2 font-semibold text-sm">
            <p>GRAND TOTAL:</p>
            <p>{formatCurrency(invoice.totalAmount)}</p>
          </div>
        </div>
        <div className="flex w-full text-xs mt-4 gap-x-2">
          <div className="w-[50%] flex justify-between">
            <div>CHECKED BY:</div>
            <div className="border-b-[1px] border-b-gray-800 w-[235px]">
              &nbsp;
            </div>
          </div>
          <div className="w-[50%] flex justify-between">
            <div>RECEIVED BY:</div>
            <div className="border-b-[1px] border-b-gray-800 w-[235px]">
              &nbsp;
            </div>
          </div>
        </div>
        <div className="flex justify-end pr-[60px]">
          <p className="italic text-[9px]">Signature Over Printed Name</p>
        </div>
      </section>
    </div>
  );
};

export default SupplierInvoice;
