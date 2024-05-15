"use client";
import Spinner from "@/app/components/Spinner";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const InventoryForm = ({
  item,
  id,
  count = 0,
  wid = 1,
}: {
  item: string;
  id: string;
  count?: number;
  wid: number;
}) => {
  const { handleSubmit, register } = useForm();
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    const body = {
      id: id,
      count: data.count,
    };
    try {
      setUpdating(true);
      await axios.patch("/api/inventory", body);
      router.push(`/admin/inventory?wid=${wid}`);
      router.refresh();
    } catch (e) {
      setUpdating(false);
    }
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{item}</h2>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              {...register("count")}
            />
            <div className="card-actions justify-end">
              <button className="btn btn-primary" disabled={updating}>
                {updating ? "Updating" : "Update"}
                {updating && <Spinner />}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InventoryForm;
