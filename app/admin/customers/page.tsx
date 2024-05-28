import CreateNewButton from "@/app/components/CreateNewButton";
import React from "react";
import { prisma } from "@/prisma/client";
import TableActions from "@/app/components/TableActions";
import { Customer } from "@/app/entities/entities";
import Link from "next/link";

const CustomerPage = async () => {
  const customers = await prisma.customers.findMany();
  return (
    <div>
      <div>
        <CreateNewButton href="/admin/customers/new" label="New Customer" />
      </div>
      <div>
        <table className="table table-xs w-[900px]">
          <thead>
            <tr>
              <th className="w-[5%]">ID</th>
              <th className="w-[30%]">Name</th>
              <th className="w-[50%]">Address</th>
              <th className="w-[15%]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer: Customer) => (
              <tr key={customer.id} className="hover">
                <td>{customer.id}</td>
                <td>
                  <Link href={`/admin/customers/${customer.id}`}>
                    {customer.name}
                  </Link>
                </td>
                <td>{customer.address}</td>
                <td>
                  <TableActions
                    edit={`/admin/customers/${customer.id}`}
                    targetId={customer.id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default CustomerPage;
