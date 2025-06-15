"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import React from "react";
import { CartState, CartContextType } from "../_types/cart";

export const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
});

type Props = {
  children?: ReactNode;
};

export function CartContextProvider({ children }: Props) {
  const [cart, setCart] = useState<CartState>([]);

  useEffect(() => {
    const data = localStorage.getItem("cart");

    if (data != null) {
      setCart(JSON.parse(data));
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
