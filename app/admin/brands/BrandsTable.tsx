import TableActions from "@/app/components/TableActions";
import { Brand } from "@/app/entities/entities";
import React from "react";

interface Props {
  brands: Brand[];
}

const BrandsTable = ({ brands }: Props) => {
  return (
    <div>
      <table className="table table-xs w-[900px]">
        <thead>
          <tr>
            <td className="w-[5%]">ID</td>
            <td className="w-[80%]">Name</td>
            <td className="w-[15%]">Actions</td>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand: Brand) => (
            <tr key={brand.id}>
              <td>{brand.id}</td>
              <td>{brand.name}</td>
              <td>
                <TableActions
                  edit={`/admin/brands/${brand.id}`}
                  targetId={brand.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BrandsTable;
