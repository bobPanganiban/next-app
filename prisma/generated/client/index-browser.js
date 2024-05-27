
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  detectRuntime,
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.8.1
 * Query Engine version: 78caf6feeaed953168c64e15a249c3e9a033ebe2
 */
Prisma.prismaVersion = {
  client: "5.8.1",
  engine: "78caf6feeaed953168c64e15a249c3e9a033ebe2"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  throw new Error(`Extensions.getExtensionContext is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.defineExtension = () => {
  throw new Error(`Extensions.defineExtension is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  expires_at: 'expires_at',
  token_type: 'token_type',
  scope: 'scope',
  id_token: 'id_token',
  session_state: 'session_state'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  emailVerified: 'emailVerified',
  hashedPassword: 'hashedPassword',
  image: 'image',
  role: 'role'
};

exports.Prisma.VerificationTokenScalarFieldEnum = {
  identifier: 'identifier',
  token: 'token',
  expires: 'expires'
};

exports.Prisma.ItemsScalarFieldEnum = {
  id: 'id',
  supplierId: 'supplierId',
  brandId: 'brandId',
  unitId: 'unitId',
  desc1: 'desc1',
  desc2: 'desc2',
  desc3: 'desc3',
  discount1: 'discount1',
  discount2: 'discount2',
  discount3: 'discount3',
  discount4: 'discount4',
  store: 'store',
  cal1: 'cal1',
  cal2: 'cal2',
  cal3: 'cal3',
  ws1: 'ws1',
  ws2: 'ws2',
  ws3: 'ws3',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SuppliersScalarFieldEnum = {
  id: 'id',
  name: 'name',
  address: 'address',
  termId: 'termId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BrandsScalarFieldEnum = {
  id: 'id',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WarehousesScalarFieldEnum = {
  id: 'id',
  name: 'name',
  location: 'location',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InventoryScalarFieldEnum = {
  id: 'id',
  warehouseId: 'warehouseId',
  itemId: 'itemId',
  count: 'count',
  price: 'price',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UnitsScalarFieldEnum = {
  id: 'id',
  name: 'name',
  plural: 'plural',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CustomersScalarFieldEnum = {
  id: 'id',
  name: 'name',
  address: 'address',
  termId: 'termId'
};

exports.Prisma.TermsScalarFieldEnum = {
  id: 'id',
  days: 'days'
};

exports.Prisma.SupplierTransactionsScalarFieldEnum = {
  id: 'id',
  invoiceId: 'invoiceId',
  itemId: 'itemId',
  quantity: 'quantity',
  inventoryId: 'inventoryId'
};

exports.Prisma.SupplierInvoicesScalarFieldEnum = {
  id: 'id',
  supplierId: 'supplierId',
  invoiceNumber: 'invoiceNumber',
  invoiceDate: 'invoiceDate',
  isfulfilled: 'isfulfilled',
  totalAmount: 'totalAmount',
  dateCreated: 'dateCreated',
  dateUpdated: 'dateUpdated',
  checkVouchersId: 'checkVouchersId'
};

exports.Prisma.CustomerTransactionsScalarFieldEnum = {
  id: 'id',
  invoiceId: 'invoiceId',
  itemId: 'itemId',
  customerPrice: 'customerPrice',
  storePrice: 'storePrice',
  quantity: 'quantity',
  supplied: 'supplied',
  isDiscounted: 'isDiscounted'
};

exports.Prisma.CustomerInvoicesScalarFieldEnum = {
  id: 'id',
  customerId: 'customerId',
  invoiceNumber: 'invoiceNumber',
  invoiceDate: 'invoiceDate',
  isfulfilled: 'isfulfilled',
  isCompleted: 'isCompleted',
  totalAmount: 'totalAmount',
  dateCreated: 'dateCreated',
  dateUpdated: 'dateUpdated',
  counterReceiptsId: 'counterReceiptsId'
};

exports.Prisma.WarehouseTransactionsScalarFieldEnum = {
  id: 'id',
  inventoryId: 'inventoryId',
  invoiceId: 'invoiceId',
  count: 'count'
};

exports.Prisma.WarehouseInvoicesScalarFieldEnum = {
  id: 'id',
  targetWarehouseId: 'targetWarehouseId',
  warehouseId: 'warehouseId',
  isFullfilled: 'isFullfilled',
  dateCreated: 'dateCreated',
  dateUpdated: 'dateUpdated'
};

exports.Prisma.CounterReceiptsScalarFieldEnum = {
  id: 'id',
  totalAmount: 'totalAmount',
  dueDate: 'dueDate',
  dateCreated: 'dateCreated',
  customerId: 'customerId'
};

exports.Prisma.CheckVouchersScalarFieldEnum = {
  id: 'id',
  discount: 'discount',
  totalAmount: 'totalAmount',
  bank: 'bank',
  checkNumber: 'checkNumber',
  dueDate: 'dueDate',
  dateCreated: 'dateCreated',
  supplierId: 'supplierId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  Account: 'Account',
  Session: 'Session',
  User: 'User',
  VerificationToken: 'VerificationToken',
  Items: 'Items',
  Suppliers: 'Suppliers',
  Brands: 'Brands',
  Warehouses: 'Warehouses',
  Inventory: 'Inventory',
  Units: 'Units',
  Customers: 'Customers',
  Terms: 'Terms',
  SupplierTransactions: 'SupplierTransactions',
  SupplierInvoices: 'SupplierInvoices',
  CustomerTransactions: 'CustomerTransactions',
  CustomerInvoices: 'CustomerInvoices',
  WarehouseTransactions: 'WarehouseTransactions',
  WarehouseInvoices: 'WarehouseInvoices',
  CounterReceipts: 'CounterReceipts',
  CheckVouchers: 'CheckVouchers'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        const runtime = detectRuntime()
        const edgeRuntimeName = {
          'workerd': 'Cloudflare Workers',
          'deno': 'Deno and Deno Deploy',
          'netlify': 'Netlify Edge Functions',
          'edge-light': 'Vercel Edge Functions',
        }[runtime]

        let message = 'PrismaClient is unable to run in '
        if (edgeRuntimeName !== undefined) {
          message += edgeRuntimeName + '. As an alternative, try Accelerate: https://pris.ly/d/accelerate.'
        } else {
          message += 'this browser environment, or has been bundled for the browser (running in `' + runtime + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://github.com/prisma/prisma/issues`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
