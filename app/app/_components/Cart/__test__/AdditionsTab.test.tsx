import { describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { AdditionsTab } from "../AdditionsTab";
import "@testing-library/jest-dom/vitest";

describe("AdditionsTab", () => {
  const product = {
    count: 5,
    item: {
      documentId: "58ds4a894ds",
      basePrice: "500",
      name: "product",
      coverImage: { formats: { thumbnail: { url: "/imageUrl" } } },
    },
  };
  const additions: any[] = [];
  function setAdditions() {}

  render(
    <AdditionsTab
      product={product}
      additions={additions}
      setAdditions={setAdditions}
    />
  );
  it("groupPrice rendered correctly rendered correctly", () => {
    const groupPriceElement = screen.getByTestId("groupPrice");
    expect(groupPriceElement).toHaveTextContent("2500");
  });

  it("productCount rendered correctly", () => {
    const productCountElement = screen.getByTestId("newProductCount");
    expect(productCountElement).toHaveTextContent("5");
  });

  it("thumbnail src is correct", () => {
    const thumbnailElement = screen.getByTestId("thumbnail");
    const src = thumbnailElement.getAttribute("src");
    expect(src).toContain("imageUrl");
  });

  it("itemHeading has correct link and text", () => {
    const headingElement = screen.getByTestId("headingLink");
    const href = headingElement.getAttribute("href");
    expect(href).toContain(product.item.documentId);
    expect(headingElement).toHaveTextContent(product.item.name);
  });
});
