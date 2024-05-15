"use client";
import React from "react";
import { Supplier } from "../transactions/supplier/FormHeader";
import { useRouter } from "next/navigation";

interface Props {
  suppliers: Supplier[];
}

const FormHeader = ({ suppliers }: Props) => {
  const router = useRouter();

  const handlerSupplierSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    router.push(`/admin/inventory?s=${event.target.value}`);
    router.refresh();
  };

  return (
    <div className="flex mb-2">
      <select
        onChange={(event) => handlerSupplierSelect(event)}
        className="select select-bordered select-xs w-full max-w-xs"
      >
        {suppliers.map((supplier) => (
          <option key={supplier.id} value={supplier.id}>
            {supplier.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormHeader;
