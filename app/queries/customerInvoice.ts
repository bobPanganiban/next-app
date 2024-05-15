export const customerInvoiceQuery = (ciid: string) => {
  return {
    where: {
      id: parseInt(ciid),
    },
    include: {
      customer: {
        include: { term: true },
      },
      CustmerTransactions: {
        include: {
          item: {
            include: {
              brand: true,
              supplier: true,
              unit: true,
            },
          },
        },
      },
    },
  };
};
