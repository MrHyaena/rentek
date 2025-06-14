import { describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import AddToCartButton from "../AddToCartButton";

describe("AddToCartButton", () => {
  const item = { pricingType: "rental" };
  const timeslots: any[] = [];

  render(<AddToCartButton item={item} timeslots={timeslots} />);

  it("Has correct item count", () => {});
});
