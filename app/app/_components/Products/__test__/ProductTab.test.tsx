import { describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import "@testing-library/react";
import ProductTabHorizontal from "../_components/ProductHorizontal";
import ProductTab from "../_components/ProductTab";

describe("ProductHorizontal", () => {
  const item: any = {
    amount: 5,
    accessories: [],
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores tempora, optio aut qui repellendus, quaerat laudantium ad delectus repellat inventore quae ducimus, nam sunt ipsa commodi! Dolorem rem eaque maxime.",
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
  };

  render(<ProductTab product={{ item }} />);

  it("Renders correct text with price", () => {
    const paragraphElement = screen.getByTestId("priceParagraph");
    expect(paragraphElement).toHaveTextContent("Od 100 Kč za den");
  });

  it("Excerpt rendered shortened and correct", () => {
    const paragraphElement = screen.getByTestId("excerpt");
    expect(paragraphElement).toHaveTextContent(
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores tempora, opt..."
    );
  });
});
