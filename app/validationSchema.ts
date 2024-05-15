import { z } from "zod";

export const supplierSchema = z.object({
  name: z.string().min(3),
  address: z.string().min(3),
  termId: z.number(),
});

export const warehouseSchema = z.object({
  name: z.string().min(1),
  location: z.string(),
});

export const brandSchema = z.object({
  name: z.string().min(1),
});

export const unitSchema = z.object({
  name: z.string().min(1),
  plural: z.string().min(1),
});

export const itemSchema = z.object({
  supplierId: z.number(),
  brandId: z.number(),
  unitId: z.number(),
  desc1: z.string().min(1),
});

export const invoiceSchema = z.object({
  supplierId: z.number(),
  invoiceNumber: z.string(),
  invoiceDate: z.string(),
});

export const customerSchema = z.object({
  name: z.string().min(3),
  address: z.string().min(3),
  termId: z.number(),
});

export const customerTransactionSchema = z.object({
  itemId: z.number(),
  itemDescription: z.string(),
  unit: z.string(),
  quantity: z.number(),
  currentInventory: z.number(),
  quantitySupplied: z.number(),
  price: z.number(),
  supplied: z.enum(["ALL", "TO_FOLLOW", "PARTIAL"]),
});

export const customerInvoiceSchema = z.object({
  customer: customerSchema,
  invoiceDate: z.string(),
  transactions: z.array(customerTransactionSchema).min(1),
});

export const checkVoucherSchema = z.object({
  supplierId: z.number(),
  totalAmount: z.number(),
});

export const counterReceiptSchema = z.object({
  customerId: z.number(),
  totalAmount: z.number(),
});
