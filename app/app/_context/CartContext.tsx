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
  items: number[];
  setItems: Dispatch<SetStateAction<number[]>>;
};

export const CartContext = createContext<CartContextType>({
  items: [],
  setItems: () => {},
});

type Props = {
  children?: ReactNode;
};

export function CartContextProvider({ children }: Props) {
  const [items, setItems] = useState([0, 1, 3]);

  return (
    <CartContext.Provider value={{ items, setItems }}>
      {children}
    </CartContext.Provider>
  );
}
