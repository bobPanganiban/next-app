export interface Item {
  id: number;
  desc1: string;
  desc2: string;
  desc3: string;
  discount1: number;
  discount2: number;
  discount3: number;
  discount4: number;
  discount5: number;
  store?: number;
  cal1?: number;
  cal2?: number;
  cal3?: number;
  ws1?: number;
  ws2?: number;
  ws3?: number;
  inventoryCount: number;
  supplier: {
    name: string;
  };
  brand: {
    id: number;
    name: string;
  };
  unit: {
    name: string;
  };
}

export interface Terms {
  id: number;
  days: string;
}

// Supplier Invoice
export interface Supplier {
  id: number;
  name: string;
  address: string;
  termId: number;
  createdAt?: Date;
  updatedAt?: Date;
  Terms?: Terms;
}

export interface SupplierInvoice {
  id: number;
  supplierId: number;
  invoiceNumber: string;
  invoiceDate: Date;
  isfulfilled: boolean;
  totalAmount: number;
  dateCreated: Date;
  dateUpdated: Date;
  checkVouchersId: number | null | undefined;
  supplier?: Supplier;
}

// Customer Invoice
export interface Customer {
  id: number;
  name: string;
  address: string;
  termId: number;
  term?: Terms;
}

export interface CustomerInvoice {
  id: number;
  customerId: number;
  invoiceNumber: string;
  invoiceDate: Date;
  isfulfilled: boolean;
  isCompleted: boolean;
  totalAmount: number;
  dateCreated: Date;
  dateUpdated: Date;
  counterReceiptsId: number | null;
  customer?: Customer;
}

// Item Details
export interface ItemDetails {
  supplier: String;
  brand: String;
  unit: String;
  description: Description;
  srpAndDiscount: Srp;
  customerPrice: CustomerPrice;
  supplierId?: number;
  brandId?: number;
  unitId?: number;
  quantity?: number;
}

interface Srp {
  unitPrice: String;
  discount1?: String;
  discount2?: String;
  discount3?: String;
  discount4?: String;
  discount5?: String;
}

interface CustomerPrice {
  ib: String;
  c1?: String;
  c2?: String;
  c3?: String;
  w1?: String;
  w2?: String;
  w3?: String;
}

interface Description {
  desc1: string;
  desc2: string;
  desc3: string;
}

// Brand
export interface Brand {
  name: string;
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Counter Receipt
export interface CounterReceipt {
  id: number;
  totalAmount: number;
  dueDate: Date;
  dateCreated: Date;
  customerId: number | null | undefined;
  CustomerInvoices: CustomerInvoice[];
  Customers?: Customer;
}

// Check Vocher
export interface CheckVoucher {
  id: number;
  discount: number;
  totalAmount: number;
  dueDate: Date;
  bank: string;
  supplierId?: number;
  Supplier?: Supplier;
  dateCreated: Date;
  checkNumber?: string;
  SupplierInvoices?: SupplierInvoice[];
}

export interface ItemInventory {
  id: number;
  desc1: string;
  desc2: string;
  desc3: string;
  brand: Brand;
  brandId: number;
  supplierId: number;
  inventories: {
    warehouseId: number;
    count: number;
    price: number;
  }[];
}

export interface Inventories {
  id: number;
  itemId: number;
  warehouseId: number;
  count: number;
  price: number;
  item: {
    id: number;
    desc1: string;
    desc2: string;
    desc3: string;
    brand: {
      id: number;
      name: string;
    };
    supplier: {
      id: number;
      name: string;
    };
  };
  transfer?: number;
}

// Warhouse transaction
export interface Invoices {
  id: number;
  isFullfilled: boolean;
  targetWarehouseId: number;
  warehouseId: number;
  dateCreated: Date;
  WarehouseTransactions: WarehouseTransactions[];
}

interface WarehouseTransactions {
  count: number;
  id: number;
  inventoryId: number;
  invoiceId: number;
  Inventory: Inventory;
}

interface Inventory {
  count: number;
  id: number;
  itemId: number;
  price: number;
  item: {
    desc1: string;
    desc2: string;
    desc3: string;
    brand: {
      name: string;
    };
  };
}

export interface Brand {
  id: number;
  name: string;
}
