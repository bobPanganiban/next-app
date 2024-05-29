"use client";
import Spinner from "@/app/components/Spinner";
import { useCurrency } from "@/app/hooks/useCurrency";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";

export interface Item {
  id: number;
  desc1: string;
  desc2: string;
  desc3: string;
  brand: {
    id: number;
    name: string;
  };
  qty?: string;
  price?: string;
}

export interface Warehouse {
  id: number;
  name: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Props {
  items?: Item[];
  sid: string;
  warehouses: Warehouse[];
}

const ItemsTable = ({ items, sid = "0", warehouses }: Props) => {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<number>(1);
  const [localItems, setLocalItems] = useState(items);
  const [invoiceDate, setInvoiceDate] = useState<string>("");
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [priceLoading, setPriceLoading] = useState<boolean>(false);

  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const formatCurrency = useCurrency();
  const selectedItem = watch("item");

  useEffect(() => {
    setLocalItems(items);
    reset();
    setSelectedItems([]);
  }, [items]);

  useEffect(() => {
    if (selectedItem) {
      setPriceLoading(true);
      axios.get(`/api/inventory?id=${selectedItem}`).then((response) => {
        if (response.data.length > 0) {
          setValue("price", response.data[0].price);
        } else {
          // do nothing
        }
        setPriceLoading(false);
      });
    }
  }, [selectedItem]);

  const handleAddItem = handleSubmit((data) => {
    let selectedItem = localItems?.find(
      (item) => item.id === parseInt(data.item)
    ) as Item;

    selectedItem.qty = data.qty;
    selectedItem.price = data.price.toString().replaceAll(",", "");
    setLocalItems((prev) =>
      prev?.filter((item) => item.id !== parseInt(data.item))
    );
    setSelectedItems((prev) => [...prev, selectedItem]);

    reset();
  });

  const handleRemoveItem = (index: number, item: Item) => {
    setLocalItems((currentItems) => [...currentItems!, item]);
    setSelectedItems((currentItems) => {
      return currentItems.filter((item, i) => i !== index);
    });
  };

  const getTotalAmount = () => {
    const total = selectedItems.reduce((acc, item) => {
      const price = parseFloat(item.price! || "0");
      const qty = parseFloat(item.qty || "1");

      return acc + price * qty;
    }, 0);

    return total;
  };

  const handleCreateInvoice = () => {
    setLoading(true);
    let body = {
      supplierId: parseInt(sid),
      warehouseId: selectedWarehouse,
      invoiceNumber: invoiceNumber,
      invoiceDate: invoiceDate,
      items: selectedItems,
      totalAmount: getTotalAmount(),
    };

    axios
      .post("/api/transactions/supplier", body)
      .then((res) => {
        setLoading(false);
        console.log(res);
        router.push(`/admin/invoices/supplier/${res.data.invoiceId}`);
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-0 overflow-y-auto">
      <div className="flex gap-x-8 w-[900px]">
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Invoice Date</span>
            </div>
            <input
              className="input input-bordered input-sm w-full max-w-xs"
              type="date"
              onChange={(event) => setInvoiceDate(event.target.value)}
              value={invoiceDate}
            />
          </label>
        </div>
        <div>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Warehouse</span>
            </div>
            <select
              className="select select-bordered select-sm w-full"
              onChange={(event) =>
                setSelectedWarehouse(parseInt(event.target.value))
              }
              defaultValue={1}
            >
              {warehouses?.map((warehouse) => (
                <option
                  key={warehouse.id}
                  value={warehouse.id}
                >{`${warehouse.name}`}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Invoice Number</span>
            </div>
            <input
              className="input input-bordered input-sm w-full max-w-xs"
              type="text"
              onChange={(event) => setInvoiceNumber(event.target.value)}
              value={invoiceNumber}
            />
          </label>
        </div>
      </div>
      <table className="table table-xs mt-4 w-[900px]">
        <thead>
          <tr>
            <th className="w-[10%]">Qty</th>
            <th className="w-[60%]">Item</th>
            <th className="w-[15%]">Price</th>
            <th className="w-[15%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {selectedItems.map((item: Item, index: number) => (
            <tr key={index}>
              <td className="w-[10%]">{item.qty}</td>
              <td className="w-[60%]">{`${item.brand.name} - ${item.desc1}${item.desc2}${item.desc3}`}</td>
              <td className="w-[15%]">
                {formatCurrency(parseFloat(item.price!))}
              </td>
              <td className="w-[15%]">
                <MdDelete
                  className="cursor-pointer text-red-800"
                  onClick={(e) => handleRemoveItem(index, item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedItems.length === 0 && (
        <div className="flex justify-center w-[900px] mt-4">
          - - - No Invoice Items - - -
        </div>
      )}
      <div className="pt-8 w-[900px]">
        <form onSubmit={handleAddItem} name="item" className="flex gap-2">
          <div className="w-[10%]">
            <input
              className="input input-bordered w-full input-sm max-w-xs"
              type="text"
              {...register("qty", { required: true, valueAsNumber: true })}
            />
          </div>
          <div className="w-[60%]">
            <select
              className="select select-bordered select-sm w-full"
              defaultValue=""
              {...register("item", { required: true })}
            >
              <option value=""></option>
              {localItems?.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >{`${item.brand.name} - ${item.desc1} ${item.desc2} ${item.desc3}`}</option>
              ))}
            </select>
          </div>
          <div className="w-[15%]">
            <input
              className="input input-bordered w-full input-sm max-w-xs"
              type="text"
              disabled={priceLoading}
              {...register("price", { required: true })}
            />
          </div>
          <div className="w-[15%]">
            <button type="submit" className="btn h-[2rem] min-h-[2rem] w-full">
              Add
            </button>
          </div>
        </form>
      </div>
      <div className="pt-8">
        <button
          className="btn bg-slate-800 text-white btn-sm"
          onClick={() => handleCreateInvoice()}
          disabled={loading}
        >
          {loading ? (
            <span>
              <Spinner />
              Creating Invoice
            </span>
          ) : (
            "Create"
          )}
        </button>
      </div>
    </div>
  );
};

export default ItemsTable;
