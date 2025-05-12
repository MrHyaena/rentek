"use client";

import { CartContext } from "@/app/_context/CartContext";
import { DaterangeContext } from "@/app/_context/DaterangeContext";
import { differenceInDays } from "date-fns";
import React, { useContext, useEffect, useState } from "react";

type Props = {
  basePrice: string;
  data: any;
};

export default function ProductPagePrice({ basePrice, data }: Props) {
  const { daterange } = useContext(DaterangeContext);
  const [numberOfDays, setNumberOfDays] = useState<number>(1);

  const { cart, setCart } = useContext(CartContext);

  const days: number = 32;

  function AddToCart(item: {
    imageUrl: string;
    name: string;
    description: string;
    id: number;
    price: number;
    slug: string;
    documentId: string;
    [key: string]: any;
  }) {
    const newItem = {
      imageUrl: item.imageUrl,
      name: item.name,
      id: item.id,
      price: item.price,
      slug: item.slug,
      documentId: item.documentId,
    };
    setCart([...cart, newItem]);
  }

  const price = Number(basePrice);

  useEffect(() => {
    if (daterange.endIsValid && daterange.startIsValid) {
      const days = differenceInDays(daterange.endDate, daterange.startDate);
      setNumberOfDays(days + 1);
    }
  }, [daterange]);

  let tag;
  if (numberOfDays == 1) {
    tag = "den";
  } else if (numberOfDays <= 4) {
    tag = "dny";
  } else if (numberOfDays > 4) {
    tag = "dní";
  }

  return (
    <div className="flex flex-col w-full gap-3 items-center">
      <p className="font-semibold text-textSecondary">
        Cena{" "}
        <span className="text-3xl font-semibold text-primary">
          {price * numberOfDays} Kč
        </span>{" "}
        celkem za {numberOfDays} {tag}
      </p>
      <button
        className="buttonSmall self-stretch"
        onClick={() => {
          AddToCart(data);
        }}
      >
        Přidat do košíku
      </button>
    </div>
  );
}
