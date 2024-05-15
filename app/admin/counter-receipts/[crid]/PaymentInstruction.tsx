import React from "react";

interface Props {
  dueDate: Date;
}

const PaymentInstruction = ({ dueDate }: Props) => {
  return (
    <>
      <div className="flex border border-gray-800 text-[14px] justify-center font-semibold  pb-1">
        NOTES:
      </div>
      <div className="flex-row border border-gray-800 border-t-transparent py-8">
        <div className="flex justify-center gap-x-2">
          <p className="text-[9px] mt-[4px]">DUE DATE IS ON:</p>{" "}
          <p className="font-bold text-[14px]">
            {dueDate.toLocaleDateString()}
          </p>
        </div>
        <div className="flex justify-center text-[9px] font-bold">
          (PLS. FOLLOW DUE DATE ACCORDINGLY)
        </div>
        <div className="flex justify-center text-[7px] font-bold">
          ORIGINAL DRS ARE ATTACHED ON DUPLICATE COPY OF THES COUNTER RECEIPT
        </div>
      </div>
      <div className="flex-row border border-gray-800 mt-4 h-[186px]">
        <div className="text-[11px] ml-4 mt-[100px]">
          RECEIVED BY: ________________________________________
        </div>
        <div className="text-[8px] ml-[120px] italic font-semibold">
          Signature Over Printed Name / Date
        </div>
      </div>
    </>
  );
};

export default PaymentInstruction;
