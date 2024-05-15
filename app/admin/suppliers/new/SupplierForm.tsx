"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { supplierSchema } from "@/app/validationSchema";
import { z } from "zod";
import Spinner from "@/app/components/Spinner";

type SupplierForm = z.infer<typeof supplierSchema>;

const SupplierForm = ({ terms }: { terms: { id: number; days: string }[] }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SupplierForm>({
    resolver: zodResolver(supplierSchema),
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/suppliers", data);
      router.push("/admin/suppliers");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      console.log("error", error);
    }
  });
  return (
    <>
      <h1>New Supplier</h1>
      <form className="flex-row max-w-[400px] gap-1 mt-4" onSubmit={onSubmit}>
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Name:</span>
            </div>
            <input
              className="input input-bordered input-sm w-full"
              type="text"
              {...register("name")}
            />
          </label>
          {errors.name && (
            <p className="text-red-900 text-xs flex">This is required</p>
          )}
        </div>
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Address:</span>
            </div>
            <input
              className="input input-bordered input-sm w-full"
              type="text"
              {...register("address")}
            />
          </label>
          {errors.name && (
            <p className="text-red-900 text-xs flex">This is required</p>
          )}
        </div>
        <div>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Term</span>
            </div>
            <select
              className="select select-bordered select-sm w-full"
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
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-sm text-white bg-slate-800 mt-4"
        >
          Create
          {isSubmitting && <Spinner />}
        </button>
      </form>
    </>
  );
};

export default SupplierForm;
