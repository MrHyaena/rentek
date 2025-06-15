import { describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { AvailabilityData } from "../_functions/availabilityDataFunction";

describe("AvailabilityData", () => {
  it("AvailabilityData with matching items, nomatching timeslots, nomatching products", () => {
    const ItemMatchTimeslotsNomatchProductsNomatch = {
      timeslots: [
        {
          delivery: new Date(2025, 8, 14, 10),
          pickup: new Date(2025, 8, 16, 10),
          products: [],
        },
      ],
      item: { documentId: "4f48ew45fre9w", amount: 5 },
      daterange: {
        startDate: new Date(2025, 6, 14, 10),
        endDate: new Date(2025, 6, 15, 10),
        startIsValid: true,
        endIsValid: true,
      },
      cart: [
        {
          item: {
            documentId: "4f48ew45fre9w",
          },
        },
      ],
    };
    const { timeslots, item, daterange, cart } =
      ItemMatchTimeslotsNomatchProductsNomatch;

    const result = AvailabilityData(timeslots, item, daterange, cart);
    expect(result).toStrictEqual({
      cartItem: cart[0],
      realAmount: 5,
      grayScale: 100,
      arrayTimeslotsByItem: [],
      arrayTimeslotsByDate: [],
    });
  });

  it("AvailabilityData with matching items, matching timeslots, nonmatching products", () => {
    const ItemMatchTimeslotsMatchProductsNomatch = {
      timeslots: [
        {
          delivery: new Date(2025, 6, 14, 10),
          pickup: new Date(2025, 6, 15, 10),
          products: [],
        },
      ],
      item: { documentId: "4f48ew45fre9w", amount: 5 },
      daterange: {
        startDate: new Date(2025, 6, 14, 10),
        endDate: new Date(2025, 6, 15, 10),
        startIsValid: true,
        endIsValid: true,
      },
      cart: [
        {
          item: {
            documentId: "4f48ew45fre9w",
          },
        },
      ],
    };
    const { timeslots, item, daterange, cart } =
      ItemMatchTimeslotsMatchProductsNomatch;

    const result = AvailabilityData(timeslots, item, daterange, cart);

    expect(result).toStrictEqual({
      cartItem: cart[0],
      realAmount: 5,
      grayScale: 100,
      arrayTimeslotsByItem: [],
      arrayTimeslotsByDate: [timeslots[0]],
    });
  });

  it("AvailabilityData with matching items, matching timeslots, matching products", () => {
    const ItemMatchTimeslotsMatchProductsMatch = {
      timeslots: [
        {
          delivery: new Date(2025, 6, 14, 10),
          pickup: new Date(2025, 6, 15, 10),
          products: [{ item: { documentId: "4f48ew45fre9w" }, count: 3 }],
        },
      ],
      item: { documentId: "4f48ew45fre9w", amount: 5 },
      daterange: {
        startDate: new Date(2025, 6, 14, 10),
        endDate: new Date(2025, 6, 15, 10),
        startIsValid: true,
        endIsValid: true,
      },
      cart: [
        {
          item: {
            documentId: "4f48ew45fre9w",
          },
        },
      ],
    };
    const { timeslots, item, daterange, cart } =
      ItemMatchTimeslotsMatchProductsMatch;
    const result = AvailabilityData(timeslots, item, daterange, cart);

    expect(result).toStrictEqual({
      cartItem: cart[0],
      realAmount: 2,
      grayScale: 100,
      arrayTimeslotsByItem: [timeslots[0]],
      arrayTimeslotsByDate: [timeslots[0]],
    });
  });
});
