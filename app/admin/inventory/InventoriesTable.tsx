"use client";
import { ItemInventory } from "@/app/entities/entities";
import { useCurrency } from "@/app/hooks/useCurrency";
import React, { useState } from "react";

interface Props {
  itemInventories: ItemInventory[];
}

const InventoriesTable = ({ itemInventories }: Props) => {
  const formatCurrency = useCurrency();
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 10;
  const TotalPages = Math.ceil(itemInventories.length / itemsPerPage);

  return (
    <>
      <table className="table table-xs max-w-[950px]">
        <thead>
          <tr>
            <th className="w-[50px]">ID</th>
            <th className="w-[400px]">Item</th>
            <th className="w-[150px]">W1</th>
            <th className="w-[150px]">W2</th>
            <th className="w-[150px]">W3</th>
            <th className="w-[150px]" align="center">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {itemInventories
            .filter(
              (inventory: ItemInventory, index: number) =>
                index >= page * itemsPerPage - itemsPerPage &&
                index < itemsPerPage * page
            )
            .map((item: any, index: number) => (
              <tr key={index}>
                <td className="align-top w-[50px] p-1">{item.id}</td>
                <td className="align-top p-1">{`${item.brand.name} - ${item.desc1} ${item.desc2} ${item.desc3}`}</td>
                <td className="align-top p-1">
                  {item.inventories.map((inventory: any, index: number) => {
                    if (inventory.warehouseId === 1)
                      return (
                        <div className="flex m-1" key={index}>
                          {inventory.count}
                          <div
                            className={`badge badge-outline badge-xs ml-1 text-[11px] p-[8px] shadow-sm border-gray-400`}
                          >
                            {formatCurrency(inventory.price)}
                          </div>
                        </div>
                      );
                  })}
                </td>
                <td className="align-top p-1">
                  {item.inventories.map((inventory: any) => {
                    if (inventory.warehouseId === 2)
                      return (
                        <div className="flex m-1 justify-between" key={index}>
                          <div>{inventory.count}</div>
                          <div
                            className={`badge badge-outline badge-xs ml-1 text-[11px] p-[8px] shadow-sm border-gray-400`}
                          >
                            {formatCurrency(inventory.price)}
                          </div>
                        </div>
                      );
                  })}
                </td>
                <td className="align-top p-1">
                  {item.inventories.map((inventory: any) => {
                    if (inventory.warehouseId === 3)
                      return (
                        <div className="flex m-1" key={index}>
                          {inventory.count}
                          <div
                            className={`badge badge-outline badge-xs ml-1 text-[11px] p-[8px] shadow-sm border-gray-400`}
                          >
                            {formatCurrency(inventory.price)}
                          </div>
                        </div>
                      );
                  })}
                </td>
                <td className="font-bold text-gray-800 py-1" align="center">
                  {item.inventories.reduce(
                    (accumulator: number, currentItem: any) =>
                      accumulator + currentItem.count,
                    0
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="join mt-4">
        <button
          className="join-item btn btn-xs"
          disabled={page === 1}
          onClick={() => setPage((page) => page - 1)}
        >
          «
        </button>
        <button className="join-item btn btn-xs">Page {page}</button>
        <button
          className="join-item btn btn-xs"
          onClick={() => setPage((page) => page + 1)}
          disabled={page === TotalPages}
        >
          »
        </button>
      </div>
    </>
  );
};

export default InventoriesTable;
