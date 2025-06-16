import { describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import "@testing-library/react";
import ProductTabHorizontal from "../_components/ProductHorizontal";

describe("ProductHorizontal", () => {
  //Context data
  const cart: any = [{ item: { documentId: "4f48ew45fre9w" }, count: 3 }];
  function setCart() {}
  const daterange = {
    startDate: new Date(2025, 6, 14, 10),
    endDate: new Date(2025, 6, 15, 10),
    startIsValid: true,
    endIsValid: true,
  };
  function setDaterange() {}
  const saleIndex = 1;
  const numberOfDays = 1;
  function setNumberOfDays() {}

  const item: any = {
    amount: 5,
    accessories: [],
    excerpt: "Hello",
    deposit: 100,
    basePrice: 100,
    name: "itemName",
    documentId: "4f48ew45fre9w",
    coverImage: {
      formats: {
        small: {
          url: "/imageUrl",
        },
        thumbnail: {
          url: "/imageUrl",
        },
      },
    },
  };
  const timeslots: any = [
    {
      delivery: new Date(2025, 6, 14, 10),
      pickup: new Date(2025, 6, 15, 10),
      products: [
        {
          item: {
            accessories: [],
            excerpt: "Hello",
            deposit: 100,
            basePrice: 100,
            name: "itemName",
            documentId: "4f48ew45fre9w",
            coverImage: {
              formats: {
                small: {
                  url: "/imageUrl",
                },
                thumbnail: {
                  url: "/imageUrl",
                },
              },
            },
          },
          count: 3,
        },
      ],
    },
  ];

  render(
    <ProductTabHorizontal
      item={item}
      timeslots={timeslots}
      cart={cart}
      setCart={setCart}
      daterange={daterange}
    />
  );

  it("Renders correct amount of products in cart", () => {
    const buttonElement = screen.getByTestId("buttonRealAmountNotZero");
    expect(buttonElement).toBeDefined();
  });
});
