"use client";
import { Button, Heading, Text, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { warehouseSchema } from "@/app/validationSchema";
import { z } from "zod";
import Spinner from "@/app/components/Spinner";
import WarehouseFormFields from "./WarehouseFormFields";

type WarehouseForm = z.infer<typeof warehouseSchema>;

const NewWarehousePage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WarehouseForm>({
    resolver: zodResolver(warehouseSchema),
  });

  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/warehouses", data);
      router.push("/admin/warehouses");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      console.log("error", error);
    }
  });

  return (
    <>
      <h1>New Warehouse</h1>
      <form className="flex-row max-w-[400px] gap-1 mt-4" onSubmit={onSubmit}>
        <WarehouseFormFields register={register} errors={errors} />
        <div className="mt-8">
          <button
            className="btn bg-slate-800 text-white btn-sm"
            type="submit"
            disabled={isSubmitting}
          >
            Create Warehouse
            {isSubmitting && <Spinner />}
          </button>
        </div>
      </form>
    </>
  );
};

export default NewWarehousePage;
