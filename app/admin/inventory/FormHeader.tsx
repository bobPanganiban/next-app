"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Brand } from "@/app/entities/entities";

interface Props {
  brands: Brand[];
}

const FormHeader = ({ brands }: Props) => {
  const router = useRouter();
  const [brandId, setBrandId] = useState<string>();

  const handlerFilterUpdate = () => {
    router.push(`/admin/inventory?b=${brandId}`);
    router.refresh();
  };

  return (
    <div className="flex mb-2 gap-x-7">
      <select
        onChange={(e) => {
          setBrandId(e.target.value);
        }}
        className="select select-bordered select-xs w-full max-w-xs print:hidden"
      >
        <option value={0}>ALL</option>
        {brands.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormHeader;
