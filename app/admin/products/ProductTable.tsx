"use client";
import TableActions from "@/app/components/TableActions";
import { Item } from "@/app/entities/entities";
import React, { useState } from "react";

interface Props {
  items: Item[];
}

const ProductTable = ({ items }: Props) => {
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 10;
  const TotalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <>
      <table className="table table-zebra table-xs">
        <thead>
          <tr>
            <th className="w-[5%]">ID</th>
            <th className="w-[25%]">Supplier</th>
            <th className="w-[15%]">Brand</th>
            <th className="w-[40%]">Description</th>
            <th className="w-[10%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items
            .filter(
              (item: Item, index: number) =>
                index >= page * itemsPerPage - itemsPerPage &&
                index < itemsPerPage * page
            )
            .map((item: any) => (
              <tr key={item.id}>
                <th>{item.id}</th>
                <td>{item.supplier.name}</td>
                <td>{item.brand.name}</td>
                <td>{`${item.desc1}${item.desc2}${item.desc3}`}</td>
                <td>
                  <TableActions
                    edit={`/admin/products/${item.id}`}
                    targetId={item.id}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="join mt-4">
        <button
          className="join-item btn btn-xs"
          disabled={page === 1}
          onClick={() => setPage((page) => page - 1)}
        >
          «
        </button>
        <button className="join-item btn btn-xs">
          Page {page} of {TotalPages}
        </button>
        <button
          className="join-item btn btn-xs"
          onClick={() => setPage((page) => page + 1)}
          disabled={page === TotalPages}
        >
          »
        </button>
      </div>
    </>
  );
};

export default ProductTable;
