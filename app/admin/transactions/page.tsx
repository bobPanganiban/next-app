"use client";
import Spinner from "@/app/components/Spinner";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const TransactionsPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/transactions/supplier");
  }, [router]);

  return <Spinner />;
};

export default TransactionsPage;
