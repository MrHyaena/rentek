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
import { permanentRedirect, redirect } from "next/navigation";

type Props = {
  newAdditions: any[];
};

export default function CartForm({ newAdditions }: Props) {
  const { cart, setCart } = useContext(CartContext);
  const { daterange, numberOfDays, setNumberOfDays, saleIndex } =
    useContext(DaterangeContext);
  const [additions, setAdditions] = useState<any[]>(newAdditions);
  const [priceDetailsToggle, setPriceDetailsToggle] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const localAdditions = localStorage.getItem("additionsCart");
    if (localAdditions != null) {
      const newArray = JSON.parse(localAdditions);
      setAdditions([...newArray]);
    }
  }, []);

  let tag: string = "den";
  if (numberOfDays == 1) {
    tag = "den";
  } else if (numberOfDays <= 4) {
    tag = "dny";
  } else if (numberOfDays > 4) {
    tag = "dní";
  }

  let rentalPrice: number = 0;

  let wholeDeposit: number = 0;

  let wholeProductPrice: number = 0;

  additions.map((item) => {
    wholeProductPrice = wholeProductPrice + item.item.basePrice * item.count;
  });

  cart.map((item) => {
    rentalPrice = rentalPrice + item.item.basePrice * numberOfDays * item.count;

    wholeDeposit = wholeDeposit + item.item.deposit * 1;
  });
  const wholePrice: number = rentalPrice + wholeProductPrice;

  const rentalPriceAfterSale: number = rentalPrice * saleIndex;
  const wholePriceAfterSale: number = rentalPriceAfterSale + wholeProductPrice;
  const payNowPrice: number = wholePriceAfterSale * 0.1;
  const sale: number = Math.trunc(100 - saleIndex * 100);

  function CartTab({ product }: { product: any }) {
    console.log(product);
    const wholeItem = product;
    const item = wholeItem.item;
    const price: any = new Number(item.basePrice);
    const groupPrice = wholeItem.count * price * numberOfDays;
    console.log(price);

    return (
      <>
        <div className="flex flex-col border overflow-hidden rounded-lg border-borderGray">
          <div className="flex items-center gap-5 p-2 border-b border-borderGray">
            <div className="md:w-16 md:h-16 w-10 h-10 flex items-center justify-center p-1">
              <Image
                src={item.coverImage.formats.thumbnail.url}
                width={200}
                height={300}
                alt={"thumbnail-" + item.name}
                className=""
              />
            </div>
            <Link
              href={`/produkt/${item.documentId}`}
              className="md:text-base font-semibold"
            >
              {item.name}
            </Link>
          </div>
          <div className="flex gap-3 justify-between w-full bg-zinc-100 p-2">
            <div className="flex items-center gap-3">
              <FaChevronDown
                onClick={() => {
                  removeFromCartFunction(cart, setCart, item);
                }}
                className="cursor-pointer bg-white p-1 rounded-full text-2xl text-textSecondary select-none"
              />
              <p className="text-lg">{wholeItem.count}</p>
              <FaChevronUp
                className="cursor-pointer bg-white p-1 rounded-full text-2xl text-textSecondary select-none"
                onClick={() => {
                  addToCartFunction(cart, setCart, item);
                }}
              />
            </div>
            <div className=" items-center gap-5 justify-self-end hidden md:flex">
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
            <div className="flex items-center gap-5 justify-self-end md:hidden">
              <p className="flex gap-1 items-end font-semibold text-textSecondary">
                <span className="text-primary">{groupPrice * saleIndex}</span>{" "}
                Kč
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  function AdditionsTab({ product }: { product: any }) {
    const newProduct = product;
    const item = newProduct.item;
    const price = Number(item.basePrice);

    const groupPrice = newProduct.count * price;

    function AddToAdditionsCart() {
      const productIndex = additions.findIndex(
        (newItem) => newItem.item.name == item.name
      );
      const newProduct = additions[productIndex];
      newProduct.count = newProduct.count + 1;
      const newArray = additions;
      newArray[productIndex] = newProduct;
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
      newArray[productIndex] = newProduct;
      setAdditions([...newArray]);
      localStorage.setItem("additionsCart", JSON.stringify(newArray));
    }

    return (
      <>
        <div className="flex flex-col border overflow-hidden rounded-lg border-borderGray">
          <div className="flex items-center gap-5 p-2 border-b border-borderGray bg-white">
            <div className="md:w-16 md:h-16 w-10 h-10 flex items-center justify-center p-1">
              <Image
                src={item.coverImage.formats.thumbnail.url}
                width={200}
                height={300}
                alt={"thumbnail-" + item.name}
                className=""
              />
            </div>
            <Link
              href={`/produkt/${item.documentId}`}
              className="md:text-base font-semibold"
            >
              {item.name}
            </Link>
          </div>
          <div className="flex gap-3 justify-between w-full bg-zinc-100 p-2">
            <div className="flex items-center gap-3">
              <FaChevronDown
                onClick={() => {
                  RemoveFromAdditionsCart();
                }}
                className="cursor-pointer bg-white p-1 rounded-full text-2xl text-textSecondary select-none"
              />
              <p className="text-lg">{newProduct.count}</p>
              <FaChevronUp
                className="cursor-pointer bg-white p-1 rounded-full text-2xl text-textSecondary select-none"
                onClick={() => {
                  AddToAdditionsCart();
                }}
              />
            </div>
            <div className=" items-center gap-5 justify-self-end hidden md:flex">
              <p className="flex items-end flex-col font-semibold text-textSecondary">
                <span className="text-lg font-semibold text-textSecondary">
                  <span className="text-primary">{groupPrice}</span> Kč
                </span>{" "}
              </p>
            </div>
            <div className="flex items-center gap-5 justify-self-end md:hidden">
              <p className="flex gap-1 items-end font-semibold text-textSecondary">
                <span className="text-primary">{groupPrice}</span> Kč
              </p>
            </div>
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
          required={true}
          name={name}
          type="text"
          className="border border-borderGray p-1 rounded-sm"
        ></input>
      </div>
    );
  }

  async function SubmitOrder(e: any) {
    const rentalItems = cart;
    const additionalItems = additions;

    const formData = new FormData(e);
    const orderInformation = {
      dateRange: {
        startDate: daterange.startDate,
        endDate: daterange.endDate,
      },
      contact: {
        jmeno: formData.get("jmeno"),
        prijmeni: formData.get("prijmeni"),
        telefon: formData.get("telefon"),
        email: formData.get("email"),
      },
      deliveryAddress: {
        ulice: formData.get("ulice"),
        cp: formData.get("cp"),
        mesto: formData.get("mesto"),
        psc: formData.get("psc"),
      },
    };

    const order: {
      orderInformation: {
        dateRange: any;
        contact: any;
        deliveryAddress: any;
      };
      rentalItems: any;
      additionalItems: any;
      payNowPrice: any;
    } = {
      orderInformation: orderInformation,
      rentalItems: rentalItems,
      additionalItems: additionalItems,
      payNowPrice: payNowPrice,
    };

    const agreement = formData.get("podminky");
    console.log(agreement);

    const stripeResponse = await fetch(
      process.env.STRAPI + "/api/stripe/checkout",
      {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
          ...order,
          wholeDeposit,
          wholePrice,
          payNowPrice,
          wholePriceAfterSale,
          saleIndex,
          agreement,
          numberOfDays,
        }),
      }
    );

    if (!stripeResponse.ok) {
      const stripeResponseJson = await stripeResponse.json();
      console.log(stripeResponseJson);

      setError(stripeResponseJson.error);
    }

    if (stripeResponse.ok) {
      const json = await stripeResponse.json();
      const url = json.url;
      console.log(url);
      window.location.href = url;
    }
  }

  return (
    <>
      {cart.length != 0 ? (
        <>
          {" "}
          <div className="w-full max-w-wrapper flex flex-col gap-5">
            <p className="">
              Níže můžete vidět všechno vybrané zboží. Abychom předešli zahlcení
              našich služeb z nekalých důvodů, vyžadujeme při objednání vždy
              zaplatit 5 procent z ceny celkové objednávky. O tuto částku se
              samozřejmě při převzetí sníží celková doplácená suma.
            </p>{" "}
          </div>
          <div className="mt-10 w-full max-w-wrapper border md:p-5 p-2 rounded-lg border-borderGray">
            <div className="grid grid-cols-[2fr_1fr] items-start gap-3 border-borderGray py-5 justify-between">
              <p className="text-end font-semibold col-start-1 justify-self-start">
                Technika
              </p>
              <div className="flex justify-end">
                <p className="text-end font-semibold col-start-3">
                  Celková cena <br />
                  za {numberOfDays} {tag} {"(vč. DPH)"}
                </p>
              </div>
            </div>
            <div className="grid gap-3">
              {cart.map((product) => {
                if (cart) {
                  return (
                    <CartTab
                      product={product}
                      key={"cartItemTab" + product.item.name}
                    />
                  );
                }
              })}
            </div>
            {newAdditions.length > 0 && (
              <div className="grid grid-cols-2 border-b items-center gap-3 border-borderGray py-5 justify-between border md:p-10 p-2 rounded-lg mt-10 ">
                <div className="col-span-3 flex flex-col gap-2 md:gap-0">
                  <h5 className="text-xl font-semibold mb-2">
                    Doplňkové jednorázové produkty
                  </h5>
                  <p className="text-start col-start-1 justify-self-start">
                    Klienti u nás často objednávají i následující produkty.
                    Všechny tyto produkty vám již po nákupu zůstanou.
                  </p>
                  <p className="text-primaryHover font-semibold">
                    Na tento typ zboží se slevy neuplatňují.
                  </p>
                </div>
                <p className="font-semibold hidden md:block">Produkty</p>
                <p className="text-end text-base font-semibold hidden md:block">
                  Jednotková cena {"(vč. DPH)"}
                </p>
                <div className="col-start-2 col-span-2"></div>
                <div className="grid gap-3 col-span-3">
                  {additions.map((product) => {
                    return (
                      <AdditionsTab
                        product={product}
                        key={"cartAdditionsTab" + product.item.name}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="mt-10 w-full max-w-wrapper">
            <div className="hidden md:block">
              <DatepickerBig />
            </div>
            <div className="md:hidden">
              <DatepickerSmall />
            </div>
          </div>
          {daterange.endIsValid && daterange.startIsValid ? (
            <>
              <div className="mt-10 w-full max-w-wrapper">
                {" "}
                <div className="grid items-center py-5 justify-between rounded-lg">
                  <h4 className="">Výsledná cena</h4>
                  <p className="mt-3">
                    Zde můžete vidět celkovou cenu za pronajaté zboží, doplňkové
                    produkty a další služby. Částka splatná při objednání má
                    funkci rezervačního poplatku a považuje se obecně za
                    nevratnou.{" "}
                    <span className="font-semibold">
                      Tuto částku samozřejmě odečteme od konečného doplatku.
                    </span>
                  </p>
                </div>
                <div className="border p-2 px-5 rounded-lg border-borderGray">
                  <div className="grid grid-cols-2 items-center gap-3 border-borderGray py-5 justify-between">
                    <p className="text-end font-semibold col-start-1 justify-self-start">
                      Detaily ceny
                    </p>
                    <div className="col-start-2 col-span-2 justify-self-end">
                      <button
                        className="text-end text-sm font-semibold buttonSmall"
                        onClick={() => {
                          setPriceDetailsToggle(!priceDetailsToggle);
                        }}
                      >
                        {priceDetailsToggle ? "Zavřit" : "Otevřít"}
                      </button>
                    </div>
                  </div>{" "}
                  {priceDetailsToggle && (
                    <>
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
                        <p className="text-end font-semibold col-start-1 md:justify-self-start">
                          Celková cena za pronájem před slevou
                        </p>
                        <div className="col-start-2 col-span-2">
                          <p className="text-end text-sm font-semibold">
                            Cena {"(vč. DPH)"} za {numberOfDays} {tag} je {""}
                            <span className="text-base font-semibold text-primary">
                              {rentalPrice} Kč
                            </span>{" "}
                          </p>
                        </div>
                      </div>
                      <div className="md:grid grid-cols-[5fr_1fr_1fr] border-b items-center gap-3 border-borderGray py-5 justify-between">
                        <p className="text-end font-semibold col-start-1 md:justify-self-start">
                          Celková cena za pronájem po slevě
                        </p>
                        <div className="col-start-2 col-span-2">
                          <p className="text-end text-sm font-semibold">
                            Cena {"(vč. DPH)"} za {numberOfDays} {tag} je {""}
                            <span className="text-base font-semibold text-primary">
                              {rentalPriceAfterSale} Kč
                            </span>{" "}
                          </p>
                        </div>
                      </div>

                      <div className="md:grid grid-cols-[5fr_1fr_1fr] items-center gap-3 border-borderGray py-5 justify-between">
                        <p className="text-end text-base font-semibold col-start-1 md:justify-self-start">
                          Celková cena za jednorázové produkty
                        </p>
                        <div className="col-start-2 col-span-2">
                          <p className="text-end text-sm font-semibold">
                            Cena (vč. DPH){" "}
                            <span className="text-base font-semibold text-primary">
                              {wholeProductPrice} Kč
                            </span>{" "}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="border border-borderGray rounded-lg p-5 mt-3">
                  <div className="md:grid grid-cols-2 items-center gap-3 border-borderGray py-5 justify-between ">
                    <p className="text-end font-semibold col-start-1 md:justify-self-start">
                      Výsledná cena za objednávku
                    </p>
                    <div className="col-start-2 col-span-2">
                      <p className="text-end text-base md:font-semibold">
                        Cena {"(vč. DPH)"} za {numberOfDays} {tag} je {""}
                        <span className="text-xl font-semibold text-primary">
                          {wholePriceAfterSale} Kč
                        </span>{" "}
                      </p>
                    </div>
                  </div>
                  <div className="md:grid grid-cols-2 items-center gap-3 border-borderGray py-5 justify-between ">
                    <p className="text-end font-semibold col-start-1 md:justify-self-start">
                      Při objednání je splatných 10 % z celkové ceny
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
              </div>
              <div className="mt-10 w-full max-w-wrapper">
                {" "}
                <div className="grid items-center py-5 justify-between rounded-lg">
                  <h4 className="">Záloha</h4>
                  <p className="mt-3">
                    Za každé pronajímané zboží vybíráme při převzetí zálohu,
                    která slouží k případnému pokrytí škod způsobených
                    zákazníkem mimo běžné opotřebení nebo případné čištění.
                  </p>
                  <p className="mt-3">
                    Pravidelní a spolehliví zákazníci zálohu platit nemusejí.
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
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    SubmitOrder(e.target);
                  }}
                  className="border border-borderGray rounded-lg md:p-10 p-3 py-5 flex flex-col items-stretch gap-10"
                >
                  <div className="flex flex-col justify-start h-full">
                    <div>
                      <h5 className="mb-3">Doručovací adresa</h5>
                      <p className=" pb-3 border-borderGray mb-5">
                        Na tuto adresu Vám budeme techniku doručovat. Z této
                        adresy budeme také zboží vyzvedávat.
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-y-3 gap-x-3 mb-8">
                      <FormTextInput text="Ulice" name="ulice" />
                      <FormTextInput text="č.p" name="cp" />
                      <FormTextInput text="Město" name="mesto" />
                      <FormTextInput text="PSČ" name="psc" />
                    </div>

                    <div>
                      <h5 className="mb-3">Kontaktní informace</h5>
                      <p className=" pb-3 border-borderGray mb-5">
                        Níže zadejte údaje, skrze které s vámi budeme
                        komunikovat.
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-y-3 gap-x-3 mb-8">
                      <FormTextInput text="Jméno" name="jmeno" />
                      <FormTextInput text="Příjmení" name="prijmeni" />
                      <FormTextInput text="Telefon" name="telefon" />
                      <FormTextInput text="Email" name="email" />
                    </div>
                    <div className=" justify-self-end border-borderGray rounded-md border md:p-5 p-3">
                      <h6 className="col-span-2 mb-4">Čas a datum doručení</h6>

                      <p className="text-base">
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
                  <div className="flex flex-col gap-5 self-center">
                    <label className="col-span-2 items-center gap-5 flex justify-self-center text-start max-w-[600px] border md:p-5 p-3 text-sm rounded-lg border-borderGray">
                      <input
                        required={true}
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
                        <Link
                          href={"/gdpr"}
                          className="text-primary font-semibold"
                        >
                          Podmínkami ochrany osobních údajů
                        </Link>
                        .
                      </p>
                    </label>

                    <button className="buttonSmall justify-self-stretch col-span-2">
                      Přejít k platbě a objednat
                    </button>
                    {error != null && (
                      <>
                        <p className="text-center col-span-2 border-2 rounded-lg border-red-200 text-red-300 justify-self-center px-3 py-1">
                          {error}
                        </p>
                      </>
                    )}
                    <p className="col-span-2 justify-self-center text-center">
                      Po stisknutí tlačítka budete přesměrování na stránku s
                      platební bránou.
                    </p>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <>
              <div className="py-10 flex flex-col gap-5 items-center text-center">
                <h4>Pokud chcete pokračovat, zvolte časové rozmezí výpůjčky</h4>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="w-full max-w-wrapper flex flex-col items-start gap-5">
            <p className="">
              V tuto chvíli zatím v košíku nemáte žádnou techniku. Pokud si
              chcete techniku objednat, nejprve ji do košíku vložte.
            </p>{" "}
            <Link href={"/katalog"} className="buttonSmall">
              Přejít do katalogu
            </Link>
          </div>
        </>
      )}
    </>
  );
}
