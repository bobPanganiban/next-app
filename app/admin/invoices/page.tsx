"use client";
import Spinner from "@/app/components/Spinner";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const InvoicesPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/invoices/supplier");
  }, [router]);
  return (
    <div>
      <Spinner />
    </div>
  );
};

export default InvoicesPage;
