"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

const InvoicesLayout = ({ children }: { children: ReactNode }) => {
  const currentPath = usePathname();
  return (
    <div>
      <div
        role="tablist"
        className="tabs tabs-lifted tabs-lg mb-8 w-[900px] print:hidden"
      >
        <Link
          role="tab"
          className={classNames({
            "tab tab-active font-semibold text-lg":
              currentPath.indexOf("/admin/invoices/supplier") !== -1,
            "tab font-light text-lg":
              currentPath.indexOf("/admin/invoices/supplier") < 0,
          })}
          href={"/admin/invoices/supplier"}
        >
          Supplier
        </Link>
        <Link
          role="tab"
          className={classNames({
            "tab tab-active font-semibold text-lg":
              currentPath.indexOf("/admin/invoices/customer") !== -1,
            "tab font-light text-lg":
              currentPath.indexOf("/admin/invoices/customer") < 0,
          })}
          href={"/admin/invoices/customer"}
        >
          Customer
        </Link>
        <Link
          role="tab"
          className={classNames({
            "tab tab-active font-semibold text-lg":
              currentPath.indexOf("/admin/invoices/warehouse") !== -1,
            "tab font-light text-lg":
              currentPath.indexOf("/admin/invoices/warehouse") < 0,
          })}
          href={"/admin/invoices/warehouse"}
        >
          Warehouse
        </Link>
      </div>
      {children}
    </div>
  );
};

export default InvoicesLayout;
