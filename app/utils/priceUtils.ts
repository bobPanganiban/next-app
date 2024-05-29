export const handlePrice = (
  storePrice: number = 0,
  discounts: { d1: number; d2: number; d3: number; d4: number; d5: number }
) => {
  let price = discounts.d1 != 0 ? storePrice / discounts.d1 : storePrice;
  price = discounts.d2 != 0 ? price / discounts.d2 : price;
  price = discounts.d3 != 0 ? price / discounts.d3 : price;
  price = discounts.d4 != 0 ? price / discounts.d4 : price;
  price = discounts.d5 != 0 ? price / discounts.d5 : price;

  return price;
};
