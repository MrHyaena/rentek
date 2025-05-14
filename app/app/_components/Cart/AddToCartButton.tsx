"use client";

import { CartContext } from "@/app/_context/CartContext";
import React, { useContext } from "react";
import { addToCartFunction } from "./cartFunction";

type Props = {
  data: any;
};

export default function AddToCartButton({ data }: Props) {
  const { cart, setCart } = useContext(CartContext);

  return (
    <button
      className="buttonSmall self-stretch text-start"
      onClick={() => {
        addToCartFunction(cart, setCart, data);
      }}
    >
      Přidat do košíku
    </button>
  );
}
