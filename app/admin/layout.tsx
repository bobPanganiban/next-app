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
import { usePathname, useRouter } from "next/navigation";
import classnames from "classnames";
import { GrTransaction } from "react-icons/gr";
import { useSession } from "next-auth/react";
import { useUserProfile } from "../hooks/useUserProfile";
import Auth from "./auth";

interface SideNave {
  label: string;
  href: string;
  logo: React.JSX.Element;
  role: string[];
}

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { status, data: session } = useSession();

  const user = useUserProfile(session?.user?.email || "");

  const currentPath = usePathname();
  const sidenav = [
    {
      label: "Transactions",
      href: "/admin/transactions",
      logo: <GrTransaction />,
      role: ["admin", "sec", "sec2"],
    },
    {
      label: "Invoices",
      href: "/admin/invoices",
      logo: <FaFileInvoice />,
      role: ["admin", "sec", "sec2"],
    },
    {
      label: "Suppliers",
      href: "/admin/suppliers",
      logo: <FaTruck />,
      role: ["admin"],
    },
    {
      label: "Customers",
      href: "/admin/customers",
      logo: <FaUsers />,
      role: ["admin"],
    },
    {
      label: "Check Vouchers",
      href: "/admin/check-vouchers",
      logo: <FaFileInvoiceDollar />,
      role: ["admin", "sec"],
    },
    {
      label: "Counter Receipts",
      href: "/admin/counter-receipts",
      logo: <FaReceipt />,
      role: ["admin", "sec"],
    },
    {
      label: "Inventory",
      href: "/admin/inventory",
      logo: <MdInventory />,
      role: ["admin", "sec"],
    },
    {
      label: "Products",
      href: "/admin/products",
      logo: <GiCarWheel />,
      role: ["admin"],
    },
    {
      label: "Warehouses",
      href: "/admin/warehouses",
      logo: <FaWarehouse />,
      role: ["admin"],
    },
    {
      label: "Brands",
      href: "/admin/brands",
      logo: <MdBrandingWatermark />,
      role: ["admin"],
    },
  ];

  return (
    <div className="flex">
      <aside
        className="bg-slate-50 shadow-md h-full w-[20%] max-w-[200px] print:hidden"
        hidden={!user?.data?.data.role}
      >
        <ul className="flex flex-col pt-5">
          {sidenav.map((link: SideNave, index: number) => (
            <li
              key={index}
              className={classnames({
                "text-white bg-slate-700 hover:bg-slate-800":
                  currentPath.indexOf(link.href) !== -1,
                "hover:bg-slate-100": currentPath.indexOf(link.href) < 0,
                "pb-2 mb-2 border-b border-b-gray-200":
                  link.label === "Counter Receipts",
                "pt-2 mt-2 border-t border-t-gray-200":
                  link.label === "Check Vouchers",
                hidden: !link.role.includes(user?.data?.data.role),
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
      <Auth role={user.data?.data.role}>
        <main className="p-5 flex-1">{children}</main>
      </Auth>
    </div>
  );
};

export default AdminLayout;
