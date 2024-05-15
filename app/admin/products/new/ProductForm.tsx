"use client";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Supplier {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Brand {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Unit {
  id: number;
  name: string;
  plural: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Props {
  suppliers: Supplier[];
  brands: Brand[];
  units: Unit[];
}

const ProductForm = ({ suppliers, brands, units }: Props) => {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleNaN = (data: number) => {
    return isNaN(data) ? 0 : data;
  };

  const onSubmit = handleSubmit(async (data: FieldValues) => {
    const body = {
      supplierId: parseInt(data.supplierId),
      brandId: parseInt(data.brandId),
      unitId: parseInt(data.unitId),
      desc1: data.desc1,
      desc2: data.desc2,
      desc3: data.desc3,
      discount1: handleNaN(data.discount1),
      discount2: handleNaN(data.discount2),
      discount3: handleNaN(data.discount3),
      discount4: handleNaN(data.discount4),
      store: handleNaN(data.store),
      cal1: handleNaN(data.cal1),
      cal2: handleNaN(data.cal2),
      cal3: handleNaN(data.cal3),
      ws1: handleNaN(data.ws1),
      ws2: handleNaN(data.ws2),
      ws3: handleNaN(data.ws3),
    };

    try {
      setSubmitting(true);
      await axios.post("/api/items", body);
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      console.log("error", error);
    }
  });

  return (
    <form className="flex-row gap-y-8" onSubmit={onSubmit}>
      <div className="flex gap-x-2">
        {/* Suppliers dropdown */}
        <label className="form-control w-[45%]">
          <div className="label">
            <span className="label-text">Supplier</span>
          </div>
          <select
            className="select select-bordered select-sm"
            {...register("supplierId", { valueAsNumber: true })}
            defaultValue={0}
          >
            <option value={0}> </option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </label>
        {/* Brands dropdown */}
        <label className="form-control w-[40%]">
          <div className="label">
            <span className="label-text">Brand</span>
          </div>
          <select
            className="select select-bordered select-sm"
            {...register("brandId", { valueAsNumber: true })}
            defaultValue={0}
          >
            <option value={0}> </option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </label>
        {/* Units dropdown */}
        <label className="form-control w-[15%]">
          <div className="label">
            <span className="label-text">Unit</span>
          </div>
          <select
            className="select select-bordered select-sm"
            {...register("unitId", { valueAsNumber: true })}
            defaultValue={0}
          >
            <option value={0}> </option>
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}/{unit.plural}
              </option>
            ))}
          </select>
        </label>
      </div>
      {/* description */}
      <div className="flex gap-x-2 border-b border-b-gray-300 pb-4">
        <label className="form-control w-[33%] ">
          <div className="label">
            <span className="label-text">Description 1</span>
          </div>
          <input
            type="text"
            className="input input-bordered input-sm w-full"
            {...register("desc1")}
          />
        </label>
        <label className="form-control w-[33%] ">
          <div className="label">
            <span className="label-text">Description 2</span>
          </div>
          <input
            type="text"
            className="input input-bordered input-sm w-full"
            {...register("desc2")}
          />
        </label>
        <label className="form-control w-[33%] ">
          <div className="label">
            <span className="label-text">Description 3</span>
          </div>
          <input
            type="text"
            className="input input-bordered input-sm w-full"
            {...register("desc3")}
          />
        </label>
      </div>
      <div className="flex-row mb-4">
        <h2 className="font-bold text-gray-800">
          Discount and Customer Setting
        </h2>
        <div className="flex gap-x-2">
          <label className="form-control w-[25%] ">
            <div className="label">
              <span className="label-text">Discount 1</span>
            </div>
            <input
              type="text"
              className="input input-bordered input-sm w-full"
              {...register("discount1", { valueAsNumber: true })}
            />
          </label>
          <label className="form-control w-[25%] ">
            <div className="label">
              <span className="label-text">Discount 2</span>
            </div>
            <input
              type="text"
              className="input input-bordered input-sm w-full"
              {...register("discount2", { valueAsNumber: true })}
            />
          </label>
          <label className="form-control w-[25%] ">
            <div className="label">
              <span className="label-text">Discount 3</span>
            </div>
            <input
              type="text"
              className="input input-bordered input-sm w-full"
              {...register("discount3", { valueAsNumber: true })}
            />
          </label>
          <label className="form-control w-[25%] ">
            <div className="label">
              <span className="label-text">Discount 4</span>
            </div>
            <input
              type="text"
              className="input input-bordered input-sm w-full"
              {...register("discount4", { valueAsNumber: true })}
            />
          </label>
        </div>
        <div className="flex gap-x-2">
          <label className="form-control w-[14%] ">
            <div className="label">
              <span className="label-text">Store</span>
            </div>
            <input
              type="text"
              className="input input-bordered input-sm w-full"
              {...register("store", { valueAsNumber: true })}
            />
          </label>
          <label className="form-control w-[14%] ">
            <div className="label">
              <span className="label-text">CAL1</span>
            </div>
            <input
              type="text"
              className="input input-bordered input-sm w-full"
              {...register("cal1", { valueAsNumber: true })}
            />
          </label>
          <label className="form-control w-[14%] ">
            <div className="label">
              <span className="label-text">CAL2</span>
            </div>
            <input
              type="text"
              className="input input-bordered input-sm w-full"
              {...register("cal2", { valueAsNumber: true })}
            />
          </label>
          <label className="form-control w-[14%] ">
            <div className="label">
              <span className="label-text">CAL3</span>
            </div>
            <input
              type="text"
              className="input input-bordered input-sm w-full"
              {...register("cal3", { valueAsNumber: true })}
            />
          </label>
          <label className="form-control w-[14%] ">
            <div className="label">
              <span className="label-text">WS1</span>
            </div>
            <input
              type="text"
              className="input input-bordered input-sm w-full"
              {...register("ws1", { valueAsNumber: true })}
            />
          </label>
          <label className="form-control w-[14%] ">
            <div className="label">
              <span className="label-text">WS2</span>
            </div>
            <input
              type="text"
              className="input input-bordered input-sm w-full"
              {...register("ws2", { valueAsNumber: true })}
            />
          </label>
          <label className="form-control w-[14%] ">
            <div className="label">
              <span className="label-text">WS3</span>
            </div>
            <input
              type="text"
              className="input input-bordered input-sm w-full"
              {...register("ws3", { valueAsNumber: true })}
            />
          </label>
        </div>
      </div>
      <div className="flex">
        <button type="submit" className="btn bg-slate-800 text-white btn-sm">
          Create
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
