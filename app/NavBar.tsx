"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <nav className="flex justify-between p-5 w-full bg-slate-200 border-b shadow-md print:hidden">
      <Link href="/">RoadBuster Warehouse</Link>
      <ul className="flex gap-4">
        <li>{session?.user?.name}</li>
        {status === "unauthenticated" && (
          <li>
            <Link href="/api/auth/signin">Login</Link>
          </li>
        )}
        {status === "authenticated" && (
          <li>
            <Link href="/api/auth/signout">Logout</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
