import { describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import "@testing-library/react";
import { CartContext } from "@/app/_context/CartContext";
import CartButton from "../_components/CartButton";

describe("CartButton", () => {
  const cart: any[] = [1, 2, 3, 4];
  function setCart() {}
  render(
    <CartContext.Provider value={{ cart: cart, setCart: setCart }}>
      <CartButton></CartButton>
    </CartContext.Provider>
  );

  it("Renders correct amount of products in cart", () => {
    const cartbuttonElement = screen.getByText("4");
  });
});
