"use client";

import { CartContext } from "@/app/_context/CartContext";
import React, { useContext } from "react";
import { addToCartFunction } from "./cartFunction";
import Link from "next/link";

type Props = {
  data: any;
};

export default function AddToCartButton({ data }: Props) {
  const { cart, setCart } = useContext(CartContext);

  return (
    <>
      {data.pricingType == "rental" && (
        <>
          <button
            className="buttonSmall self-stretch md:text-start text-center"
            onClick={() => {
              addToCartFunction(cart, setCart, data);
            }}
          >
            Přidat do košíku
          </button>
        </>
      )}
      {data.pricingType == "product" && (
        <>
          <Link
            href={"/kosik"}
            className="buttonSmall self-stretch md:text-start text-center"
          >
            Lze přidat přímo v košíku - přejít do košíku
          </Link>
        </>
      )}
    </>
  );
}
