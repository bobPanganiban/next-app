"use client";
import React, { ChangeEvent } from "react";
import { useRouter } from "next/navigation";

interface Props {
  suppliers: Supplier[];
}

export interface Supplier {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const FormHeader = ({ suppliers }: Props) => {
  const router = useRouter();

  const handlerSupplierSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    router.push(`/admin/transactions/supplier?s=${event.target.value}`);
    router.refresh();
  };

  return (
    <div className="flex">
      <select
        onChange={(event) => handlerSupplierSelect(event)}
        className="select select-bordered select-sm w-full max-w-xs"
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
