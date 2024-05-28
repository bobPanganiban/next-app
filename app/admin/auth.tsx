"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Auth = ({ children, role = "" }: { children: any; role: string }) => {
  const currentPath = usePathname();

  const auth: { [key: string]: string[] } = {
    sec: [
      "transactions",
      "invoices",
      "check-vouchers",
      "counter-receipts",
      "inventory",
    ],
    sec2: ["transactions", "invoices"],
    "": [],
  };

  const isAdmin = role === "admin";
  const isAuthorized = auth[role]?.some((path) => currentPath.includes(path));

  if (isAdmin || isAuthorized) {
    return <>{children}</>;
  } else {
    return <div className="p-5">You do not have access to this page.</div>;
  }
};

export default Auth;
