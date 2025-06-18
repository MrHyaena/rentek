import { describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import "@testing-library/react";
import CTAHorizontal from "../_components/CTAHorizontal";
import CTAVertical from "../_components/CTAVertical";

describe("ProductSpecsProduct", () => {
  const { rerender } = render(
    <CTAVertical
      image={"/hero"}
      heading={"Heading"}
      text={"Text"}
      buttonText={"Button"}
      link="/link"
    />
  );

  it("Button is rendered", () => {
    const buttonElement = screen.getByTestId("button");
    expect(buttonElement).toBeDefined();
  });

  it("Uses rendered correctly", () => {
    const paragraphElement = screen.getByTestId("image");
    const style = paragraphElement.style.backgroundImage;
    expect(style).toBe('url("/hero")');
  });
});
