"use client";

import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { CartContext } from "../../_context/CartContext";

export default function CartButton() {
  const { cart } = useContext(CartContext);

  return (
    <>
      <div className="text-xl relative flex items-center">
        <FontAwesomeIcon
          icon={faCartShopping}
          className="text-primary text-2xl"
        />
        <p className="bg-tertiary text-white font-semibold text-sm rounded-full flex items-center justify-center w-6 h-6 relative top-[-15px] left-[-5px]">
          {cart.length}
        </p>
      </div>
    </>
  );
}
