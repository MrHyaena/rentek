"use client";

import { DaterangeContext } from "@/app/_context/DaterangeContext";
import { CartContext } from "../../_context/CartContext";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { differenceInDays } from "date-fns";
import ProductPrice from "../Prices/ProductPagePrice";
type ProductProps = {
  item: {
    imageUrl: string;
    name: string;
    description: string;
    id: number;
    price: number;
    slug: string;
    documentId: string;
    excerpt: string;
    [key: string]: any;
  };
};

export default function ProductTabHorizontal({ item }: ProductProps) {
  const { cart, setCart } = useContext(CartContext);
  const { daterange, setDaterange } = useContext(DaterangeContext);

  const [numberOfDays, setNumberOfDays] = useState<number>(1);

  const price = Number(item.price);

  useEffect(() => {
    if (daterange.endIsValid && daterange.startIsValid) {
      const days = differenceInDays(daterange.endDate, daterange.startDate);
      setNumberOfDays(days + 1);
    }
  }, [daterange]);

  function AddToCart(item: {}) {
    setCart([...cart, item]);
    localStorage.setItem("cart", JSON.stringify([...cart, item]));
  }

  let tag;
  if (numberOfDays == 1) {
    tag = "den";
  } else if (numberOfDays <= 4) {
    tag = "dny";
  } else if (numberOfDays > 4) {
    tag = "dní";
  }

  return (
    <div className="grid grid-cols-[250px_1fr] shrink-0">
      <div className="rounded-l-xl overflow-hidden">
        {" "}
        <Image
          src={process.env.STRAPI + item.imageUrl}
          alt={"thumbnail-" + item.imageUrl}
          height={500}
          width={500}
          className="h-full object-cover "
        />
      </div>
      <div className="border-y border-r rounded-r-xl p-5 flex flex-col gap-5 border-borderGray justify-between">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <p className="text-xl font-semibold text-textPrimary">
              {item.name}
            </p>
            <p className="bg-primaryHover text-white px-2 py-1 rounded-md font-semibold text-sm">
              Dostupné
            </p>
          </div>
          <p className="text-textSecondary">{item.excerpt}</p>
        </div>
        <div className="flex flex-col items-stretch gap-2">
          <ProductPrice data={item} />

          <div className="flex gap-2">
            <a href={process.env.WEBSITE + `/produkt/${item.documentId}`}>
              <button className="bg-primary px-20 py-2 text-lg font-semibold rounded-md text-textLight cursor-pointer hover:bg-primaryHover transition-all ease-in-out col-span-4">
                Otevřít
              </button>
            </a>
            <button
              onClick={() => {
                AddToCart(item);
              }}
              className="col-span-1 px-10 border rounded-lg flex items-center justify-center border-zinc-300 text-textPrimary ease-in-out transition-all hover:bg-zinc-100 cursor-pointer"
            >
              <FontAwesomeIcon icon={faCartPlus} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
