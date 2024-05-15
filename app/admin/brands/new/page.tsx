"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { brandSchema } from "@/app/validationSchema";
import { z } from "zod";
import Spinner from "@/app/components/Spinner";

type BrandsForm = z.infer<typeof brandSchema>;

const NewBrandPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BrandsForm>({
    resolver: zodResolver(brandSchema),
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/brands", data);
      router.push("/admin/brands");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      console.log("error", error);
    }
  });

  return (
    <>
      <h1>Add Brand</h1>
      <form className="flex-row max-w-[400px] gap-1 mt-4" onSubmit={onSubmit}>
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
        <div className="mt-8">
          <button
            className="btn bg-slate-800 text-white btn-sm"
            type="submit"
            disabled={isSubmitting}
          >
            Create
            {isSubmitting && <Spinner />}
          </button>
        </div>
      </form>
    </>
  );
};

export default NewBrandPage;
