import { describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { AvailabilityData } from "../../Availability/_functions/availabilityDataFunction";
import { DaterangeContext } from "@/app/_context/DaterangeContext";
import { CartContext } from "@/app/_context/CartContext";
import Availability from "../_components/Availability";
import "@testing-library/jest-dom/vitest";
import "@testing-library/react";

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

//Data for first render
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

//Data for second render
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

describe("Availability", () => {
  const { item, timeslots } = dataRealAmountNotZero;
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
        <Availability item={item} timeslots={timeslots} />
      </CartContext.Provider>
    </DaterangeContext.Provider>
  );

  it("something", () => {
    const instockElement = screen.getByText("Skladem: 2");
    expect(instockElement).toHaveTextContent("Skladem: 2");
  });

  it("something", () => {
    const { itemTwo, timeslotsTwo } = dataRealAmountZero;

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
          <Availability item={itemTwo} timeslots={timeslotsTwo} />
        </CartContext.Provider>
      </DaterangeContext.Provider>
    );
    const instockElement = screen.getByText("Nedostupné");
    expect(instockElement).toHaveTextContent("Nedostupné");
  });
});
