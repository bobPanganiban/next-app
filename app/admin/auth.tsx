"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Auth = ({ children, role }: { children: any; role: string | null }) => {
  const currentPath = usePathname();
  //   const role = localStorage.getItem("role");

  const authorizations = [
    {
      path: "transactions",
      roles: [],
    },
    {
      path: "invoices",
      roles: [],
    },
    {
      path: "suppliers",
      roles: [],
    },
    {
      path: "customers",
      roles: [],
    },
    {
      path: "check-vouchers",
      roles: [],
    },
    {
      path: "counter-receipts",
      roles: [],
    },
    {
      path: "inventory",
      roles: [],
    },
    {
      path: "products",
      roles: [],
    },
    {
      path: "warehouses",
      roles: [],
    },
    {
      path: "brands",
      roles: [],
    },
  ];

  return <>{children}</>;
};

export default Auth;
