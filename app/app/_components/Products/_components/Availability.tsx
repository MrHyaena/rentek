"use client";

import { CartContext } from "@/app/_context/CartContext";
import { DaterangeContext } from "@/app/_context/DaterangeContext";
import React, { useContext } from "react";
import { AvailabilityData } from "../../Availability/_functions/availabilityDataFunction";

//functional component showing availability
export default function Availability({
  item,
  timeslots,
}: {
  item: any;
  timeslots: any;
}) {
  const { daterange } = useContext(DaterangeContext);
  const { cart } = useContext(CartContext);
  const { realAmount, arrayTimeslotsByItem } = AvailabilityData(
    timeslots,
    item,
    daterange,
    cart
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
