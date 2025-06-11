"use client";

import { CartContext } from "@/app/_context/CartContext";
import { DaterangeContext } from "@/app/_context/DaterangeContext";
import { differenceInDays } from "date-fns";
import React, { useContext, useEffect, useState } from "react";

type Props = {
  data: any;
};

export default function ProductPrice({ data }: Props) {
  const { daterange, saleIndex, numberOfDays, setNumberOfDays } =
    useContext(DaterangeContext);

  let tag: string = "den";
  if (numberOfDays == 1) {
    tag = "den";
  } else if (numberOfDays <= 4) {
    tag = "dny";
  } else if (numberOfDays > 4) {
    tag = "dní";
  }

  const basePriceUntruc = Number(data.basePrice * saleIndex * numberOfDays);
  const price = Math.trunc(basePriceUntruc);
  console.log(price);

  function isValid() {
    if (daterange.endIsValid == true && daterange.startIsValid == true) {
      return true;
    }
    if (daterange.endIsValid != true || daterange.startIsValid != true) {
      return false;
    }
  }

  return (
    <>
      {data.pricingType == "rental" && (
        <>
          <div className="flex flex-col w-full gap-3 items-start">
            <p className="font-semibold text-textPrimary">
              {isValid() ? (
                <>
                  <span className="text-xl font-semibold text-primary">
                    {price} Kč
                  </span>{" "}
                  celkem za {numberOfDays} {tag} {"(vč. DPH)"}
                </>
              ) : (
                <>
                  Od{" "}
                  <span className="text-xl font-semibold text-primary">
                    {price} Kč
                  </span>{" "}
                  za den {"(vč. DPH)"}
                </>
              )}
            </p>
          </div>
        </>
      )}
      {data.pricingType == "product" && (
        <>
          <div className="flex flex-col w-full gap-3 items-start">
            <p className="font-semibold text-textPrimary">
              {isValid() ? (
                <>
                  <span className="text-xl font-semibold text-primary">
                    {price} Kč
                  </span>{" "}
                  {"(vč. DPH)"}
                </>
              ) : (
                <>
                  Od{" "}
                  <span className="text-xl font-semibold text-primary">
                    {price} Kč
                  </span>{" "}
                  za den {"(vč. DPH)"}
                </>
              )}
            </p>
          </div>
        </>
      )}
    </>
  );
}
