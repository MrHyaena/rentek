import { describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import "@testing-library/react";
import PageHeading from "../_components/PageHeading";

describe("ProductSpecsProduct", () => {
  const { rerender } = render(
    <PageHeading
      image={"/hero"}
      heading={"Heading"}
      text={"Text"}
      datepickerExists={true}
    />
  );

  it("Uses rendered correctly", () => {
    const paragraphElement = screen.getByTestId("datepickers");
    expect(paragraphElement).toBeDefined();
  });

  it("Uses rendered correctly", () => {
    const paragraphElement = screen.getByTestId("image");
    const style = paragraphElement.style.backgroundImage;
    expect(style).toBe('url("/hero")');
  });
});
