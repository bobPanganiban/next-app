import { Customer } from "@/app/entities/entities";
import React from "react";

interface Props {
  customer: Customer;
  date: Date;
}

const CounterReceiptHeader = ({ customer, date }: Props) => {
  return (
    <div className="flex-row w-full">
      <div className="flex justify-between text-xs">
        <table>
          <tbody>
            <tr>
              <td className="w-[100px] font-thin">CUSTOMER:</td>
              <td className="font-semibold">{customer.name}</td>
            </tr>
            <tr>
              <td className="font-thin">ADDRESS:</td>
              <td className="font-semibold">{customer.address}</td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <td className="w-[75px] font-light">DATE:</td>
              <td className="font-semibold">{date.toLocaleDateString()}</td>
            </tr>
            <tr>
              <td className="w-[75px] font-light">TERM:</td>
              <td className="font-semibold">
                {customer.termId === 1
                  ? customer.term?.days
                  : `${customer.term?.days} days`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CounterReceiptHeader;
