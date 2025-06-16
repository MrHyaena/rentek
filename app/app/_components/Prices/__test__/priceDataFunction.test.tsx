import { describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import "@testing-library/react";
import { CartContext } from "@/app/_context/CartContext";
import { DaterangeContext } from "@/app/_context/DaterangeContext";
import { priceData } from "../_functions/priceDataFunction.tsx";

describe("AddToCartButton", () => {
  //Mock data
  const saleIndex = 0.9;
  const numberOfDays = 1;
  const cart: any = [
    {
      item: {
        deposit: 100,
        basePrice: 100,
        name: "itemName",
        documentId: "4f48ew45fre9w",
        coverImage: {
          formats: {
            thumbnail: {
              url: "/imageUrl",
            },
          },
        },
      },
      count: 3,
    },
  ];
  const newAdditions = [
    {
      item: {
        basePrice: 100,
        name: "itemName",
        documentId: "4f48ew45fre9w",
        coverImage: {
          formats: {
            thumbnail: {
              url: "/imageUrl",
            },
          },
        },
      },
      count: 3,
    },
  ];

  const {
    rentalPrice,
    wholeDeposit,
    wholeProductPrice,
    wholePrice,
    rentalPriceAfterSale,
    wholePriceAfterSale,
    payNowPrice,
    sale,
    tag,
  } = priceData(numberOfDays, newAdditions, cart, saleIndex);

  //Tests
  it("Correct day tag, already tested separately", () => {
    expect(tag).toBe("den");
  });

  it("Correct rental price", () => {
    expect(rentalPrice).toBe(300);
  });

  it("Correct deposit for whole order", () => {
    expect(wholeDeposit).toBe(300);
  });

  it("Correct product for whole products/onetime items", () => {
    expect(wholeProductPrice).toBe(300);
  });

  it("Sum of rental price and product price", () => {
    expect(wholePrice).toBe(600);
  });

  it("Rental price after sale", () => {
    expect(rentalPriceAfterSale).toBe(270);
  });

  it("Sum of rental price and product price after sale", () => {
    expect(wholePriceAfterSale).toBe(570);
  });

  it("Price for reservation/payNowPrice", () => {
    expect(payNowPrice).toBe(57);
  });

  it("Sale percentage number", () => {
    expect(sale).toBe(10);
  });
});
