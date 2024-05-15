"use client";
import { Supplier, Terms } from "@/app/entities/entities";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

interface Props {
  supplier: any;
  terms: Terms[];
}

const SupplierHeader = ({ supplier, terms }: Props) => {
  const router = useRouter();
  const [supplierDetail, setSupplierDetail] = useState<Supplier>(supplier);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSave = () => {
    axios
      .put("/api/suppliers", supplierDetail)
      .then((res) => {
        router.push(
          `/admin/suppliers/${
            supplierDetail.id
          }?saved=${new Date().getMilliseconds()}`
        );
        router.refresh();
        setIsEditing(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {!isEditing ? (
        <div className="border mb-4 shadow-md p-4">
          <p className="font-semibold text-gray-800 text-2xl flex justify-between">
            {supplier?.name}
            <FaPencilAlt
              className="cursor-pointer text-sm text-gray-800"
              onClick={(e) => setIsEditing(true)}
            />
          </p>
          <p className="font-light text-gray-500">{supplier?.address}&nbsp;</p>
          <div>
            {supplier?.Terms?.days}{" "}
            {supplier?.Terms?.days === "CASH" ? "" : "days"}
          </div>
        </div>
      ) : (
        <div className="flex-row border mb-4 shadow-md p-4">
          <div className="flex mb-2 justify-between">
            <input
              placeholder="name..."
              className="input input-bordered input-sm w-[70%]"
              type="text"
              value={supplierDetail?.name}
              onChange={(e) =>
                setSupplierDetail((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <select
              name=""
              id=""
              value={supplierDetail.termId}
              onChange={(e) =>
                setSupplierDetail((prev) => ({
                  ...prev,
                  termId: parseInt(e.target.value),
                }))
              }
              className="select select-sm select-bordered w-[29%]"
            >
              {terms.map((term) => (
                <option value={term.id} key={term.id}>
                  {term.days} {term.id === 1 ? "" : "days"}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between">
            <input
              placeholder="address..."
              className="input input-bordered input-sm w-[70%] mb-2"
              type="text"
              value={supplierDetail.address}
              onChange={(e) =>
                setSupplierDetail((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
            />
            <div className="w-[29%] flex justify-between">
              <button
                className="btn btn-sm w-[48%] text-white bg-slate-800"
                onClick={(e) => handleSave()}
              >
                SAVE
              </button>
              <button
                className="btn btn-sm w-[48%]"
                onClick={(e) => setIsEditing(false)}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierHeader;
