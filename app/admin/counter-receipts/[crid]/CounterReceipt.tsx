"use client";
import {
  CounterReceipt as CRInterface,
  Customer,
  CustomerInvoice,
} from "@/app/entities/entities";
import React, { useState } from "react";
import CounterReceiptHeader from "./CounterReceiptHeader";
import { useCurrency } from "@/app/hooks/useCurrency";
import { downloadPDF } from "@/app/utils/downloadPdf";
import PaymentInstruction from "./PaymentInstruction";

interface Props {
  counterReceipt: CRInterface;
}

const CounterReceipt = ({ counterReceipt }: Props) => {
  const [loader, setLoader] = useState(false);
  const formatCurrency = useCurrency();
  return (
    <>
      <button
        className="btn btn-sm bg-gray-800 text-white"
        onClick={async () => {
          setLoader(true);
          try {
            await downloadPDF(
              `CR-${counterReceipt.dueDate
                .toLocaleDateString()
                .replaceAll("/", "")}`,
              "T",
              "#counterReceipt"
            );
            setLoader(false);
          } catch (err) {
            setLoader(false);
          }
        }}
        disabled={loader}
      >
        {loader ? "Downloading" : "Download"}
      </button>
      <section id="counterReceipt" className="px-8 pb-2 mt-0 pt-0">
        <div className="w-full flex justify-center font-semibold text-lg underline mb-8 print:hidden">
          COUNTER RECEIPT
        </div>
        <div className="border-b-[3px] pb-2 mb-2 border-gray-800">
          <CounterReceiptHeader
            customer={counterReceipt.Customers as Customer}
            date={counterReceipt.dateCreated}
          />
        </div>
        <div className="w-full flex gap-x-4">
          <div className="w-[50%] flex-row">
            <div className="w-full flex justify-center border border-gray-800 font-semibold text-gray-800 text-[14px] pb-1">
              PARTICULARS
            </div>
            <div className="w-full flex-row border border-t-0 border-gray-800">
              <div className="mx-4 mb-2 h-[272px]">
                <table className="table table-xs w-full table-bordered">
                  <thead>
                    <tr className="border-transparent">
                      <th align="center" className="text-[10px] text-gray-800">
                        DATE
                      </th>
                      <th align="center" className="text-[10px] text-gray-800">
                        DR. NUMBER
                      </th>
                      <th align="right" className="text-[10px] text-gray-800">
                        AMOUNT
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {counterReceipt.CustomerInvoices?.map(
                      (invoice: CustomerInvoice) => (
                        <tr key={invoice.id} className="border-transparent">
                          <td
                            className="text-[10px] text-gray-800"
                            align="center"
                          >
                            {invoice.invoiceDate.toLocaleDateString()}
                          </td>
                          <td
                            className="text-[10px] text-gray-800"
                            align="center"
                          >
                            {invoice.invoiceNumber}
                          </td>
                          <td
                            className="text-[10px] text-gray-800"
                            align="right"
                          >
                            {formatCurrency(invoice.totalAmount)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="border border-gray-800 mt-[1px]">
              <div className="mx-4 pb-1">
                <table className="table table-xs">
                  <tbody>
                    <tr className="border-transparent">
                      <td
                        className="w-[60%] text-[11px] font-bold"
                        align="right"
                      >
                        TOTAL AMOUNT
                      </td>
                      <td
                        className="w-[40%] text-[14px] font-bold pb-1"
                        align="right"
                      >
                        {formatCurrency(counterReceipt.totalAmount)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="w-[50%] flex-row">
            <PaymentInstruction dueDate={counterReceipt.dueDate} />
          </div>
        </div>
      </section>
    </>
  );
};

export default CounterReceipt;
