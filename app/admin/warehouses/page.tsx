import React from "react";
import { Table } from "@radix-ui/themes";
import { prisma } from "@/prisma/client";
import CreateNewButton from "@/app/components/CreateNewButton";
import TableActions from "@/app/components/TableActions";

const WarehousesPage = async () => {
  const warehouses = await prisma.warehouses.findMany();
  return (
    <div>
      <CreateNewButton href="/admin/warehouses/new" label="New Warehouse" />
      <table className="table table-xs w-[900px]">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map((warehouse: any) => (
            <tr key={warehouse.id}>
              <td>{warehouse.name}</td>
              <td>{warehouse.location}</td>
              <td>
                <TableActions
                  edit={`/admin/warehouses/${warehouse.id}`}
                  targetId={warehouse.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default WarehousesPage;
