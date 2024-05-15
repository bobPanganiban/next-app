import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  let invoices;

  if (type === "supplier") {
    invoices = await prisma.supplierInvoices.findMany();
  } else {
    invoices = await prisma.customerInvoices.findMany();
  }

  return NextResponse.json(invoices);
}
