"use client";
import Link from "next/link";
import React, { ReactNode } from "react";
import {
  FaFileInvoice,
  FaFileInvoiceDollar,
  FaReceipt,
  FaTruck,
  FaUsers,
  FaWarehouse,
} from "react-icons/fa";
import { GiCarWheel } from "react-icons/gi";
import { MdBrandingWatermark, MdDashboard, MdInventory } from "react-icons/md";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { GrTransaction } from "react-icons/gr";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const currentPath = usePathname();
  const sidenav = [
    {
      label: "Transactions",
      href: "/admin/transactions",
      logo: <GrTransaction />,
    },
    {
      label: "Invoices",
      href: "/admin/invoices",
      logo: <FaFileInvoice />,
    },
    { label: "Suppliers", href: "/admin/suppliers", logo: <FaTruck /> },
    { label: "Customers", href: "/admin/customers", logo: <FaUsers /> },
    {
      label: "Check Vouchers",
      href: "/admin/check-vouchers",
      logo: <FaFileInvoiceDollar />,
    },
    {
      label: "Counter Receipts",
      href: "/admin/counter-receipts",
      logo: <FaReceipt />,
    },
    { label: "Inventory", href: "/admin/inventory", logo: <MdInventory /> },
    { label: "Products", href: "/admin/products", logo: <GiCarWheel /> },
    { label: "Warehouses", href: "/admin/warehouses", logo: <FaWarehouse /> },
    { label: "Brands", href: "/admin/brands", logo: <MdBrandingWatermark /> },
  ];

  return (
    <div className="flex fixed h-screen w-screen">
      <aside className="bg-slate-50 shadow-md w-[20%] max-w-[200px]">
        <ul className="flex flex-col pt-5">
          {sidenav.map((link: any, index: number) => (
            <li
              key={index}
              className={classnames({
                "text-white bg-slate-700 hover:bg-slate-800":
                  currentPath.indexOf(link.href) !== -1,
                "hover:bg-slate-100": currentPath.indexOf(link.href) < 0,
                "pb-2 mb-2 border-b border-b-gray-200":
                  link.label === "Customers" ||
                  link.label === "Counter Receipts",
              })}
            >
              <Link
                href={link.href}
                className={`flex items-center gap-2 cursor-pointer py-2 px-5`}
              >
                {link.logo}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="p-5 flex-1 overflow-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
