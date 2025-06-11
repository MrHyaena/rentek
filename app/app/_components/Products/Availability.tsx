"use client";

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

  return (
    <>
      <p className="bg-primaryHover text-white px-2 py-1 rounded-md font-semibold text-sm">
        Dostupné
      </p>
    </>
  );
}
