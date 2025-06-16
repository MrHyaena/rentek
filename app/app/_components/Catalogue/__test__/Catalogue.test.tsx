import { beforeAll, describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import "@testing-library/react";
import Catalogue from "../_components/Catalogue";
import { DaterangeContext } from "@/app/_context/DaterangeContext";
import { CartContext } from "@/app/_context/CartContext";
import { vi } from "vitest";

describe("Catalogue", () => {
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

  const items: any = [
    {
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
  ];

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

  vi.stubEnv("STRAPI", "https://energized-birthday-14512eb346.strapiapp.com");

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
        <Catalogue items={items} timeslots={timeslots} />{" "}
      </CartContext.Provider>
    </DaterangeContext.Provider>
  );

  it("Renders correct amount of products in cart", async () => {
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
          <Catalogue items={items} timeslots={timeslots} />{" "}
        </CartContext.Provider>
      </DaterangeContext.Provider>
    );
    const cartButtonElement = await screen.getByTestId("products");
    expect(cartButtonElement).toBeDefined();
  });

  it("Renders correct div when no products fetched", async () => {
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
          <Catalogue items={[]} timeslots={timeslots} />{" "}
        </CartContext.Provider>
      </DaterangeContext.Provider>
    );
    const cartButtonElement = await screen.getByTestId("products");
    expect(cartButtonElement).toBeDefined();
  });
});
