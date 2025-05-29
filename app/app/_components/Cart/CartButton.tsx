"use client";

import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { CartContext } from "../../_context/CartContext";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";

export default function CartButton() {
  const { cart } = useContext(CartContext);

  let length = 0;

  if (cart.length > 0) {
    length = cart.length;
  }

  return (
    <>
      <Link href="/kosik" className="relative flex items-center">
        <FaCartShopping className="text-primary md:text-2xl text-xl" />
        <p className="bg-tertiary text-white font-semibold text-[11px] rounded-full flex items-center justify-center md:w-6 md:h-6 md:text-sm w-5 h-5 relative top-[-15px] left-[-5px]">
          {length}
        </p>
      </Link>
    </>
  );
}
