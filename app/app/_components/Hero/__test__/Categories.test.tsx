import { describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import "@testing-library/react";
import Categories from "../_components/Categories";

describe("ProductHorizontal", () => {
  render(<Categories />);

  it("Renders correct amount of products in cart", () => {
    const paragraphElement = screen.getAllByText("Ukázat techniku");
    expect(paragraphElement).toBeDefined();
  });

  it("Renders correct amount of products in cart", () => {
    const paragraphElement = screen.getByText(
      "Úprava trávníku, porostů a zeminy"
    );
    expect(paragraphElement).toBeDefined();
  });
});
