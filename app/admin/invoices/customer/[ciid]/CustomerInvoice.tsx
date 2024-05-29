"use client";
import React, { useEffect, useState } from "react";
import InvoiceHeader from "./InvoiceHeader";
import { useCurrency } from "@/app/hooks/useCurrency";
import { downloadPDF } from "@/app/utils/downloadPdf";

const CustomerInvoice = ({ invoice }: { invoice: any }) => {
  const [loader, setLoader] = useState(false);
  const [quantitiesByUnit, setQuantitiesByUnit] = useState<{
    [unitId: number]: number;
  }>({});

  useEffect(() => {
    const newQuantitiesByUnit = invoice.CustmerTransactions.reduce(
      (acc: any, item: any) => {
        const unitId = item.item.unitId;
        const unitQuantity = (acc[unitId] || 0) + item.quantity;
        return { ...acc, [unitId]: unitQuantity };
      },
      {}
    );

    setQuantitiesByUnit(newQuantitiesByUnit);
  }, []);

  const formatCurrency = useCurrency();

  return (
    <>
      <button
        className="btn btn-sm bg-gray-800 text-white"
        onClick={async () => {
          setLoader(true);
          try {
            await downloadPDF(invoice.invoiceNumber, "T", "#custInvoice");
            setLoader(false);
          } catch (err) {
            setLoader(false);
          }
        }}
        disabled={loader}
      >
        {loader ? "Downloading" : "Download"}
      </button>
      <section id="custInvoice" className="px-8 pb-2 mt-0 pt-0">
        <div className="flex w-full justify-end font-thin text-sm">
          {invoice.invoiceNumber}
        </div>
        <div className="w-full flex justify-center font-semibold text-lg underline mb-8">
          QUOTATION
        </div>
        <div className="border-b-[3px] pb-2 mb-2 border-gray-800">
          <InvoiceHeader
            customer={invoice.customer}
            date={invoice.invoiceDate}
          />
        </div>
        <div className="border-b-2 border-gray-800 h-[268px]">
          <table className="table table-xs">
            <thead>
              <tr className="border-b-transparent">
                <th className="w-[5%]">QTY</th>
                <th className="w-[10%]">UNIT</th>
                <th className="w-[15%]">BRAND</th>
                <th className="w-[40%]" align="center">
                  DESCRIPTION
                </th>
                <th className="w-[10%]" align="right">
                  PRICE
                </th>
                <th className="w-[10%]" align="right">
                  DISC. PRICE
                </th>
                <th className="w-[10%]" align="right">
                  TOTAL
                </th>
              </tr>
            </thead>
            <tbody>
              {invoice.CustmerTransactions.map(
                (transaction: any, index: number) => (
                  <tr className="border-b-transparent" key={index}>
                    <td>{transaction.supplied}</td>
                    <td>
                      {transaction.quantity > 1
                        ? transaction.item.unit.plural
                        : transaction.item.unit.name}
                    </td>
                    <td>{transaction.item.brand.name}</td>
                    <td align="left">
                      {transaction.item.desc1} {transaction.item.desc2}
                      {transaction.item.desc3}
                    </td>
                    <td align="right">
                      {transaction.storePrice > transaction.customerPrice
                        ? formatCurrency(transaction.storePrice)
                        : ""}
                    </td>
                    <td align="right">
                      {`${formatCurrency(transaction.customerPrice)}${
                        transaction.isSpecialPrice ? "*" : ""
                      }`}
                    </td>
                    <td align="right">
                      {formatCurrency(
                        transaction.customerPrice * transaction.supplied
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-x-2 text-xs font-semibold">
            {Object.entries(quantitiesByUnit).map(([unitId, quantity]) => {
              const unitName =
                invoice.CustmerTransactions.find(
                  (item: any) => item.item.unitId.toString() === unitId
                )?.item.unit.plural || "units";
              return (
                <div key={unitId}>
                  {quantity} {unitName}
                </div>
              );
            })}
          </div>
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
        <div className="flex justify-end pr-[35px]">
          <p className="italic text-[9px]">
            Customer&apos;s Signature Over Printed Name
          </p>
        </div>
      </section>
    </>
  );
};

export default CustomerInvoice;
