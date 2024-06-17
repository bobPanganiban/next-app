"use client";
import React, { useEffect, useState } from "react";
import { Brand, ItemInventory } from "@/app/entities/entities";
import { useCurrency } from "@/app/hooks/useCurrency";
import { FaPrint } from "react-icons/fa";

interface Props {
  itemInventories: ItemInventory[];
  brands: Brand[];
}

const InventoriesTable = ({ itemInventories, brands }: Props) => {
  const formatCurrency = useCurrency();
  const [searchString, setSearchString] = useState<string>("");
  const [brandId, setBrandId] = useState<number>(0);
  const [showWithStockOnly, setShowWithStockOnly] = useState<boolean>(false);
  const [showItemWorth, setShowItemWorth] = useState<boolean>(false);
  const [inventories, setInventories] = useState<ItemInventory[]>([]);

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
    setInventories(
      itemInventories.reduce(
        (acc: ItemInventory[], inventory: ItemInventory) => {
          let withStock =
            inventory.inventories.filter((i) => i.count > 0).length > 0;

          let brandSelected =
            !brandId || brandId === 0 || inventory.brandId === brandId;

          if (brandSelected) {
            acc.push(inventory);
          }

          return acc;
        },
        [] as ItemInventory[]
      )
    );
  }, [brandId]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <>
      <div className="flex justify-between mb-2 gap-x-7">
        <select
          onChange={(e) => {
            setBrandId(parseInt(e.target.value));
          }}
          className="select select-bordered select-xs w-full max-w-xs print:hidden"
        >
          <option value={0}>ALL</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
        <button onClick={(e) => handlePrint()} className="print:hidden">
          <FaPrint className="text-gray-700" />
        </button>
      </div>
      <div className="flex justify-between mb-2">
        <div className="flex gap-4 print:hidden">
          <div>
            <span className="text-xs text-gray-800 italic">Search/Filter:</span>
            <input
              type="text"
              className="input input-xs input-bordered"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </div>
          <div>
            <span className="text-xs text-gray-800 italic">
              Show with stock only
            </span>
            <input
              type="checkbox"
              className="checkbox checkbox-xs ml-2"
              checked={showWithStockOnly}
              onChange={(e) => setShowWithStockOnly(e.target.checked)}
            />
          </div>
          <div>
            <span className="text-xs text-gray-800 italic">
              Show item worth
            </span>
            <input
              type="checkbox"
              className="checkbox checkbox-xs ml-2"
              checked={showItemWorth}
              onChange={(e) => setShowItemWorth(e.target.checked)}
            />
          </div>
        </div>
        {showItemWorth && (
          <div className="text-gray-800 text-xl">
            WORTH: {formatCurrency(worth)}
          </div>
        )}
      </div>
      <div className="min-h-[420px]">
        <table className="table table-xs">
          <thead>
            <tr>
              {/* <th className="w-[50px]">ID</th> */}
              <th className="w-[400px]">Item</th>
              <th className="w-[150px]">W1</th>
              <th className="w-[150px]">W2</th>
              <th className="w-[150px]">W3</th>
              <th className="w-[75px]" align="center">
                Total
              </th>
              {showItemWorth && (
                <th className="w-[125px]" align="right">
                  Worth
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {inventories
              .filter((item) => {
                let withStock =
                  item.inventories.filter((inv) => inv.count > 0).length > 0;
                let withSearchString =
                  `${item.desc1} ${item.desc2} ${item.desc3}`
                    .toUpperCase()
                    .includes(searchString.toUpperCase());

                if (
                  showWithStockOnly &&
                  withStock &&
                  (withSearchString || searchString === "")
                )
                  return true;
                if (
                  !showWithStockOnly &&
                  (withSearchString || searchString === "")
                )
                  return true;
                return false;
              })
              .map((item: any, index: number) => (
                <tr className="hover" key={index}>
                  {/* <td className="align-top w-[50px] p-1">{item.id}</td> */}
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
                  {showItemWorth && (
                    <td align="right">
                      {formatCurrency(
                        item.inventories.reduce(
                          (accumulator: number, currentItem: any) =>
                            accumulator + currentItem.count * currentItem.price,
                          0
                        )
                      )}
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default InventoriesTable;
