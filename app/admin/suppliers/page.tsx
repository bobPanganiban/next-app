import React from "react";
import { prisma } from "@/prisma/client";
import CreateNewButton from "@/app/components/CreateNewButton";
import { Supplier } from "@/app/entities/entities";
import ProfileLink from "@/app/components/ProfileLink";

const SuppliersPage = async () => {
  const suppliers = await prisma.suppliers.findMany();
  return (
    <>
      <CreateNewButton href="/admin/suppliers/new" label="New Supplier" />
      <div className="w-[900px]">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier: Supplier, index: number) => (
              <tr key={index} className="hover">
                <td>{supplier.id}</td>
                <td>
                  <ProfileLink
                    href={`/admin/suppliers/${supplier.id}`}
                    value={supplier.name}
                  />
                </td>
                <td>{supplier.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export const dynamic = "force-dynamic";

export default SuppliersPage;
