"use client";

import { CartContext } from "@/app/_context/CartContext";
import { DaterangeContext } from "@/app/_context/DaterangeContext";
import { isWithinInterval } from "date-fns";
import React, { useContext, useEffect, useState } from "react";

export default function Availability({
  item,
  timeslots,
}: {
  item: any;
  timeslots: any;
}) {
  const { daterange } = useContext(DaterangeContext);
  const { cart } = useContext(CartContext);
  const arrayTimeslotsByDate = timeslots.filter((timeslot: any) => {
    if (
      isWithinInterval(timeslot.delivery, {
        start: daterange.startDate,
        end: daterange.endDate,
      }) ||
      isWithinInterval(daterange.startDate, {
        start: timeslot.delivery,
        end: timeslot.pickup,
      }) ||
      isWithinInterval(timeslot.pickup, {
        start: daterange.startDate,
        end: daterange.endDate,
      }) ||
      isWithinInterval(daterange.endDate, {
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
      {realAmount > 0 ? (
        <p className="bg-primaryHover text-white px-2 py-1 rounded-md font-semibold text-sm">
          Skladem: {arrayTimeslotsByItem.length == 0 ? item.amount : realAmount}
        </p>
      ) : (
        <p className="bg-gray-500 text-white px-2 py-1 rounded-md font-semibold text-sm">
          Nedostupné
        </p>
      )}
    </>
  );
}
