"use client";
import { ItemInventory } from "@/app/entities/entities";
import { useCurrency } from "@/app/hooks/useCurrency";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Print = ({ inventories }: { inventories: ItemInventory[] }) => {
  const router = useRouter();
  const formatCurrency = useCurrency();
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.print();
    }
  }, []);

  return (
    <div>
      <button
        className="btn btn-sm text-white bg-slate-800 print:hidden"
        onClick={(e) => router.back()}
      >
        BACK
      </button>
      <div className="flex justify-between">
        <h1>Inventory as of {new Date().toLocaleDateString()}</h1>
        <h1>
          Grand Total:{" "}
          {formatCurrency(
            inventories.reduce((acc: number, inventory: ItemInventory) => {
              const totalPerItem = inventory.inventories.reduce(
                (acc: number, inv: any) => {
                  return acc + inv.count * inv.price;
                },
                0
              );
              return acc + totalPerItem;
            }, 0)
          )}
        </h1>
      </div>
      <table className="table table-zebra table-xs">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>W1</th>
            <th>W2</th>
            <th>W3</th>
            <th>Total</th>
            <th>Worth</th>
          </tr>
        </thead>
        <tbody>
          {inventories.map((inventory: ItemInventory) => (
            <tr key={inventory.id}>
              <td>{inventory.id}</td>
              <td>
                {inventory.brand.name} - {inventory.desc1} {inventory.desc2}{" "}
                {inventory.desc3}
              </td>
              <td>
                {inventory.inventories.map((inventory: any, i: number) => {
                  if (inventory.warehouseId === 1 && inventory.count > 0) {
                    return (
                      <div className="flex m-1" key={`W1-${i}`}>
                        {inventory.count}
                        <div
                          className={`badge badge-outline badge-xs ml-1 text-[11px] p-[8px] shadow-sm border-gray-400`}
                        >
                          {formatCurrency(inventory.price)}
                        </div>
                      </div>
                    );
                  }
                })}
              </td>
              <td>
                {inventory.inventories.map((inventory: any, i: number) => {
                  if (inventory.warehouseId === 2 && inventory.count > 0) {
                    return (
                      <div className="flex m-1" key={`W2-${i}`}>
                        {inventory.count}
                        <div
                          className={`badge badge-outline badge-xs ml-1 text-[11px] p-[8px] shadow-sm border-gray-400`}
                        >
                          {formatCurrency(inventory.price)}
                        </div>
                      </div>
                    );
                  }
                })}
              </td>
              <td>
                {inventory.inventories.map((inventory: any, i: number) => {
                  if (inventory.warehouseId === 3 && inventory.count > 0) {
                    return (
                      <div className="flex m-1" key={`W3-${i}`}>
                        {inventory.count}
                        <div
                          className={`badge badge-outline badge-xs ml-1 text-[11px] p-[8px] shadow-sm border-gray-400`}
                        >
                          {formatCurrency(inventory.price)}
                        </div>
                      </div>
                    );
                  }
                })}
              </td>
              <td>
                {inventory.inventories.reduce(
                  (accumulator: number, currentItem: any) =>
                    accumulator + currentItem.count,
                  0
                )}
              </td>
              <td align="right">
                {formatCurrency(
                  inventory.inventories.reduce(
                    (accumulator: number, currentItem: any) =>
                      accumulator + currentItem.count * currentItem.price,
                    0
                  )
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Print;
