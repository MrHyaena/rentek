import { dayTag } from "../../UtilityFunctions/_functions/dayTagFunction";

//Getting price data
export function priceData(
  numberOfDays: any,
  additions: any[],
  cart: any,
  saleIndex: number
) {
  const tag = dayTag(numberOfDays);

  let rentalPrice: number = 0;

  let wholeDeposit: number = 0;

  let wholeProductPrice: number = 0;

  additions.map((item: any) => {
    wholeProductPrice = wholeProductPrice + item.item.basePrice * item.count;
  });

  cart.map((item: any) => {
    rentalPrice = rentalPrice + item.item.basePrice * numberOfDays * item.count;

    wholeDeposit = wholeDeposit + item.item.deposit * item.count;
  });
  const wholePrice: number = rentalPrice + wholeProductPrice;

  const rentalPriceAfterSale: number = rentalPrice * saleIndex;
  const wholePriceAfterSale: number = rentalPriceAfterSale + wholeProductPrice;
  const payNowPrice: number = wholePriceAfterSale * 0.1;
  const sale: number = Math.trunc(100 - saleIndex * 100);

  return {
    tag,
    rentalPrice,
    wholeDeposit,
    wholeProductPrice,
    wholePrice,
    rentalPriceAfterSale,
    wholePriceAfterSale,
    payNowPrice,
    sale,
  };
}
