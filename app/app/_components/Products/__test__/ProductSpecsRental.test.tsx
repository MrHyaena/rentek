import { describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import "@testing-library/react";
import ProductSpecsProduct from "../_components/ProductSpecsProduct";
import ProductSpecsRental from "../_components/ProductSpecsRental";

const data = {
  uses: [{ name: "uses" }],
  brands: [{ name: "uses" }],
  accessories: [{ name: "uses" }],
  additionalInformation: "hello",
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
};

const dataTwo = {
  uses: [],
  brands: [],
  accessories: [],

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
};

describe("ProductSpecsProduct", () => {
  const { rerender } = render(<ProductSpecsRental data={data} />);

  it("Uses rendered correctly", () => {
    const paragraphElement = screen.getByTestId("usesNotNull");
    expect(paragraphElement).toBeDefined();
  });

  it("Brands rendered correctly", () => {
    const paragraphElement = screen.getByTestId("brandsNotNull");
    expect(paragraphElement).toBeDefined();
  });

  it("Accessories rendered correctly", () => {
    const paragraphElement = screen.getByTestId("accessoriesNotNull");
    expect(paragraphElement).toBeDefined();
  });

  it("Additional information correctly", () => {
    const paragraphElement = screen.getByTestId("additionalInformation");
    expect(paragraphElement).toBeDefined();
  });

  describe("DataTwo", () => {
    it("Uses rendered correctly", () => {
      rerender(<ProductSpecsRental data={dataTwo} />);

      expect(screen.queryByTestId("usesNotNull")).not.toBeInTheDocument();
    });

    it("Brands rendered correctly", () => {
      expect(screen.queryByTestId("brandsNotNull")).not.toBeInTheDocument();
    });

    it("Additional rendered correctly", () => {
      expect(
        screen.queryByTestId("accessoriesNotNull")
      ).not.toBeInTheDocument();
    });
  });
});
