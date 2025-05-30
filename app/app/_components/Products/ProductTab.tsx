"use client";

import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { addToCartFunction } from "../Cart/cartFunction";
import { useContext } from "react";
import { CartContext } from "@/app/_context/CartContext";
import Image from "next/image";

type ProductProps = {
  product: { [key: string]: any };
};

export default function ProductTab({ product }: ProductProps) {
  const { cart, setCart } = useContext(CartContext);
  const item = product.item;
  console.log(item);

  const shortenedDescription = item.excerpt.substring(0, 120) + "...";

  const days: number = 32;

  return (
    <div className="h-full max-w-[340px] shrink-0">
      <div className="aspect-square flex items-center justify-center border border-borderGray rounded-t-xl">
        <Image
          src={item.coverImage.formats.small.url}
          alt={item.name}
          height={300}
          width={300}
        />
      </div>
      <div className="border-x border-b rounded-b-xl p-5 flex flex-col gap-5 border-borderGray">
        <div>
          <h5>{item.name}</h5>
          <p>{shortenedDescription}</p>
        </div>
        <div className="flex flex-col items-stretch gap-2">
          <p className="text-lg text-textSecondary">
            Od <span className="text-primary">{item.basePrice} Kč</span> za den
          </p>

          <div className="grid grid-cols-5 gap-2">
            <Link
              href={`${process.env.WEBSITE}/produkt/${item.documentId}`}
              className="buttonSmall col-span-4"
            >
              Otevřít
            </Link>
            <button
              onClick={() => {
                addToCartFunction(cart, setCart, item);
              }}
              className="col-span-1 border rounded-lg flex items-center justify-center border-zinc-300 text-textPrimary ease-in-out transition-all hover:bg-zinc-100 cursor-pointer"
            >
              <FontAwesomeIcon icon={faCartPlus} />
            </button>
          </div>
          <p className="text-lg  self-center px-3 py-[2px] rounded-md text-primary">
            dostupné
          </p>
        </div>
      </div>
    </div>
  );
}
