"use client";

import { CartContext } from "../../_context/CartContext";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useContext } from "react";
type ProductProps = {
  item: {
    imageUrl: string;
    name: string;
    description: string;
    id: number;
    price: number;
    slug: string;
    documentId: string;
  };
};

export default function ProductTabHorizontal({ item }: ProductProps) {
  const shortenedDescription = item.description.substring(0, 200) + "...";
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

  return (
    <div className="h-[250px] grid grid-cols-[250px_1fr] shrink-0">
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
            <p className="text-2xl font-semibold text-textPrimary">
              {item.name}
            </p>
            <p className="bg-primaryHover text-white px-2 py-1 rounded-md font-semibold text-sm">
              Dostupné
            </p>
          </div>
          <p className="text-textSecondary">{shortenedDescription}</p>
        </div>
        <div className="flex flex-col items-stretch gap-2">
          <p className="text-base font-semibold text-zinc-400">
            <span className="text-primary font-semibold text-xl">
              {item.price * days} Kč
            </span>{" "}
            / {days} {days < 2 && "den"}
            {days <= 4 && "dny"}
            {days > 4 && "dní"}
          </p>

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
