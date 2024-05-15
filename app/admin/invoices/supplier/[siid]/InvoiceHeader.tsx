import React from "react";

const SupplierInvoiceHeader = ({
  supplier,
  date,
}: {
  supplier: any;
  date: Date;
}) => {
  return (
    <div className="flex-row w-full">
      <div className="flex justify-between text-xs">
        <table>
          <tbody>
            <tr>
              <td className="w-[100px] font-thin">SUPPLIER:</td>
              <td className="font-semibold">{supplier.name}</td>
            </tr>
            <tr>
              <td className="font-thin">ADDRESS:</td>
              <td className="font-semibold">{supplier.address}</td>
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
                {supplier.termId === 1
                  ? supplier.Terms.days
                  : `${supplier.Terms.days} days`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierInvoiceHeader;
