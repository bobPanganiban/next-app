"use client";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useUploadedItems } from "@/app/hooks/useItems";
import { forEach, random } from "lodash";
import { Brand, ItemDetails, Supplier } from "@/app/entities/entities";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCurrency } from "@/app/hooks/useCurrency";
import Spinner from "@/app/components/Spinner";

interface Props {
  suppliers: Supplier[];
  brands: Brand[];
}

const ItemsTable = ({ suppliers, brands }: Props) => {
  const router = useRouter();
  const [items, setItems] = useState<ItemDetails[]>([]);
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [newBrands, setNewBrands] = useState<string[]>([]);
  const [newSuppliers, setNewSuppliers] = useState<string[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  const [processed, setProcessed] = useState<number>(0);
  const formatCurrency = useCurrency();

  // You might want to call the hook here if it's used to transform the entire dataset after it's been set

  const processedItems = useUploadedItems(items);

  useEffect(() => {
    const uniqBrands = Array.from(
      new Set(processedItems.map((item) => item.brand))
    );
    const uniqSuppliers = Array.from(
      new Set(processedItems.map((item) => item.supplier))
    );

    const existingBrands = new Set(brands.map((brand) => brand.name));
    const existingSuppliers = new Set(
      suppliers.map((supplier) => supplier.name)
    );

    const newBrands = uniqBrands.filter(
      (brand) => !existingBrands.has(brand as string)
    );
    const newSuppliers = uniqSuppliers.filter(
      (supplier) => !existingSuppliers.has(supplier as string)
    );

    setNewBrands(newBrands as string[]);
    setNewSuppliers(newSuppliers as string[]);
  }, [items]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryString = e.target!.result;
      if (typeof binaryString === "string") {
        const workbook = XLSX.read(binaryString, { type: "binary" });
        const newItems: any = [];

        forEach(workbook.SheetNames, (sheet) => {
          const worksheet = workbook.Sheets[sheet];
          const data = XLSX.utils.sheet_to_json(worksheet);
          newItems.push(...data);
        });

        setItems(newItems); // Sets all sheet data at once after processing all sheets
      }
    };

    reader.readAsBinaryString(file);
  };

  const batchProcess = (array: any[], batchSize: number, endpoint: string) => {
    let index = 0;
    setProcessed(0);
    function nextBatch(): Promise<any> {
      if (index < array.length) {
        const batch = array.slice(index, index + batchSize);
        index += batchSize;
        return Promise.all(
          batch.map((item) =>
            axios.post(`/api/items/upload/${endpoint}`, { item })
          )
        ).then((res) => {
          setProcessed((prev) => prev + 1);
          return nextBatch();
        });
      } else {
        return Promise.resolve();
      }
    }

    return nextBatch();
  };

  const handleUpload = () => {
    // upload new brands
    setUploading(true);
    axios
      .post("/api/items/upload/brands", { newBrands }) // UPLOADS NEW BRANDS IF ANY
      .then((res) => {
        console.log("brands", res);
        return axios.post("/api/items/upload/suppliers", { newSuppliers }); // UPLOADS NEW SUPPLIERS IF ANY
      })
      .then((res) => {
        console.log("suppliers", res);
        return batchProcess(processedItems, 1, "items");
      })
      .then((resArray) => {
        console.log("items uploaded", resArray);
        setUploading(false);
        router.push(`/admin/products?newItem=${processed}`);
        router.refresh();
      })
      .catch((err) => {
        console.error(err);
        setUploading(false);
      });
  };

  const handleInitInventory = () => {
    setUploading(true);
    batchProcess(processedItems, 1, "inventory")
      .then((res) => {
        console.log(res);
      })
      .finally(() => {
        setUploading(false);
      });
  };

  return (
    <>
      <div className="flex gap-x-4">
        <input type="file" onChange={handleFileUpload} accept=".xlsx,.xls" />
        {/* Optionally display processed items */}
        {`Total: ${processedItems.length}`}
        {processedItems.length > 0 && (
          <button
            className="btn btn-sm"
            onClick={(e) => handleUpload()}
            disabled={uploading}
          >
            {uploading ? (
              <span>
                <Spinner />
                &nbsp;Uploading
              </span>
            ) : (
              "Upload"
            )}
          </button>
        )}
        <button
          className="btn btn-error btn-sm text-white"
          onClick={() => handleInitInventory()}
        >
          INIT INVENTORY
        </button>
        <div className="flex-row">
          <div className="p-0 m-0">
            <progress
              className="progress progress-success w-56 pt-0 mt-0"
              value={processed}
              max={processedItems.length}
            ></progress>
            &nbsp;{" "}
            <span className="text-xs italic">
              {processed}/{processedItems.length}
            </span>
          </div>
        </div>
      </div>
      <table className="table table-xs mt-8 w-[900px]">
        <thead>
          <tr>
            <th className="w-[30%]">Supplier</th>
            <th className="w-[40%]">Description</th>
            <th align="right" className="w-[15%]">
              Unit Price
            </th>
            <th align="right" className="w-[15%]">
              Store Price
            </th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {processedItems
            .filter(
              (item: ItemDetails, index: number) =>
                index >= page * itemsPerPage - itemsPerPage &&
                index < itemsPerPage * page
            )
            .map((item: ItemDetails, index: number) => (
              <tr key={index}>
                <td>{item.supplier}</td>
                <td>
                  {item.description.desc1} {item.description.desc2}{" "}
                  {item.description.desc3}
                </td>
                <td align="right">
                  {formatCurrency(
                    parseFloat(
                      item.srpAndDiscount.unitPrice
                        .toString()
                        .replaceAll(",", "")
                    )
                  )}
                </td>
                <td align="right">
                  {formatCurrency(
                    parseFloat(
                      item.customerPrice.ib.toString().replaceAll(",", "")
                    )
                  )}
                </td>
                <td align="center">{item.quantity}</td>
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
        <button className="join-item btn btn-xs">
          Page {page} of {Math.ceil(processedItems.length / itemsPerPage)}
        </button>
        <button
          className="join-item btn btn-xs"
          onClick={() => setPage((page) => page + 1)}
          disabled={page === Math.ceil(processedItems.length / itemsPerPage)}
        >
          »
        </button>
      </div>
    </>
  );
};

export default ItemsTable;
