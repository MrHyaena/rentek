"use client";

import { CartContext } from "@/app/_context/CartContext";
import { DaterangeContext } from "@/app/_context/DaterangeContext";
import { differenceInDays, format } from "date-fns";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { addToCartFunction, removeFromCartFunction } from "./cartFunction";
import Link from "next/link";
import DatepickerBig from "../Datepickers/DatepickerBig";
import arraySort from "array-sort";
import DatepickerSmall from "../Datepickers/DatepickerSmall";

type Props = {
  newAdditions: any[];
};

export default function CartForm({ newAdditions }: Props) {
  const { cart, setCart } = useContext(CartContext);
  const { daterange } = useContext(DaterangeContext);
  const [numberOfDays, setNumberOfDays] = useState<number>(1);
  const [additions, setAdditions] = useState<any[]>(newAdditions);

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

  useEffect(() => {
    let localAdditions = localStorage.getItem("additionsCart");
    console.log(localAdditions);
    if (localAdditions != null) {
      const newArray = JSON.parse(localAdditions);
      setAdditions([...newArray]);
    }
  }, []);

  let data: any[] = [];

  if (cart.length > 0) {
    const newData = [...cart];
    const filteredData = Object.groupBy(newData, (item) => item.name);
    const newObject: any = { ...filteredData };
    const objectArray: any[] = [];
    for (const property in newObject) {
      let newItem = {
        count: newObject[property].length,
        item: newObject[property][0],
      };
      objectArray.push(newItem);
    }

    data = arraySort(objectArray, "item.name");
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

  let wholeProductPrice: number = 0;

  additions.map((item) => {
    wholeProductPrice = wholeProductPrice + item.item.basePrice * item.count;
  });

  cart.map((item) => {
    wholePrice = wholePrice + item.basePrice * numberOfDays;

    wholeDeposit = wholeDeposit + item.deposit * 1;
  });

  let wholePriceAfterSale: number = wholePrice * saleIndex + wholeProductPrice;
  let payNowPrice: number = wholePriceAfterSale * 0.1;
  let sale: number = Math.trunc((1 - saleIndex) * 100);

  function CartTab(product: any) {
    const newProduct = product.product;
    let item = newProduct.item;
    const price = Number(item.basePrice);

    let groupPrice = newProduct.count * price * numberOfDays;

    return (
      <>
        <div className="grid grid-cols-[4fr_1fr_1fr] items-center gap-3 border-b first:border-t border-borderGray py-3 justify-between">
          <div className="flex items-center gap-5">
            <Image
              src={process.env.STRAPI + item.coverImage.formats.thumbnail.url}
              width={200}
              height={300}
              alt={"thumbnail-" + item.name}
              className="w-20 h-20 object-cover object-center rounded-md"
            />
            <Link
              href={`/produkt/${item.documentId}`}
              className="text-lg font-semibold"
            >
              {item.name}
            </Link>
          </div>
          <div className="w-20 h-20 border border-borderGray rounded-md grid grid-cols-[2fr_1fr] items-center justify-items-center p-2 justify-self-end">
            <p className="text-lg">{newProduct.count}</p>
            <div className="self-stretch flex flex-col justify-evenly">
              <FaChevronUp
                className="cursor-pointer hover:bg-zinc-100 p-1 rounded-sm text-xl select-none"
                onClick={() => {
                  addToCartFunction(cart, setCart, item);
                }}
              />
              <FaChevronDown
                onClick={() => {
                  removeFromCartFunction(cart, setCart, item);
                }}
                className="cursor-pointer hover:bg-zinc-100 p-1 rounded-sm text-xl select-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-5 justify-self-end">
            <p className="flex items-end flex-col font-semibold text-textSecondary">
              <span className="text-sm font-semibold text-textSecondary">
                Před slevou{" "}
                <span className="text-primaryHover">{groupPrice}</span> Kč
              </span>{" "}
              <span className="text-lg font-semibold text-textSecondary">
                Po slevě{" "}
                <span className="text-primary">{groupPrice * saleIndex}</span>{" "}
                Kč
              </span>{" "}
            </p>
          </div>
        </div>
      </>
    );
  }

  function AdditionsTab(product: any) {
    const newProduct = product.product;
    const item = newProduct.item;
    const price = Number(item.basePrice);
    console.log(price);

    let groupPrice = newProduct.count * price;

    function AddToAdditionsCart() {
      const productIndex = additions.findIndex(
        (newItem) => newItem.item.name == item.name
      );
      const newProduct = additions[productIndex];
      newProduct.count = newProduct.count + 1;
      const newArray = additions;
      newArray[productIndex] == newProduct;
      setAdditions([...newArray]);
      localStorage.setItem("additionsCart", JSON.stringify(newArray));
    }

    function RemoveFromAdditionsCart() {
      const productIndex = additions.findIndex(
        (newItem) => newItem.item.name == item.name
      );
      const newProduct = additions[productIndex];
      if (newProduct.count > 0) {
        newProduct.count = newProduct.count - 1;
      }
      const newArray = additions;
      newArray[productIndex] == newProduct;
      setAdditions([...newArray]);
      localStorage.setItem("additionsCart", JSON.stringify(newArray));
    }

    return (
      <>
        <div className="grid grid-cols-[4fr_1fr_1fr] items-center gap-3 border-b first:border-t border-borderGray py-3 justify-between">
          <div className="flex items-center gap-5">
            <Image
              src={process.env.STRAPI + item.coverImage.formats.thumbnail.url}
              width={200}
              height={300}
              alt={"thumbnail-" + item.name}
              className="w-20 h-20 object-cover object-center rounded-md"
            />
            <Link
              href={`/produkt/${item.documentId}`}
              className="text-lg font-semibold"
            >
              {item.name}
            </Link>
          </div>
          <div className="w-20 h-20 bg-white border border-borderGray rounded-md grid grid-cols-[2fr_1fr] items-center justify-items-center p-2 justify-self-end">
            <p className="text-lg">{newProduct.count}</p>
            <div className="self-stretch flex flex-col justify-evenly">
              <FaChevronUp
                className="cursor-pointer hover:bg-zinc-100 p-1 rounded-sm text-xl select-none"
                onClick={() => {
                  AddToAdditionsCart();
                }}
              />
              <FaChevronDown
                onClick={() => {
                  RemoveFromAdditionsCart();
                }}
                className="cursor-pointer hover:bg-zinc-100 p-1 rounded-sm text-xl select-none"
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

  function FormTextInput({ text, name }: { text: string; name: string }) {
    return (
      <div className="flex flex-col">
        <label className="">{text}</label>
        <input
          name={name}
          type="text"
          className="border border-borderGray p-1 rounded-sm"
        ></input>
      </div>
    );
  }

  return (
    <>
      <div className="mt-10 w-full max-w-wrapper border p-5 rounded-lg border-borderGray">
        <div className="grid grid-cols-[4fr_1fr_1fr] items-start gap-3 border-borderGray py-5 justify-between">
          <p className="text-end font-semibold col-start-1 justify-self-start">
            Technika
          </p>
          <p className="text-end font-semibold col-start-2">Množství</p>
          <p className="text-end font-semibold col-start-3">
            Celková cena {"(vč. DPH)"} <br />
            za {numberOfDays} {tag}
          </p>
        </div>
        <div className="grid">
          {data.map((product) => {
            return <CartTab product={product} />;
          })}
        </div>
        <div className="grid grid-cols-[4fr_1fr_1fr] border-b items-center gap-3 border-borderGray py-5 justify-between border p-10 rounded-lg mt-10 bg-zinc-50">
          <p className="text-2xl font-semibold">Doplňkové produkty</p>
          <p className="text-start font-semibold col-start-1 justify-self-start">
            Klienti u nás často objednávají i následující produkty. Všechny tyto
            produkty vám již po nákupu zůstanou.
            <br />
            <span className="text-primaryHover">
              Na tento typ zboží se slevy neuplatňují.
            </span>
          </p>
          <div className="col-start-2 col-span-2">
            <p className="text-end text-base font-semibold">
              Jednotková cena {"(vč. DPH)"}
            </p>
          </div>
          <div className="grid col-span-3">
            {additions.map((product) => {
              return <AdditionsTab product={product} />;
            })}
          </div>
        </div>
        <div className="md:grid grid-cols-[5fr_1fr_1fr] border-b items-center gap-3 border-borderGray py-5 justify-between">
          <p className="text-end font-semibold col-start-1 md:justify-self-start">
            Celková cena za pronájem před slevou
          </p>
          <div className="col-start-2 col-span-2">
            <p className="text-end text-sm font-semibold">
              Celková cena {"(vč. DPH)"} za {numberOfDays} {tag} je {""}
              <span className="text-base font-semibold text-primary">
                {wholePrice} Kč
              </span>{" "}
            </p>
          </div>
        </div>
        <div className="md:grid grid-cols-[5fr_1fr_1fr] border-b items-center gap-3 border-borderGray py-5 justify-between">
          <p className="text-end text-base font-semibold col-start-1 md:justify-self-start">
            Celková procentní sleva
          </p>
          <div className="col-start-2 col-span-2">
            <p className="text-end text-sm font-semibold">
              Sleva za {numberOfDays} {tag} je {""}
              <span className="text-base font-semibold text-primary">
                {sale} %
              </span>{" "}
            </p>
          </div>
        </div>
        <div className="md:grid grid-cols-[5fr_1fr_1fr] border-b items-center gap-3 border-borderGray py-5 justify-between">
          <p className="text-end text-base font-semibold col-start-1 md:justify-self-start">
            Celková cena za jednorázové zboží
          </p>
          <div className="col-start-2 col-span-2">
            <p className="text-end text-sm font-semibold">
              Celková cena (vč. DPH){" "}
              <span className="text-base font-semibold text-primary">
                {wholeProductPrice} Kč
              </span>{" "}
            </p>
          </div>
        </div>
        <div className="md:grid grid-cols-[5fr_1fr_1fr] items-center gap-3 border-borderGray py-5 justify-between">
          <p className="text-end font-semibold md:text-xl col-start-1 justify-self-start rounded-md">
            Výsledná cena za pronájem po slevě a jednorázové produkty
          </p>
          <div className="col-start-2 col-span-2">
            <p className="text-end md:text-lg md:font-semibold mt-4 md:mt-0">
              Výsledna cena {"(vč. DPH)"} za {numberOfDays} {tag} je {""}
              <span className="text-xl font-semibold text-primary">
                {wholePriceAfterSale} Kč
              </span>{" "}
            </p>
          </div>
        </div>
        <div className="md:grid grid-cols-[5fr_1fr_1fr] items-center gap-3 border-borderGray py-5 justify-between ">
          <p className="text-end font-semibold col-start-1 md:justify-self-start">
            Při objednání je splatných 10 % z ceny
          </p>
          <div className="col-start-2 col-span-2">
            <p className="text-end text-base md:font-semibold">
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
        <div className="md:grid grid-cols-[5fr_1fr_1fr] items-center gap-3 border-borderGray py-5 justify-between border p-5 rounded-lg">
          <p className="text-end font-semibold col-start-1 md:justify-self-start">
            Záloha splatná při převzetí
          </p>
          <div className="col-start-2 col-span-2">
            <p className="text-end md:font-semibold">
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
        <form className="border border-borderGray rounded-lg p-10 md:grid flex flex-col grid-cols-2 gap-10">
          <div className="flex flex-col justify-start h-full">
            <div>
              <h5 className="mb-3">Předávací informace</h5>
              <p className="border-b pb-3 border-borderGray mb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas assumenda nemo laudantium? Id similique exercitationem
                odit dolores voluptatum delectus, eos provident quo, saepe ex ad
                adipisci officiis, cum commodi sit?
              </p>
            </div>
            <div className="grid grid-cols-2 gap-y-3 gap-x-3 mb-8">
              <h6 className="col-span-2">Doručovací adresa</h6>

              <FormTextInput text="Ulice" name="ulice" />
              <FormTextInput text="č.p" name="cp" />
              <FormTextInput text="Město" name="mesto" />
              <FormTextInput text="PSČ" name="psc" />
            </div>
            <div className="border justify-self-end border-borderGray rounded-md p-5">
              <h5 className="col-span-2 mb-4">Čas a datum doručení</h5>
              <p className="text-lg">
                Techniku budete mít vypůjčenou v období:{" "}
              </p>
              <p className="text-lg">
                Od{" "}
                <span className="font-semibold">
                  {format(daterange.startDate, "dd.MM.yyyy hh:mm")}
                </span>{" "}
                do{" "}
                <span className="font-semibold">
                  {format(daterange.endDate, "dd.MM.yyyy hh:mm")}
                </span>{" "}
              </p>
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
              <FormTextInput text="Jméno" name="jmeno" />
              <FormTextInput text="Příjmení" name="prijmeni" />
              <FormTextInput text="Telefon" name="telefon" />
              <FormTextInput text="Email" name="email" />
            </div>
            <div className="grid grid-cols-2 gap-y-3 gap-x-3 mb-8">
              <h6 className="col-span-2">Adresa</h6>
              <FormTextInput text="Ulice" name="fakturaUlice" />
              <FormTextInput text="č.p." name="fakturaCp" />
              <FormTextInput text="Město" name="fakturaMesto" />
              <FormTextInput text="PSČ" name="fakturaPsc" />
            </div>
          </div>
          <div className="col-span-2 items-center gap-5 flex justify-self-center text-start max-w-[600px] border p-5 rounded-lg border-borderGray">
            <input
              value="true"
              name="podminky"
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
