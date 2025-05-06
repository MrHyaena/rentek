"use client";

import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { CartContext } from "../../_context/CartContext";

export default function CartButton() {
  const { items } = useContext(CartContext);

  return (
    <>
      <div className="text-xl relative flex items-center">
        <FontAwesomeIcon icon={faCartShopping} />
        <p className="bg-primary text-white font-semibold text-sm rounded-full flex items-center justify-center w-5 h-5 relative top-[-15px] left-[-5px]">
          {items.length}
        </p>
      </div>
    </>
  );
}
