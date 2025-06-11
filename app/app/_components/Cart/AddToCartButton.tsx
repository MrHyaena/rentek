"use client";

import { CartContext } from "@/app/_context/CartContext";
import React, { useContext } from "react";
import { addToCartFunction } from "./cartFunction";
import Link from "next/link";
import { DaterangeContext } from "@/app/_context/DaterangeContext";
import { isWithinInterval } from "date-fns";
import { FaCartPlus } from "react-icons/fa6";

type Props = {
  item: any;
  timeslots: any;
};

export default function AddToCartButton({ item, timeslots }: Props) {
  const { cart, setCart } = useContext(CartContext);
  const { daterange } = useContext(DaterangeContext);

  const arrayTimeslotsByDate = timeslots.filter((timeslot: any) => {
    if (
      isWithinInterval(timeslot.delivery, {
        start: daterange.startDate,
        end: daterange.endDate,
      }) ||
      isWithinInterval(daterange.startDate, {
        start: timeslot.delivery,
        end: timeslot.pickup,
      })
    ) {
      return true;
    }
  });
  let rentedAmount: any = 0;

  const arrayTimeslotsByItem = arrayTimeslotsByDate.filter((timeslot: any) => {
    const productArray = timeslot.products.filter((product: any) => {
      if (product.item.documentId == item.documentId) {
        rentedAmount = rentedAmount + product.count;
        return true;
      }
    });

    if (productArray.length > 0) {
      return true;
    }
  });

  const realAmount = item.amount - rentedAmount;

  console.log(arrayTimeslotsByItem);

  let grayScale = 100;

  if (realAmount == 0) {
    grayScale = 50;
  }

  const cartItem = cart.find(
    (itemCart: any) => itemCart.item.documentId == item.documentId
  );

  return (
    <>
      {item.pricingType == "rental" && (
        <>
          <div className="grid grid-cols-2 col-span-2">
            {realAmount > 0 ? (
              <>
                <button
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
              <button className="col-span-1 py-3 border rounded-l-lg flex items-center justify-center bg-gray-200 border-zinc-300 text-textPrimary ease-in-out transition-all">
                <FaCartPlus />
              </button>
            )}{" "}
            <p className="font-semibold col-span-1 py-3 px-10 border-y border-r rounded-r-lg flex items-center justify-center border-zinc-300 text-textPrimary ease-in-out transition-all">
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
