import { describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import "@testing-library/react";
import AddToCartButton from "../_components/AddToCartButton";

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
    <AddToCartButton item={item} timeslots={timeslots} />
  );

  //Tests
  it("Correct render for item.pricingType = rental", () => {
    const rentalDiv = screen.getByTestId("rental");
    expect(rentalDiv).toBeTruthy();
  });

  it("Amount of cartItem rendered correctly", () => {
    const cartItemAmountParagraph = screen.getByTestId("cartItemAmount");
    expect(cartItemAmountParagraph).toHaveTextContent("2");
  });

  it("Correct button shown when real amount more than zero", () => {
    const buttonElement = screen.getByTestId("realAmountNotZero");
    expect(buttonElement).toBeTruthy();
  });
});
