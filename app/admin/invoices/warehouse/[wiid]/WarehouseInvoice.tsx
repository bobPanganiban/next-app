"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  invoice: any;
}

const WarehouseInvoice = ({ invoice }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const handleReceive = () => {
    setLoading(true);
    axios
      .put(`/api/transactions/warehouse`, { id: invoice.id })
      .then((res) => {
        console.log(res);
        router.push("/admin/invoices/warehouse");
        router.refresh();
      })
      .catch((err) => setLoading(false));
  };

  return (
    <div className="flex-row">
      <div className="flex">
        <div className="w-[100px] text-sm">FROM:</div>{" "}
        <div className="text-gray-800 text-xl">
          Warehouse {invoice.warehouseId}
        </div>
      </div>
      <div className="flex">
        <div className="w-[100px] text-sm">TO:</div>{" "}
        <div className="text-gray-800 text-xl">
          Warehouse {invoice.targetWarehouseId}
        </div>
      </div>
      <div>
        <table className="table table-xs table-borderd">
          <thead>
            <tr>
              <td>ITEM</td>
              <td>AMOUNT TRANSFERED</td>
            </tr>
          </thead>
          <tbody>
            {invoice.WarehouseTransactions.map(
              (transaction: any, index: number) => (
                <tr key={index}>
                  <td>
                    {transaction.Inventory.item.brand.name}-
                    {transaction.Inventory.item.desc1}{" "}
                    {transaction.Inventory.item.desc2}{" "}
                    {transaction.Inventory.item.desc3}
                  </td>
                  <td>{transaction.count}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-2">
        <button
          className="btn btn-sm text-white bg-slate-800 font-thin"
          onClick={(e) => handleReceive()}
          disabled={invoice.isFullfilled || loading}
        >
          {loading ? "RECEIVING . . ." : "RECEIVE"}
        </button>
      </div>
    </div>
  );
};

export default WarehouseInvoice;
