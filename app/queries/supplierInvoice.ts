export const supplierInvoiceQuery = (siid: string) => {
  return {
    where: {
      id: parseInt(siid),
    },
    include: {
      supplier: {
        include: {
          Terms: true,
        },
      },
      Transactions: {
        include: {
          item: {
            select: {
              desc1: true,
              desc2: true,
              desc3: true,
              store: true,
              brand: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  };
};
