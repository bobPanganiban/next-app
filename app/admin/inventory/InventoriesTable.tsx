"use client";
import React, { useEffect, useState } from "react";
import { ItemInventory } from "@/app/entities/entities";
import { useCurrency } from "@/app/hooks/useCurrency";

interface Props {
  itemInventories: ItemInventory[];
  supplierId?: number;
}

const InventoriesTable = ({ itemInventories, supplierId }: Props) => {
  const formatCurrency = useCurrency();
  const [page, setPage] = useState<number>(1);
  const [inventories, setInventories] = useState<ItemInventory[]>([]);
  const itemsPerPage = 15;
  const TotalPages = Math.ceil(inventories.length / itemsPerPage);

  const worth = inventories.reduce((acc: number, inventory: ItemInventory) => {
    return (
      acc +
      inventory.inventories.reduce(
        (accInner: number, inv: { count: number; price: number }) => {
          return accInner + inv.count * inv.price;
        },
        0
      )
    );
  }, 0);

  useEffect(() => {
    setPage(1);
    setInventories(
      itemInventories.reduce(
        (acc: ItemInventory[], inventory: ItemInventory) => {
          if (
            !supplierId ||
            supplierId === 0 ||
            inventory.supplierId === supplierId
          ) {
            acc.push(inventory);
          }
          return acc;
        },
        [] as ItemInventory[]
      )
    );
  }, [supplierId]);

  return (
    <>
      <div className="flex justify-between mb-2">
        <div className="text-gray-800 text-xl">
          WORTH: {formatCurrency(worth)}
        </div>
      </div>
      <div className="min-h-[420px]">
        <table className="table table-xs">
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
            {inventories
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
                    {item.inventories.map((inventory: any, i: number) => {
                      if (inventory.warehouseId === 1 && inventory.count > 0)
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
                    })}
                  </td>
                  <td className="align-top p-1">
                    {item.inventories.map((inventory: any, i: number) => {
                      if (inventory.warehouseId === 2 && inventory.count > 0)
                        return (
                          <div className="flex m-1 " key={`W2-${i}`}>
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
                    {item.inventories.map((inventory: any, i: number) => {
                      if (inventory.warehouseId === 3 && inventory.count > 0)
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
                    })}
                  </td>
                  <td
                    className="align-top font-bold text-gray-800 py-1"
                    align="center"
                  >
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
      </div>
      <div className="join mt-4">
        <button
          className="join-item btn btn-xs"
          disabled={page === 1}
          onClick={() => setPage((page) => page - 1)}
        >
          «
        </button>
        <button className="join-item btn btn-xs">
          Page {page} of {TotalPages}
        </button>
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
