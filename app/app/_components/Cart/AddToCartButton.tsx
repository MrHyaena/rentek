"use client";

import { CartContext } from "@/app/_context/CartContext";
import React, { useContext } from "react";

type Props = {
  data: any;
};

export default function AddToCartButton({ data }: Props) {
  const { cart, setCart } = useContext(CartContext);

  function AddToCart(item: {}) {
    setCart([...cart, item]);
    localStorage.setItem("cart", JSON.stringify([...cart, item]));
  }

  return (
    <button
      className="buttonSmall self-stretch text-start"
      onClick={() => {
        AddToCart(data);
      }}
    >
      Přidat do košíku
    </button>
  );
}
