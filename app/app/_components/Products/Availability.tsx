"use client";

import { DaterangeContext } from "@/app/_context/DaterangeContext";
import React, { useContext, useEffect, useState } from "react";

export default function Availability({ data }: { data: any }) {
  const [amount, setAmount] = useState<number>(data.amount);

  return (
    <>
      <p className="bg-primaryHover text-white px-2 py-1 rounded-md font-semibold text-sm">
        Dostupné
      </p>
    </>
  );
}
