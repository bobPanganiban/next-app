"use client";
import axios from "axios";
import React, { useState } from "react";

interface Props {
  bank: string;
  date: Date;
  id: number;
  check: string;
}

const BankDetails = ({ bank, date, id, check }: Props) => {
  const [checkNumber, setCheckNumber] = useState<string>(check);
  const [editCn, setEditCn] = useState<boolean>(false);

  const handleCheckNumber = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    setEditCn(false);

    axios
      .patch(`/api/invoices/checkvouchers`, { checkNumber, id })
      .then((res) => console.log(res));
  };

  return (
    <>
      <div className="w-full border border-gray-800 flex-row h-[250px]">
        <div className="flex justify-center">
          <table className="text-[10px] mt-12">
            <tbody>
              <tr>
                <td align="right">BANK:</td>
                <td align="right" className="w-[150px]">
                  {bank}
                </td>
              </tr>
              <tr>
                <td align="right">CHECK NO:</td>
                <td align="right">
                  {editCn ? (
                    <input
                      type="text"
                      className="input input-bordered input-xs text-right"
                      value={checkNumber}
                      onBlur={handleCheckNumber}
                      onChange={(e) => setCheckNumber(e.target.value)}
                    />
                  ) : (
                    <div
                      onClick={(e) => setEditCn(true)}
                      className={`h-[18px] pb-2 text-gray-800 font-semibold text-xs border-b-[1px]`}
                    >
                      {checkNumber}
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td align="right">DATE:</td>
                <td align="right">{date.toLocaleDateString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-[11px] pl-[47px] mt-8">
          PREPARED BY: _______________________________
        </div>
        <div className="text-[11px] pl-[44px] mt-8">
          APPROVED BY: _______________________________
        </div>
      </div>
      <div className="w-full border border-gray-800 flex-row h-[142px] mt-4">
        <div className="text-[11px] pl-[44px] mt-[60px]">
          RECEIVED BY: _______________________________
        </div>
        <div className="text-[8px] pl-[125px] italic font-semibold">
          Signature Over Printed Name / Date
        </div>
      </div>
    </>
  );
};

export default BankDetails;
