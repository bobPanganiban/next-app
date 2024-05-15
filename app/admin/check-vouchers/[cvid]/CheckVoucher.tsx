"use client";
import {
  CheckVoucher as Interface,
  Supplier,
  SupplierInvoice,
} from "@/app/entities/entities";
import React, { useState } from "react";
import CheckVoucherHeader from "./CheckVoucherHeader";
import { useCurrency } from "@/app/hooks/useCurrency";
import { downloadPDF } from "@/app/utils/downloadPdf";
import BankDetails from "./BankDetails";

interface Props {
  checkVoucher: Interface;
}

const CheckVoucher = ({ checkVoucher }: Props) => {
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
              `${checkVoucher.bank}-${checkVoucher.dueDate
                .toLocaleDateString()
                .replaceAll("/", "")}`,
              "D",
              "#checkVoucher"
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
      <section id="checkVoucher" className="px-8 pb-2 mt-0 pt-0">
        <div className="w-full flex justify-center font-semibold text-lg underline mb-8">
          CHECK VOUCHER
        </div>
        <div className="border-b-[3px] pb-2 mb-2 border-gray-800">
          <CheckVoucherHeader
            supplier={checkVoucher.Supplier as Supplier}
            date={checkVoucher.dateCreated}
          />
        </div>
        <div className="w-full flex gap-x-4">
          <div className="w-[50%] flex-row">
            <div className="w-full flex justify-center border border-gray-800 font-semibold text-gray-800 text-[14px] pb-1">
              PARTICULARS
            </div>
            <div className="w-full flex-row border border-t-0 border-gray-800">
              <p className="text-[11px] font-bold ml-2">PAYMENT FOR:</p>
              <div className="mx-4 mb-2 h-[272px]">
                <table className="table table-xs w-full table-bordered">
                  <thead>
                    <tr className="border-transparent">
                      <th align="center"></th>
                      <th align="right"></th>
                      <th align="right" className="text-[8px] text-gray-800">
                        AMOUNT
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {checkVoucher.SupplierInvoices?.map(
                      (invoice: SupplierInvoice) => (
                        <tr key={invoice.id} className="border-transparent">
                          <td className="text-[10px] text-gray-800">
                            {invoice.invoiceNumber}
                          </td>
                          <td className="text-[10px] text-gray-800">
                            {invoice.invoiceDate.toLocaleDateString()}
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
              <div className="mx-4 pb-1">
                <table className="table table-xs">
                  <tbody>
                    <tr className="border-transparent">
                      <td
                        className="font-bold text-gray-800 text-[10px] w-[60%]"
                        align="right"
                      >
                        TOTAL
                      </td>
                      <td align="right">
                        {formatCurrency(checkVoucher.totalAmount)}
                      </td>
                    </tr>
                    <tr className="border-transparent">
                      <td
                        className="font-thin text-gray-800 text-[8px] pb-1 w-[40%]"
                        align="right"
                      >
                        LESS DISC/REBATE
                      </td>
                      <td align="right">{checkVoucher.discount / 100}</td>
                    </tr>
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
                        GRAND TOTAL
                      </td>
                      <td
                        className="w-[40%] text-[14px] font-bold pb-1"
                        align="right"
                      >
                        {formatCurrency(
                          checkVoucher.totalAmount -
                            checkVoucher.totalAmount *
                              (checkVoucher.discount / 100)
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/** right panel start */}
          <div className="w-[50%] flex-row">
            <BankDetails
              bank={checkVoucher.bank}
              date={checkVoucher.dueDate}
              id={checkVoucher.id}
              check={checkVoucher.checkNumber || ""}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckVoucher;
