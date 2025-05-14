"use client";

import { CartContext } from "@/app/_context/CartContext";
import { DaterangeContext } from "@/app/_context/DaterangeContext";
import { differenceInDays } from "date-fns";
import React, { useContext, useEffect, useState } from "react";

type Props = {
  data: any;
};

export default function ProductPrice({ data }: Props) {
  const { daterange } = useContext(DaterangeContext);
  const [numberOfDays, setNumberOfDays] = useState<number>(1);

  const price = Number(data.basePrice);
  let saleIndex: number = 0;

  if (numberOfDays == 1) {
    saleIndex = 0;
  } else if (numberOfDays <= 7) {
    saleIndex = 0.9;
  } else if (numberOfDays <= 21) {
    saleIndex = 0.85;
  } else if (numberOfDays > 21) {
    saleIndex = 0.8;
  }

  useEffect(() => {
    if (daterange.endIsValid && daterange.startIsValid) {
      const days = differenceInDays(daterange.endDate, daterange.startDate);
      setNumberOfDays(days + 1);
    }
  }, [daterange]);

  let tag: string = "den";
  if (numberOfDays == 1) {
    tag = "den";
  } else if (numberOfDays <= 4) {
    tag = "dny";
  } else if (numberOfDays > 4) {
    tag = "dní";
  }

  return (
    <div className="flex flex-col w-full gap-3 items-start">
      <p className="font-semibold text-textSecondary">
        <span className="text-2xl font-semibold text-primary">
          {price * numberOfDays * saleIndex} Kč
        </span>{" "}
        celkem za {numberOfDays} {tag} {"(vč. DPH)"}
      </p>
    </div>
  );
}
