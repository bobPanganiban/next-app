"use client";
import React, { ChangeEvent, useState } from "react";
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
  const [selectedSupplier, setSelectedSupplier] = useState<number>(
    suppliers[1].id
  );

  const handlerSupplierSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSupplier(parseInt(event.target.value));
    router.push(`/admin/transactions/supplier?s=${event.target.value}`);
    router.refresh();
  };

  return (
    <div className="flex">
      <select
        onChange={(event) => handlerSupplierSelect(event)}
        className="select select-bordered select-sm w-full max-w-xs"
        value={selectedSupplier}
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
