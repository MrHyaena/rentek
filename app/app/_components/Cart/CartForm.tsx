"use client";

import { CartContext } from "@/app/_context/CartContext";
import { DaterangeContext } from "@/app/_context/DaterangeContext";
import { differenceInDays } from "date-fns";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { addToCartFunction, removeFromCartFunction } from "./cartFunction";
import Link from "next/link";

type Props = {};

export default function CartForm({}: Props) {
  const { cart, setCart } = useContext(CartContext);
  const { daterange } = useContext(DaterangeContext);
  const [numberOfDays, setNumberOfDays] = useState<number>(1);

  async function GetAdditions() {
    let response = await fetch(
      process.env.STRAPI +
        "/api/items/?populate=*&filters[pricingType][$eq]=product",
      {
        method: "GET",
        mode: "cors",
      }
    );

    const itemsArray: any[] = [];

    const json = await response.json();

    json.data.map((item: any) => {
      itemsArray.push({
        ...item,
        imageUrl: item.coverImage.formats.small.url,
        name: item.name,
        description: item.excerpt,
        id: item.id,
        price: item.basePrice,
        slug: item.slug,
        documentId: item.documentId,
        excerpt: item.excerpt,
      });
    });

    return itemsArray;
  }

  let additions = GetAdditions();

  let saleIndex: number = 0;

  useEffect(() => {
    if (daterange.endIsValid && daterange.startIsValid) {
      const days = differenceInDays(daterange.endDate, daterange.startDate);
      setNumberOfDays(days + 1);
    }
  }, [daterange]);

  if (numberOfDays == 1) {
    saleIndex = 0;
  } else if (numberOfDays <= 7) {
    saleIndex = 0.9;
  } else if (numberOfDays <= 21) {
    saleIndex = 0.85;
  } else if (numberOfDays > 21) {
    saleIndex = 0.8;
  }

  let data: any[] = [];

  if (cart.length > 0) {
    const newData = [...cart];
    const filteredData = Object.groupBy(newData, (item) => item.name);
    const newObject = { ...filteredData };
    const newArray = [...Object.values(newObject)];
    data = newArray;
  }
  let tag: string = "den";
  if (numberOfDays == 1) {
    tag = "den";
  } else if (numberOfDays <= 4) {
    tag = "dny";
  } else if (numberOfDays > 4) {
    tag = "dní";
  }

  let wholePrice: number = 0;

  let wholeDeposit: number = 0;

  cart.map((item) => {
    wholePrice = wholePrice + item.basePrice * numberOfDays;

    wholeDeposit = wholeDeposit + item.deposit * 1;
  });

  let wholePriceAfterSale: number = wholePrice * saleIndex;
  let payNowPrice: number = wholePriceAfterSale * 0.1;
  let sale: number = Math.trunc((1 - saleIndex) * 100);

  function CartTab(group: any) {
    let data = group.group;
    let item = data[0];
    const price = Number(item.basePrice);

    let groupPrice = data.length * price * saleIndex * numberOfDays;

    return (
      <>
        <div className="grid grid-cols-[5fr_1fr_1fr] items-center gap-3 border-b first:border-t border-borderGray py-3 justify-between">
          <div className="flex items-center gap-5">
            <Image
              src={process.env.STRAPI + item.coverImage.formats.thumbnail.url}
              width={200}
              height={300}
              alt={"thumbnail-" + data.name}
              className="w-20 h-20 object-cover object-center rounded-md"
            />
            <p className="text-lg font-semibold">{item.name}</p>
          </div>
          <div className="w-20 h-20 border border-borderGray rounded-md grid grid-cols-[2fr_1fr] items-center justify-items-center p-2 justify-self-end">
            <p className="text-lg">{data.length}</p>
            <div className="self-stretch flex flex-col justify-evenly">
              <FaChevronUp
                className="cursor-pointer hover:bg-zinc-100 p-1 rounded-sm text-xl"
                onClick={() => {
                  addToCartFunction(cart, setCart, item);
                }}
              />
              <FaChevronDown
                onClick={() => {
                  removeFromCartFunction(cart, setCart, item);
                }}
                className="cursor-pointer hover:bg-zinc-100 p-1 rounded-sm text-xl"
              />
            </div>
          </div>
          <div className="flex items-center gap-5 justify-self-end">
            <p className="font-semibold text-textSecondary">
              <span className="text-lg font-semibold text-primary">
                {groupPrice} Kč
              </span>{" "}
            </p>
          </div>
        </div>
      </>
    );
  }

  function AdditionsTab(group: any) {
    let data = group.group;
    let item = data[0];
    const price = Number(item.basePrice);

    let groupPrice = data.length * price * saleIndex * numberOfDays;

    return (
      <>
        <div className="grid grid-cols-[5fr_1fr_1fr] items-center gap-3 border-b first:border-t border-borderGray py-3 justify-between">
          <div className="flex items-center gap-5">
            <Image
              src={process.env.STRAPI + item.coverImage.formats.thumbnail.url}
              width={200}
              height={300}
              alt={"thumbnail-" + data.name}
              className="w-20 h-20 object-cover object-center rounded-md"
            />
            <p className="text-lg font-semibold">{item.name}</p>
          </div>
          <div className="w-20 h-20 border border-borderGray rounded-md grid grid-cols-[2fr_1fr] items-center justify-items-center p-2 justify-self-end">
            <p className="text-lg">{data.length}</p>
            <div className="self-stretch flex flex-col justify-evenly">
              <FaChevronUp
                className="cursor-pointer hover:bg-zinc-100 p-1 rounded-sm text-xl"
                onClick={() => {
                  addToCartFunction(cart, setCart, item);
                }}
              />
              <FaChevronDown
                onClick={() => {
                  removeFromCartFunction(cart, setCart, item);
                }}
                className="cursor-pointer hover:bg-zinc-100 p-1 rounded-sm text-xl"
              />
            </div>
          </div>
          <div className="flex items-center gap-5 justify-self-end">
            <p className="font-semibold text-textSecondary">
              <span className="text-lg font-semibold text-primary">
                {groupPrice} Kč
              </span>{" "}
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mt-10 w-full max-w-wrapper border p-5 rounded-lg border-borderGray">
        <div className="grid grid-cols-[5fr_1fr_1fr] items-start gap-3 border-borderGray py-5 justify-between">
          <p className="text-end font-semibold col-start-1 justify-self-start">
            Technika
          </p>
          <p className="text-end font-semibold col-start-2">Množství</p>
          <p className="text-end font-semibold col-start-3">
            Celková cena {"(vč. DPH)"} za {numberOfDays} {tag}
          </p>
        </div>
        <div className="grid">
          {data.map((group) => {
            return <CartTab group={group} />;
          })}
        </div>

        <div className="grid grid-cols-[5fr_1fr_1fr] border-b items-center gap-3 border-borderGray py-5 justify-between">
          <p className="text-end font-semibold col-start-1 justify-self-start">
            Celková cena za pronájem před slevou
          </p>
          <div className="col-start-2 col-span-2">
            <p className="text-end text-base font-semibold">
              Celková cena {"(vč. DPH)"} za {numberOfDays} {tag} je {""}
              <span className="text-xl font-semibold text-primary">
                {wholePrice} Kč
              </span>{" "}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-[5fr_1fr_1fr] border-b items-center gap-3 border-borderGray py-5 justify-between">
          <p className="text-end font-semibold col-start-1 justify-self-start">
            Celková sleva
          </p>
          <div className="col-start-2 col-span-2">
            <p className="text-end text-base font-semibold">
              Sleva za {numberOfDays} {tag} je {""}
              <span className="text-xl font-semibold text-primary">
                {sale} %
              </span>{" "}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-[5fr_1fr_1fr] items-center gap-3 border-borderGray py-5 justify-between">
          <p className="text-end font-semibold text-xl col-start-1 justify-self-start">
            Celková cena za pronájem po slevě
          </p>
          <div className="col-start-2 col-span-2">
            <p className="text-end text-base font-semibold">
              Celková cena {"(vč. DPH)"} za {numberOfDays} {tag} je {""}
              <span className="text-xl font-semibold text-primary">
                {wholePriceAfterSale} Kč
              </span>{" "}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-[5fr_1fr_1fr] items-center gap-3 border-borderGray py-5 justify-between ">
          <p className="text-end font-semibold col-start-1 justify-self-start">
            Při objednání je splatných 10 % z ceny
          </p>
          <div className="col-start-2 col-span-2">
            <p className="text-end text-base font-semibold">
              Teď zaplatíte {""}
              <span className="text-xl font-semibold text-primary">
                {payNowPrice} Kč
              </span>{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10 w-full max-w-wrapper">
        {" "}
        <div className="grid items-center py-5 justify-between rounded-lg">
          <h4 className="">Záloha</h4>
          <p className="mt-3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
            placeat, cupiditate, pariatur deleniti neque itaque quisquam
            recusandae dolore quo illum assumenda quam est excepturi eaque
            perspiciatis iure tempora, amet fugit!
          </p>
        </div>
        <div className="grid grid-cols-[5fr_1fr_1fr] items-center gap-3 border-borderGray py-5 justify-between border p-5 rounded-lg">
          <p className="text-end font-semibold col-start-1 justify-self-start">
            Záloha splatná při převzetí
          </p>
          <div className="col-start-2 col-span-2">
            <p className="text-end font-semibold">
              Celková záloha za zboží je {""}
              <span className="text-lg font-semibold text-primary">
                {wholeDeposit} Kč
              </span>{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10 w-full max-w-wrapper">
        <h4 className="mb-5">Objednávkový formulář</h4>
        <form className="border border-borderGray rounded-lg p-10 grid grid-cols-2 gap-10">
          <div>
            <h5 className="mb-3">Předávací informace</h5>
            <p className="border-b pb-3 border-borderGray mb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              assumenda nemo laudantium? Id similique exercitationem odit
              dolores voluptatum delectus, eos provident quo, saepe ex ad
              adipisci officiis, cum commodi sit?
            </p>
            <div className="grid grid-cols-2 gap-y-3 gap-x-3">
              <div className="flex flex-col">
                <label className="">Ulice</label>
                <input
                  type="text"
                  className="border border-borderGray p-1 rounded-md"
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="">č.p.</label>
                <input
                  type="text"
                  className="border border-borderGray p-1 rounded-md"
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="">Město</label>
                <input
                  type="text"
                  className="border border-borderGray p-1 rounded-md"
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="">PSČ</label>
                <input
                  type="text"
                  className="border border-borderGray p-1 rounded-md"
                ></input>
              </div>
            </div>
          </div>
          <div className="">
            <h5 className="mb-3">Fakturační informace</h5>
            <p className="border-b pb-3 border-borderGray mb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              assumenda nemo laudantium? Id similique exercitationem odit
              dolores voluptatum delectus, eos provident quo, saepe ex ad
              adipisci officiis, cum commodi sit?
            </p>
            <div className="grid grid-cols-2 gap-y-3 gap-x-3 mb-8">
              <h6 className="col-span-2">Kontaktní údaje</h6>
              <div className="flex flex-col">
                <label className="">Jméno</label>
                <input
                  type="text"
                  className="border border-borderGray p-1 rounded-md"
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="">Příjmení</label>
                <input
                  type="text"
                  className="border border-borderGray p-1 rounded-md"
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="">Telefon</label>
                <input
                  type="text"
                  className="border border-borderGray p-1 rounded-md"
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="">Email</label>
                <input
                  type="text"
                  className="border border-borderGray p-1 rounded-md"
                ></input>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-y-3 gap-x-3 mb-8">
              <h6 className="col-span-2">Adresa</h6>
              <div className="flex flex-col">
                <label className="">Ulice</label>
                <input
                  type="text"
                  className="border border-borderGray p-1 rounded-md"
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="">č.p.</label>
                <input
                  type="text"
                  className="border border-borderGray p-1 rounded-md"
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="">Město</label>
                <input
                  type="text"
                  className="border border-borderGray p-1 rounded-md"
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="">PSČ</label>
                <input
                  type="text"
                  className="border border-borderGray p-1 rounded-md"
                ></input>
              </div>
            </div>
          </div>
          <div className="col-span-2 items-center gap-5 flex justify-self-center text-start max-w-[600px] border p-5 rounded-lg border-borderGray">
            <input
              type="checkbox"
              className="border border-borderGray p-1 rounded-md"
            ></input>
            <p className="">
              Souhlasím s{" "}
              <Link
                href={"/obchodni-podminky"}
                className="text-primary font-semibold"
              >
                Obchodními podmínkami
              </Link>{" "}
              a{" "}
              <Link href={"/gdpr"} className="text-primary font-semibold">
                Podmínkami ochrany osobních údajů
              </Link>
              .
            </p>
          </div>
          <button className="buttonSmall justify-self-stretch col-span-2">
            Přejít k platbě a objednat
          </button>
          <p className="col-span-2 justify-self-center text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            illo temporibus inventore, delectus veritatis excepturi cupiditate
            accusantium ea natus! Doloremque temporibus vero rem necessitatibus
            unde nostrum ipsa deleniti deserunt sapiente!
          </p>
        </form>
      </div>
    </>
  );
}
