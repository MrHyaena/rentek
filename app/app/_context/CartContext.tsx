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

type CartContextType = {
  cart: { [key: string]: any }[];
  setCart: Dispatch<SetStateAction<any[]>>;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
});

type Props = {
  children?: ReactNode;
};

type StateType = { [key: string]: any }[];

export function CartContextProvider({ children }: Props) {
  const [cart, setCart] = useState<StateType>([]);

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
