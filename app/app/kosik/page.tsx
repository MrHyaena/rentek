"use client";

import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../_context/CartContext";
import Image from "next/image";
import { DaterangeContext } from "../_context/DaterangeContext";
import { differenceInDays } from "date-fns";
import CartForm from "../_components/Cart/CartForm";

export default function page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-10 gap-5">
      <div className="w-full max-w-wrapper">
        <h3>Košík</h3>
        <p className="mt-3">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
          placeat, cupiditate, pariatur deleniti neque itaque quisquam
          recusandae dolore quo illum assumenda quam est excepturi eaque
          perspiciatis iure tempora, amet fugit!
        </p>
      </div>
      <CartForm />
    </div>
  );
}
