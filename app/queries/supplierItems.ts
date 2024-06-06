import { Supplier } from "../entities/entities";

export const supplierItemsQuery = (s: string, suppliers: Supplier[]) => {
  return {
    where: {
      supplierId: s ? parseInt(s) : suppliers[1].id || 2,
    },
    select: {
      id: true,
      desc1: true,
      desc2: true,
      desc3: true,
      brand: {
        select: {
          name: true,
          id: true,
        },
      },
      store: true,
    },
  };
};

export const bodegaItemQuery = () => {
  return {
    select: {
      id: true,
      desc1: true,
      desc2: true,
      desc3: true,
      brand: {
        select: {
          name: true,
          id: true,
        },
      },
      store: true,
    },
  };
};
