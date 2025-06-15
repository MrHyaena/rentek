"use client";

import { CartContext } from "@/app/_context/CartContext";
import React, { useContext } from "react";
import Link from "next/link";
import { DaterangeContext } from "@/app/_context/DaterangeContext";
import { FaCartPlus } from "react-icons/fa6";
import { AvailabilityData } from "../../Availability/_functions/availabilityDataFunction";
import { addToCartFunction } from "../_functions/cartFunction";

type Props = {
  item: { [key: string]: any };
  timeslots: any[];
};

//AddToCartButton functional component
export default function AddToCartButton({ item, timeslots }: Props) {
  const { cart, setCart } = useContext(CartContext);
  const { daterange } = useContext(DaterangeContext);

  //Getting availability data
  const { realAmount, cartItem } = AvailabilityData(
    timeslots,
    item,
    daterange,
    cart
  );

  return (
    <>
      {item.pricingType == "rental" && (
        <>
          <div data-testid="rental" className="grid grid-cols-2 col-span-2">
            {realAmount > 0 ? (
              <>
                <button
                  data-testid="realAmountNotZero"
                  onClick={() => {
                    if (cartItem == undefined) {
                      addToCartFunction(cart, setCart, item);
                    } else if (realAmount > 0 && realAmount > cartItem.count)
                      addToCartFunction(cart, setCart, item);
                  }}
                  className="col-span-1 py-3 border rounded-l-lg flex items-center justify-center border-zinc-300 text-textPrimary ease-in-out transition-all hover:bg-zinc-100 cursor-pointer"
                >
                  <FaCartPlus />
                </button>
              </>
            ) : (
              <button
                data-testid="realAmountZero"
                className="col-span-1 py-3 border rounded-l-lg flex items-center justify-center bg-gray-200 border-zinc-300 text-textPrimary ease-in-out transition-all"
              >
                <FaCartPlus />
              </button>
            )}
            <p
              data-testid="cartItemAmount"
              className="font-semibold col-span-1 py-3 px-10 border-y border-r rounded-r-lg flex items-center justify-center border-zinc-300 text-textPrimary ease-in-out transition-all"
            >
              {cartItem == undefined ? 0 : cartItem.count}
            </p>
          </div>
        </>
      )}
      {item.pricingType == "product" && (
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
