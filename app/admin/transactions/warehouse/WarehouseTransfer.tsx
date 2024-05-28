"use client";
import { TbTransferIn } from "react-icons/tb";
import { Inventories } from "@/app/entities/entities";
import { useCurrency } from "@/app/hooks/useCurrency";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";

interface Props {
  inventories: Inventories[];
}

interface Payload {
  warehouseId: number;
  targetWarehouseId: number;
  transactions: Transaction[];
}

interface Transaction {
  quantityTransfered: number;
  quantityRemain: number;
  id: number;
}

const WarehouseTransfer = ({ inventories }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const warehouses = [1, 2, 3];
  const [from, setFrom] = useState<number>(1);
  const [to, setTo] = useState<number>(2);

  const [selectedItems, setSelectedItems] = useState<Inventories[]>([]);
  const [selectedItem, setSelectedItem] = useState<number>(inventories[0].id);
  const [transferQuantity, setTransferQuantity] = useState<number>(0);

  const [selectedBrand, setSelectedBrand] = useState<string>("ALL");
  const brands = getUniqueBrandNames(inventories);

  const formatCurrency = useCurrency();

  const handleAdd = () => {
    if (!selectedItem || !selectedBrand) {
      console.log(`select brand or item`);
    }

    let itemDetail = inventories.find((inv) => inv.id === selectedItem);
    if (
      itemDetail &&
      itemDetail.count &&
      itemDetail.count >= transferQuantity
    ) {
      // add
      itemDetail.transfer = transferQuantity;
      setSelectedItems((prev: Inventories[]) => [...prev, itemDetail!]);
      setSelectedItem(0);
      setTransferQuantity(0);
    }
  };

  const handleRemove = (id: number) => {
    setSelectedItems((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleTransfer = () => {
    setLoading(true);
    const payload: Payload = {
      warehouseId: from,
      targetWarehouseId: to,
      transactions: selectedItems.map((item) => {
        return {
          id: item.id,
          quantityTransfered: item.transfer,
          quantityRemain: item.count - (item.transfer || 0),
        } as Transaction;
      }),
    };

    axios
      .post("/api/transactions/warehouse", payload)
      .then((res) => {
        router.push("/admin/invoices/warehouse");
        router.refresh();
      })
      .catch((err) => setLoading(false));
  };

  return (
    <>
      <div className="flex mb-2 gap-x-2">
        <select
          className="select select-bordered"
          value={from}
          onChange={(e) => setFrom(parseInt(e.target.value))}
        >
          {warehouses.map((warehouse: number, index: number) => (
            <option value={warehouse} key={index}>
              Warehouse {warehouse}
            </option>
          ))}
        </select>
        <TbTransferIn className="text-gray-800 text-3xl mt-2" />
        <select
          className="select select-bordered"
          value={to}
          onChange={(e) => setTo(parseInt(e.target.value))}
        >
          {warehouses
            .filter((wh) => wh !== from)
            .map((warehouse: number, index: number) => (
              <option value={warehouse} key={index}>
                Warehouse {warehouse}
              </option>
            ))}
        </select>
      </div>
      <div className="w-[900px]">
        <table className="table table-bordered table-xs">
          <thead>
            <tr>
              <th>ID</th>
              <th>Brand</th>
              <th>Description</th>
              <th>Count</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((item: Inventories, index: number) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.item.brand.name}</td>
                <td>
                  {item.item.desc1} {item.item.desc2} {item.item.desc3}
                </td>
                <td>{item.transfer}</td>
                <td>
                  <MdDelete
                    className="cursor-pointer text-red-800"
                    onClick={() => handleRemove(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <section className="flex gap-x-2 w-[900px] border-t-[1px] border-gray-800 pt-2 mt-2">
        <div className="w-[20%]">
          <select
            className="select select-bordered select-xs w-full"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value={"ALL"}>ALL</option>
            {brands.map((brand: string, index: number) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[30%]">
          <select
            className="select select-bordered select-xs w-full"
            value={selectedItem}
            onChange={(e) => setSelectedItem(parseInt(e.target.value))}
          >
            <option value={0}></option>
            {inventories
              .filter(
                (inv) =>
                  inv.item.brand.name === selectedBrand ||
                  selectedBrand === "ALL"
              )
              .filter((inv) => inv.warehouseId === from)
              .filter(
                (inv) => !selectedItems.find((item) => item.id === inv.id)
              )
              .map((inv) => (
                <option value={inv.id} key={inv.id}>
                  {inv.item.desc1} {inv.item.desc2} {inv.item.desc3} @{" "}
                  {formatCurrency(inv.price)}
                </option>
              ))}
          </select>
        </div>
        <div className="w-[20%]">
          <span className="text-xs">Current stock</span>
          <span>
            {
              inventories.find((inventory) => selectedItem === inventory.id)
                ?.count
            }
          </span>
        </div>
        <div className="w-[20%] flex">
          <span className="text-xs w-[50%]">Transfer</span>
          <span className="w-[50%]">
            <input
              type="text"
              className="input input-bordered input-xs w-full"
              value={transferQuantity}
              onChange={(e) => setTransferQuantity(parseInt(e.target.value))}
            />
          </span>
        </div>
        <div className="w-[10%]">
          <button
            className="btn btn-xs w-full text-white bg-gray-800 font-thin text-xs"
            onClick={(e) => handleAdd()}
          >
            ADD
          </button>
        </div>
      </section>
      <button
        className="btn btn-bordered btn-sm mt-2 "
        onClick={(e) => handleTransfer()}
        disabled={loading}
      >
        {loading ? (
          <span>
            <Spinner />
            Initiating Transfer
          </span>
        ) : (
          "Transfer"
        )}
      </button>
    </>
  );
};

const getUniqueBrandNames = (records: Inventories[]): string[] => {
  const brandNames = new Set<string>();

  records.forEach((record) => {
    brandNames.add(record.item.brand.name);
  });

  return Array.from(brandNames); // Convert Set to Array to return
};

export default WarehouseTransfer;
