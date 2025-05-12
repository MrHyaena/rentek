"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import React from "react";

type CartContextType = {
  cart: any[];
  setCart: Dispatch<SetStateAction<any[]>>;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
});

type Props = {
  children?: ReactNode;
};

export function CartContextProvider({ children }: Props) {
  const [cart, setCart] = useState<any[]>([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
