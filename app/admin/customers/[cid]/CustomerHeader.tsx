"use client";
import { Customer } from "@/app/entities/entities";
import { Terms } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

interface Props {
  customer: Customer;
  terms: Terms[];
}

const CustomerHeader = ({ customer, terms }: Props) => {
  const router = useRouter();
  const [customerDetail, setCustomerDetail] = useState<Customer>(customer);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSave = () => {
    axios
      .put("/api/customers", customerDetail)
      .then((res) => {
        router.push(
          `/admin/customers/${
            customerDetail.id
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
    <>
      {!isEditing ? (
        <div className="border mb-4 shadow-md p-4">
          <p className="font-semibold text-gray-800 text-2xl flex justify-between">
            {customer?.name}
            <FaPencilAlt
              className="cursor-pointer text-sm text-gray-800"
              onClick={(e) => setIsEditing(true)}
            />
          </p>
          <p className="font-light text-gray-500">{customer?.address}&nbsp;</p>
          <div>
            {customer?.term?.days}{" "}
            {customer?.term?.days === "CASH" ? "" : "days"}
          </div>
        </div>
      ) : (
        <div className="flex-row border mb-4 shadow-md p-4">
          <div className="flex mb-2 justify-between">
            <input
              placeholder="name..."
              className="input input-bordered input-sm w-[70%]"
              type="text"
              value={customerDetail?.name}
              onChange={(e) =>
                setCustomerDetail((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <select
              name=""
              id=""
              value={customerDetail.termId}
              onChange={(e) =>
                setCustomerDetail((prev) => ({
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
              value={customerDetail.address}
              onChange={(e) =>
                setCustomerDetail((prev) => ({
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
    </>
  );
};

export default CustomerHeader;
