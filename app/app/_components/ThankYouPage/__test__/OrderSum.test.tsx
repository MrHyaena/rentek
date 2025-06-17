import { beforeAll, describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import "@testing-library/react";
import { CartContext } from "@/app/_context/CartContext";
import { vi } from "vitest";
import OrderSum from "../_components/OrderSum";
import { useSearchParams } from "next/navigation";

describe("OrderSum", () => {
  const cart: any = [{ item: { documentId: "4f48ew45fre9w" }, count: 3 }];
  function setCart() {}

  vi.mock("next/navigation", () => ({
    useSearchParams: () =>
      new URLSearchParams("?orderid=gi8ttlqo60rmp8s06hn4fyix"),
  }));

  vi.stubEnv("STRAPI", "https://api.rentek.cz");
  const { rerender } = render(
    <CartContext.Provider value={{ cart, setCart }}>
      <OrderSum />
    </CartContext.Provider>
  );

  it("Correct part rendered when orderData is null", async () => {
    const divElement = await screen.getByTestId("dataNull");
  });

  it("Correct part rendered when orderData is null", async () => {
    const divElement = await screen.findByTestId("dataExists");
  });

  it("Correct part rendered when orderData is null", async () => {
    const divElement = await screen.findAllByTestId("additionalProducts");
  });

  it("Correct part rendered when orderData is null", async () => {
    const divElement = await screen.findAllByTestId("rentalProduct");
  });
});
