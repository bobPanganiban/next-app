"use client";
import Spinner from "@/app/components/Spinner";
import { CustomerInvoice, Item } from "@/app/entities/entities";
import { useBrands } from "@/app/hooks/useBrands";
import { useCurrency } from "@/app/hooks/useCurrency";
import { useItems } from "@/app/hooks/useItems";
import { handlePrice } from "@/app/utils/priceUtils";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";

interface Props {
  onSave: (formData: ItemFormEntry[]) => void;
  prefix: "CAL" | "INT" | "W";
  loading: boolean;
}

export interface ItemFormEntry {
  itemId: number;
  itemDescription: string;
  unit: string;
  quantity: number;
  currentInventory: number;
  quantitySupplied: number;
  storePrice: number;
  price: number;
  supplied: "ALL" | "PARTIAL" | "TO_FOLLOW";
}

const CustomerItemTable = ({ onSave, prefix, loading = false }: Props) => {
  const [selectedItems, setSelectedItems] = useState<ItemFormEntry[]>(
    [] as ItemFormEntry[]
  );
  const [selectedItem, setSelectedItem] = useState<Item>({} as Item);
  const [selectedBrand, setSelectedBrand] = useState<number>(0);
  const [isSpecialPrice, setIsSpecialPrice] = useState<boolean>(false);
  const { register, handleSubmit, reset: resetItemSelect } = useForm();
  const { data: brands, isLoading: brandsLoading } = useBrands();
  const { data: items, isLoading: itemsLoading } = useItems();
  const formatCurrency = useCurrency();

  const handleSelectedItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem(
      items?.data.filter(
        (item: Item) => item.id === parseInt(e.target.value)
      )[0]
    );
  };

  const handleSelectBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem({} as Item);
    setSelectedBrand(parseInt(e.target.value));
    resetItemSelect();
  };

  const handleAddItem = handleSubmit((data) => {
    let itemDetail: ItemFormEntry = {
      itemId: selectedItem.id,
      itemDescription: `${selectedItem.brand.name} - ${selectedItem.desc1} ${selectedItem.desc2} ${selectedItem.desc3}`,
      unit: selectedItem.unit.name,
      quantity: parseInt(data.quantity),
      currentInventory: selectedItem.inventoryCount,
      quantitySupplied:
        selectedItem.inventoryCount > parseInt(data.quantity)
          ? parseInt(data.quantity)
          : selectedItem.inventoryCount,
      price: parseFloat(data.price),
      storePrice: handlePrice(selectedItem.store, {
        d1: selectedItem.discount1,
        d2: selectedItem.discount2,
        d3: selectedItem.discount3,
        d4: selectedItem.discount4,
      }),
      supplied:
        selectedItem.inventoryCount > parseInt(data.quantity)
          ? "ALL"
          : "PARTIAL",
    };

    setSelectedItems((prev) => [...prev, itemDetail]);
    setSelectedItem({} as Item);
    resetItemSelect();
  });

  const handleRemoveItem = (index: number) => {
    setSelectedItems((currentItems) => {
      return currentItems.filter((item, i) => i !== index);
    });
  };

  const handleNotEnoughStock = (
    value: "PARTIAL" | "TO_FOLLOW",
    index: number
  ) => {
    setSelectedItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              supplied: value,
              quantitySupplied:
                value === "TO_FOLLOW" ? 0 : item.currentInventory,
            }
          : item
      )
    );
  };

  const handleCreateInvoice = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onSave(selectedItems);
    setSelectedItems([]);
  };

  return (
    <>
      <div className="mt-4">
        <table className="table table-xs w-[900px]">
          <thead>
            <tr>
              <th className="w-[10%]">Unit</th>
              <th className="w-[45%]">Item</th>
              <th align="right" className="w-[10%]">
                Price
              </th>
              <th className="w-[5%]" align="center">
                QTY
              </th>
              <th className="w-[10%]" align="right">
                Total
              </th>
              <th className="w-[5%]">To Follow</th>
              <th className="w-[5%]">Partial</th>
              <th className="w-[5%]" align="center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((item: ItemFormEntry, index: number) => (
              <tr key={index}>
                <td>{item.unit}</td>
                <td>{item.itemDescription}</td>
                <td align="right">{formatCurrency(item.price)}</td>
                <td align="center">{item.quantity}</td>
                <td align="right">
                  {formatCurrency(item.price * item.quantity)}
                </td>
                <td>
                  {item.supplied !== "ALL" && (
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input
                          name="fullfilled"
                          value={"TO_FOLLOW"}
                          type="radio"
                          className="radio radio-sm"
                          checked={item.supplied === "TO_FOLLOW"}
                          onChange={(e) =>
                            handleNotEnoughStock(
                              e.target.value as "PARTIAL" | "TO_FOLLOW",
                              index
                            )
                          }
                        />
                      </label>
                    </div>
                  )}
                </td>
                <td>
                  {item.supplied !== "ALL" && (
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input
                          name="fullfilled"
                          type="radio"
                          value={"PARTIAL"}
                          className="radio radio-sm"
                          checked={item.supplied === "PARTIAL"}
                          onChange={(e) =>
                            handleNotEnoughStock(
                              e.target.value as "PARTIAL" | "TO_FOLLOW",
                              index
                            )
                          }
                        />
                      </label>
                    </div>
                  )}
                </td>
                <td>
                  <MdDelete
                    className="cursor-pointer text-red-800"
                    onClick={(e) => handleRemoveItem(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedItems.length === 0 && (
        <div className="flex justify-center w-[900px] mt-2">
          - - - No Invoice Items - - -
        </div>
      )}
      <div>
        <form
          className="mt-8 border-t-[1px] border-t-gray-800 flex gap-x-2 w-[900px]"
          onSubmit={handleAddItem}
        >
          <div className="w-[20%]">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Brand</span>
              </div>
              <select
                className="select select-bordered select-sm w-full"
                onChange={handleSelectBrand}
                disabled={brandsLoading || itemsLoading}
                value={selectedBrand}
              >
                <option value="0">ALL</option>
                {brands?.data.map((brand: any) => (
                  <option value={brand.id} key={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="w-[48%]">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Item</span>
              </div>
              <select
                className="select select-bordered select-sm w-full"
                onChange={handleSelectedItem}
                defaultValue={0}
              >
                <option value="0" disabled></option>
                {items?.data
                  .filter((item: any) => {
                    if (
                      selectedItems.some(
                        (formItem: ItemFormEntry) =>
                          item["id"] === formItem.itemId
                      )
                    ) {
                      return false;
                    }
                    if (selectedBrand === 0) return true;
                    if (selectedBrand === item.brandId) return true;
                    return false;
                  })
                  .map((item: any) => (
                    <option
                      value={item.id}
                      key={item.id}
                      disabled={item.inventoryCount === 0}
                    >
                      {`${item.desc1} ${item.desc2} ${item.desc3}`}{" "}
                      {item.inventoryCount > 0 ? (
                        <>
                          &nbsp;&nbsp;|&nbsp;&nbsp;
                          {`${item.inventoryCount} ${
                            item.inventoryCount > 1
                              ? item.unit.plural.toLowerCase()
                              : item.unit.name.toLowerCase()
                          }`}
                        </>
                      ) : (
                        <>&nbsp;&nbsp;|&nbsp;&nbsp;no stock</>
                      )}
                    </option>
                  ))}
              </select>
            </label>
          </div>
          <div className="w-[7%]">
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Quantity:</span>
              </div>
              <input
                className="input input-bordered input-sm w-full"
                type="text"
                {...register("quantity", { required: true })}
              />
            </label>
          </div>
          <div className="w-[20%]">
            <label className="form-control w-full ">
              <div className="label mb-[-4px]">
                <span className="label-text">Price Group:</span>
                <span>
                  <span className="text-xs italic">spl prc?</span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-xs ml-1"
                    checked={isSpecialPrice}
                    onChange={(e) => setIsSpecialPrice(e.target.checked)}
                  />
                </span>
              </div>
              {!isSpecialPrice ? (
                <select
                  className="select select-bordered select-sm w-full"
                  defaultValue={0}
                  {...register("price", { required: true })}
                >
                  <option value={0}></option>
                  {selectedItem?.store && prefix === "INT" && (
                    <option value={selectedItem?.store}>
                      INT - {selectedItem?.store}
                    </option>
                  )}
                  {selectedItem?.cal1 && prefix === "CAL" && (
                    <option value={selectedItem?.cal1}>
                      CAL1 - {selectedItem?.cal1}
                    </option>
                  )}
                  {selectedItem?.cal2 && prefix === "CAL" && (
                    <option value={selectedItem?.cal2}>
                      CAL2 - {selectedItem?.cal2}
                    </option>
                  )}
                  {selectedItem?.cal3 && prefix === "CAL" && (
                    <option value={selectedItem?.cal3}>
                      CAL3 - {selectedItem?.cal3}
                    </option>
                  )}
                  {selectedItem?.ws1 && prefix === "W" && (
                    <option value={selectedItem?.ws1}>
                      W1 - {selectedItem?.ws1}
                    </option>
                  )}
                  {selectedItem?.ws2 && prefix === "W" && (
                    <option value={selectedItem?.ws2}>
                      W2 - {selectedItem?.ws2}
                    </option>
                  )}
                  {selectedItem?.ws3 && prefix === "W" && (
                    <option value={selectedItem?.ws3}>
                      W3 - {selectedItem?.ws3}
                    </option>
                  )}
                </select>
              ) : (
                <input
                  type="text"
                  className="input input-bordered input-sm w-full text-right"
                  {...register("price", { required: true })}
                />
              )}
            </label>
          </div>
          <div className="w-[10%] flex justify-end">
            <button
              type="submit"
              className="btn h-[2rem] min-h-[2rem] w-full mt-9 text-xs"
            >
              Add Item
            </button>
          </div>
        </form>
        <div className="mt-2">
          <button
            className="btn bg-slate-800 text-white btn-sm"
            onClick={handleCreateInvoice}
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
    </>
  );
};

export default CustomerItemTable;
