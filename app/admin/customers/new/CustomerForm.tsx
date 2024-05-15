"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const CustomerForm = ({ terms }: { terms: { id: number; days: string }[] }) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    try {
      setSubmitting(false);
      await axios.post("/api/customers", data);
      router.push("/admin/customers");
      router.refresh();
    } catch (err) {
      setSubmitting(false);
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex-row">
      <div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            className="input input-bordered input-sm w-full max-w-xs"
            {...register("name", { required: true })}
          />
        </label>
      </div>
      <div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Address</span>
          </div>
          <input
            type="text"
            className="input input-bordered input-sm w-full max-w-xs"
            {...register("address", { required: true })}
          />
        </label>
      </div>
      <div>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Term</span>
          </div>
          <select
            className="select select-bordered select-sm w-full max-w-xs"
            defaultValue={1}
            {...register("termId", { valueAsNumber: true })}
          >
            <option value=""></option>
            {terms?.map((term) => (
              <option key={term.id} value={term.id}>
                {term.days} {term.id !== 1 ? "days" : ""}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex mt-4">
        <button
          type="submit"
          disabled={submitting}
          className="btn bg-slate-800 text-white btn-sm"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
