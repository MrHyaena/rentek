"use client";

import { DaterangeContext } from "@/app/_context/DaterangeContext";
import { CartContext } from "../../../_context/CartContext";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { differenceInDays } from "date-fns";
import ProductPrice from "../../Prices/_components/ProductPrice";
import { addToCartFunction } from "../../Cart/_functions/cartFunction";
import Link from "next/link";
import { FaToolbox } from "react-icons/fa6";
import { AvailabilityData } from "../../Availability/_functions/availabilityDataFunction";
type ProductProps = {
  key: any;
  timeslots: any[];
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

export default function ProductTabHorizontal({
  item,
  timeslots,
}: ProductProps) {
  const { cart, setCart } = useContext(CartContext);
  const { daterange, setDaterange } = useContext(DaterangeContext);

  const [numberOfDays, setNumberOfDays] = useState<number>(1);

  const shortenedDescription = item.excerpt.substring(0, 140) + "...";

  useEffect(() => {
    if (daterange.endIsValid && daterange.startIsValid) {
      const days = differenceInDays(daterange.endDate, daterange.startDate);
      setNumberOfDays(days + 1);
    }
  }, [daterange]);

  const { realAmount, cartItem, arrayTimeslotsByItem } = AvailabilityData(
    timeslots,
    item,
    daterange,
    cart
  );

  function CatalogueAddToCart() {
    return (
      <>
        {" "}
        <div className="grid grid-cols-2">
          {realAmount > 0 ? (
            <>
              <button
                onClick={() => {
                  if (cartItem == undefined) {
                    addToCartFunction(cart, setCart, item);
                  } else if (realAmount > 0 && realAmount > cartItem.count)
                    addToCartFunction(cart, setCart, item);
                }}
                className="col-span-1 py-3 px-10 border rounded-l-lg flex items-center justify-center border-zinc-300 text-textPrimary ease-in-out transition-all hover:bg-zinc-100 cursor-pointer"
              >
                <FontAwesomeIcon icon={faCartPlus} />
              </button>
            </>
          ) : (
            <button className="col-span-1 py-3 px-10 border rounded-l-lg flex items-center justify-center bg-gray-200 border-zinc-300 text-textPrimary ease-in-out transition-all">
              <FontAwesomeIcon icon={faCartPlus} />
            </button>
          )}{" "}
          <p className="font-semibold col-span-1 py-3 px-10 border-y border-r rounded-r-lg flex items-center justify-center border-zinc-300 text-textPrimary ease-in-out transition-all">
            {cartItem == undefined ? 0 : cartItem.count}
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="md:grid md:grid-cols-[250px_1fr] shrink-0">
      <Link
        href={process.env.WEBSITE + `/produkt/${item.documentId}`}
        className="md:rounded-l-xl md:rounded-t-none rounded-t-xl border-t border-l border-r md:border-r-0 md:border-b border-borderGray overflow-hidden flex items-center justify-center p-7"
      >
        {" "}
        <Image
          src={item.coverImage.formats.small.url}
          alt={"thumbnail-" + item.coverImage.formats.small.url}
          height={400}
          width={400}
          className=""
        />
      </Link>
      <div className="border-y md:border-r border-x md:rounded-l-none md:rounded-r-xl rounded-b-xl p-5 flex flex-col gap-5 border-borderGray justify-between">
        <Link href={process.env.WEBSITE + `/produkt/${item.documentId}`}>
          <div className="flex sm:flex-row flex-col-reverse sm:items-center items-start sm:gap-4 gap-2 mb-2">
            <p className="text-xl font-semibold text-textPrimary">
              {item.name}
            </p>
            {realAmount > 0 ? (
              <p className="bg-primaryHover text-white px-2 py-1 rounded-md font-semibold text-sm">
                Skladem:{" "}
                {arrayTimeslotsByItem.length == 0 ? item.amount : realAmount}
              </p>
            ) : (
              <p className="bg-gray-500 text-white px-2 py-1 rounded-md font-semibold text-sm">
                Nedostupné
              </p>
            )}
          </div>
          <p className="text-textSecondary">{shortenedDescription}</p>
        </Link>
        {item.accessories.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            <div className="flex gap-1 items-center">
              <FaToolbox className="text-lg text-primaryHover" />
              <p className="font-semibold ">Společně s technikou:</p>
            </div>
            {item.accessories.map((accessory: any) => {
              return (
                <p key={accessory.name + item.name} className="group">
                  {accessory.name}
                  <span className="group-last:hidden">, </span>
                </p>
              );
            })}
          </div>
        )}
        <div className="flex flex-col items-stretch gap-2">
          <ProductPrice data={item} />
          <div className="flex md:flex-row flex-col gap-2">
            <Link
              href={process.env.WEBSITE + `/produkt/${item.documentId}`}
              className="bg-primary md:px-20 text-center flex items-center justify-center py-2 text-lg font-semibold rounded-md text-textLight cursor-pointer hover:bg-primaryHover transition-all ease-in-out"
            >
              Otevřít
            </Link>
            <CatalogueAddToCart />
          </div>
        </div>
      </div>
    </div>
  );
}
