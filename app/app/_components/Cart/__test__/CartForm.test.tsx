import { describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import "@testing-library/react";
import AddToCartButton from "../_components/AddToCartButton";
import { CartContext } from "@/app/_context/CartContext";
import { DaterangeContext } from "@/app/_context/DaterangeContext";
import { CartTab } from "../_components/CartTab";
import CartForm from "../_components/CartForm";

describe("AddToCartButton", () => {
  //Data for cart context
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
  function setCart() {}

  //Data for daterange context
  let daterange = {
    startDate: new Date(2025, 6, 14, 10),
    endDate: new Date(2025, 6, 15, 10),
    startIsValid: true,
    endIsValid: true,
  };
  function setDaterange() {}
  const saleIndex = 0.9;
  const numberOfDays = 1;
  function setNumberOfDays() {}

  //Mock data
  const dataRealAmountNotZero = {
    timeslots: [
      {
        delivery: new Date(2025, 6, 14, 10),
        pickup: new Date(2025, 6, 15, 10),
        products: [
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
        ],
      },
    ],
    item: {
      pricingType: "rental",
      amount: 5,
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
  };

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
        <CartForm newAdditions={newAdditions} timeslots={timeslots} />
      </CartContext.Provider>
    </DaterangeContext.Provider>
  );

  //Tests

  it("Corrrect day tag for rental products", () => {
    const daytagElement = screen.getByTestId("cartDayTag");
    expect(daytagElement).toHaveTextContent("Celková cena za 1 den (vč. DPH)");
  });

  it("Additions group rendered when atleast one addition product exist", () => {
    const additionsDivElement = screen.getByTestId("additionsDiv");
    expect(additionsDivElement).toBeDefined();
  });

  it("Second part of form rendered when dateranges are both valid", () => {
    const additionsDivElement = screen.getByTestId("cartFormSecondPart");
    expect(additionsDivElement).toBeDefined();
  });

  it("Second part of form rendered when dateranges are both valid", () => {
    const additionsDivElement = screen.getByTestId("daterangeShown");
    expect(additionsDivElement).toHaveTextContent(
      "Od 14.07.2025 10:00 do 15.07.2025 10:00"
    );
  });

  it("Second part of form is not rendered when both dateranges is not valid", () => {
    daterange = {
      startDate: new Date(2025, 6, 14, 10),
      endDate: new Date(2025, 6, 15, 10),
      startIsValid: false,
      endIsValid: false,
    };

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
          <CartForm newAdditions={newAdditions} timeslots={timeslots} />
        </CartContext.Provider>
      </DaterangeContext.Provider>
    );
    const additionsDivElement = screen.queryByTestId("cartFormSecondPart");
    expect(additionsDivElement).toBe(null);
  });
});
