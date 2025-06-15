import { describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import "@testing-library/react";
import AddToCartButton from "../_components/AddToCartButton";
import { CartContext } from "@/app/_context/CartContext";
import { DaterangeContext } from "@/app/_context/DaterangeContext";

describe("AddToCartButton", () => {
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

  const dataRealAmountZero = {
    timeslotsTwo: [
      {
        delivery: new Date(2025, 6, 14, 10),
        pickup: new Date(2025, 6, 15, 10),
        products: [{ item: { documentId: "4f48ew45fre9w" }, count: 5 }],
      },
    ],
    itemTwo: { documentId: "4f48ew45fre9w", amount: 5, pricingType: "rental" },
  };

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
        <AddToCartButton item={item} timeslots={timeslots} />
      </CartContext.Provider>
    </DaterangeContext.Provider>
  );

  //Tests
  it("Correct render for item.pricingType = rental", () => {
    const rentalDiv = screen.getByTestId("rental");
    expect(rentalDiv).toBeTruthy();
  });

  it("Amount of cartItem rendered correctly", () => {
    const cartItemAmountParagraph = screen.getByTestId("cartItemAmount");
    expect(cartItemAmountParagraph).toHaveTextContent("3");
  });

  it("Correct button shown when real amount more than zero", () => {
    const buttonElement = screen.getByTestId("realAmountNotZero");
    expect(buttonElement).toBeTruthy();
  });

  it("Correct button shown when real amount more than zero", () => {
    const { timeslotsTwo, itemTwo } = dataRealAmountZero;
    rerender(
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
          <AddToCartButton item={itemTwo} timeslots={timeslotsTwo} />
        </CartContext.Provider>
      </DaterangeContext.Provider>
    );
    const buttonElement = screen.getByTestId("realAmountZero");
    expect(buttonElement).toBeTruthy();
  });
});
