const useCurrency = () => {
  const formatCurrency = (
    amount: number,
    locale: string = "en-US",
    currency: string = "PHP"
  ) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  return formatCurrency;
};

export { useCurrency };
