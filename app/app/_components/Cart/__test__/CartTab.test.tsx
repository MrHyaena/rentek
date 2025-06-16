import { describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import "@testing-library/react";
import { CartContext } from "@/app/_context/CartContext";
import { DaterangeContext } from "@/app/_context/DaterangeContext";
import { CartTab } from "../_components/CartTab";

describe("CartTab", () => {
  //Mock data
  const dataRealAmountNotZero = {
    timeslots: [
      {
        delivery: new Date(2025, 6, 14, 10),
        pickup: new Date(2025, 6, 15, 10),
        products: [{ item: { documentId: "4f48ew45fre9w" }, count: 3 }],
      },
    ],
    item: { documentId: "4f48ew45fre9w", amount: 5, pricingType: "rental" },
  };

  const cart: any = [{ item: { documentId: "4f48ew45fre9w" }, count: 3 }];
  const product = {
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
  };
  function setCart() {}
  const daterange = {
    startDate: new Date(2025, 6, 14, 10),
    endDate: new Date(2025, 6, 15, 10),
    startIsValid: true,
    endIsValid: true,
  };
  function setDaterange() {}
  const saleIndex = 0.9;
  const numberOfDays = 1;
  function setNumberOfDays() {}

  const { timeslots, item } = dataRealAmountNotZero;
  const { rerender } = render(
    <DaterangeContext.Provider
      value={{
        daterange,
        setDaterange,
        saleIndex,
        numberOfDays,
        setNumberOfDays,
      }}
    >
      <CartContext.Provider value={{ cart, setCart }}>
        <CartTab product={product} timeslots={timeslots} />
      </CartContext.Provider>
    </DaterangeContext.Provider>
  );

  //Tests
  it("Correct name rendered", () => {
    const rentalDiv = screen.getByTestId("productName");
    expect(rentalDiv).toHaveTextContent("itemName");
  });

  it("Correct product count in cart", () => {
    const rentalDiv = screen.getByTestId("productCount");
    expect(rentalDiv).toHaveTextContent("3");
  });

  it("Correct price of whole product group after sale", () => {
    const rentalDiv = screen.getByTestId("groupPriceAfterSale");
    expect(rentalDiv).toHaveTextContent("270");
  });
});
