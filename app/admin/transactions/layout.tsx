"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

const TransactionsLayout = ({ children }: { children: ReactNode }) => {
  const currentPath = usePathname();
  return (
    <div>
      <div role="tablist" className="tabs tabs-lifted tabs-lg mb-8 w-[900px]">
        <Link
          role="tab"
          className={classNames({
            "tab tab-active font-semibold text-lg":
              currentPath.indexOf("/admin/transactions/supplier") !== -1,
            "tab font-light text-lg":
              currentPath.indexOf("/admin/transactions/supplier") < 0,
          })}
          href={"/admin/transactions/supplier"}
        >
          Supplier
        </Link>
        <Link
          role="tab"
          className={classNames({
            "tab tab-active font-semibold text-lg":
              currentPath.indexOf("/admin/transactions/customer") !== -1,
            "tab font-light text-lg":
              currentPath.indexOf("/admin/transactions/customer") < 0,
          })}
          href={"/admin/transactions/customer"}
        >
          Customer
        </Link>
        <Link
          role="tab"
          className={classNames({
            "tab tab-active font-semibold text-lg":
              currentPath.indexOf("/admin/transactions/warehouse") !== -1,
            "tab font-light text-lg":
              currentPath.indexOf("/admin/transactions/warehouse") < 0,
          })}
          href={"/admin/transactions/warehouse"}
        >
          Warehouse
        </Link>
      </div>
      {children}
    </div>
  );
};

export default TransactionsLayout;
