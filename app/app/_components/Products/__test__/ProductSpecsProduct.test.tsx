import { describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import "@testing-library/react";
import ProductSpecsProduct from "../_components/ProductSpecsProduct";

describe("ProductSpecsProduct", () => {
  render(<ProductSpecsProduct data={{ additionalInformation: "info" }} />);

  it("Additional information rendered correctly", () => {
    const paragraphElement = screen.getByText("info");
    expect(paragraphElement).toBeDefined();
  });
});
