"use client";

import React, { useContext } from "react";
import { CartContext } from "../../_context/CartContext";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";

//Cart button placed in header
export default function CartButton() {
  const { cart } = useContext(CartContext);

  return (
    <>
      <Link href="/kosik" className="relative flex items-center">
        <FaCartShopping className="text-primary md:text-2xl text-xl" />
        <p className="bg-primaryHover text-white font-semibold text-[11px] rounded-full flex items-center justify-center md:w-6 md:h-6 md:text-sm w-5 h-5 relative top-[-15px] left-[-5px]">
          {cart.length}
        </p>
      </Link>
    </>
  );
}
