import { TextField, Text } from "@radix-ui/themes";
import React from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface Props {
  register: UseFormRegister<{ name: string; location: string }>;
  errors: FieldErrors<FieldValues>;
  data?: { name: string; location: string };
}

const WarehouseFormFields = ({ register, errors, data }: Props) => {
  return (
    <>
      <section>
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Name:</span>
            </div>
            <input
              className="input input-bordered input-sm w-full"
              type="text"
              {...register("name")}
              value={data?.name}
            />
          </label>
        </div>
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Location:</span>
            </div>
            <input
              className="input input-bordered input-sm w-full"
              type="text"
              {...register("location")}
              value={data?.name}
            />
          </label>
        </div>
      </section>
    </>
  );
};

export default WarehouseFormFields;
