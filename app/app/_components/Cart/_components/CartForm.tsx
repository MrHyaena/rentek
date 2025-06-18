"use client";

import { CartContext } from "@/app/_context/CartContext";
import { DaterangeContext } from "@/app/_context/DaterangeContext";
import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";

import { sendGTMEvent } from "@next/third-parties/google";
import Loader from "../../Loaders/_components/Loader";
import { CartTab } from "./CartTab";
import { AdditionsTab } from "./AdditionsTab";
import DatepickerBig from "../../Datepickers/_components/DatepickerBig";
import DatepickerSmall from "../../Datepickers/_components/DatepickerSmall";
import { FormTextInput } from "./FormTextInput";
import { priceData } from "../../Prices/_functions/priceDataFunction.tsx";

type Props = {
  newAdditions: any[];
  timeslots: any;
};

//Component for rendering whole cart if products are there
export default function CartForm({ newAdditions, timeslots }: Props) {
  const { cart, setCart } = useContext(CartContext);
  const { daterange, numberOfDays, setNumberOfDays, saleIndex } =
    useContext(DaterangeContext);

  const [additions, setAdditions] = useState<any[]>(newAdditions);
  const [priceDetailsToggle, setPriceDetailsToggle] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [loader, setLoader] = useState<boolean>(false);

  const [additionsToggle, setAdditionsToggle] = useState<boolean>(false);

  //Getting additional items from localStorage or context
  useEffect(() => {
    const localAdditions = localStorage.getItem("additionsCart");
    if (localAdditions != null) {
      const newArray = JSON.parse(localAdditions);
      setAdditions(newArray);
    }
  }, []);

  //Getting price data
  const {
    rentalPrice,
    wholeDeposit,
    wholeProductPrice,
    wholePrice,
    rentalPriceAfterSale,
    wholePriceAfterSale,
    payNowPrice,
    sale,
    tag,
  } = priceData(numberOfDays, additions, cart, saleIndex);

  //Sumbit order function
  async function SubmitOrder(e: any) {
    //Starts spinning loader
    setLoader(true);

    //Creating Cart data object
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

    //Fetching for stripe checkout
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
      setLoader(false);

      const stripeResponseJson = await stripeResponse.json();

      setError(stripeResponseJson.error);
    }

    if (stripeResponse.ok) {
      const json = await stripeResponse.json();
      const url = json.url;
      sendGTMEvent({ event: "order_created", value: wholePriceAfterSale });

      window.location.href = url;
    }
  }

  return (
    <>
      {cart.length != 0 ? (
        <>
          {" "}
          <Loader shown={loader} text="Zpracováváme vaši objednávku" />
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
              <div className="col-span-3 flex flex-col gap-2 md:gap-0 mb-5">
                <h5 className="text-xl mb-2">Váš košík</h5>
              </div>
              <p className="text-end font-semibold col-start-1 justify-self-start">
                Technika
              </p>
              <div className="flex justify-end">
                <p
                  data-testid="cartDayTag"
                  className="text-end font-semibold col-start-3"
                >
                  Celková cena <br />
                  za {numberOfDays} {tag} {"(vč. DPH)"}
                </p>
              </div>
            </div>
            <div className="grid gap-3">
              {cart.map((product) => {
                return (
                  <CartTab
                    product={product}
                    timeslots={timeslots}
                    key={"cartItemTab" + product.item.name}
                  />
                );
              })}
            </div>
          </div>
          {newAdditions.length > 0 && (
            <div
              data-testid="additionsDiv"
              className="mt-10 w-full max-w-wrapper border md:p-5 p-2 rounded-lg border-borderGray bg-gray-50"
            >
              <div className="flex md:flex-row flex-col  md:justify-between md:items-center md:gap-5">
                <div className="col-span-3 flex flex-col gap-2 md:gap-0 mb-5">
                  <h5 className="text-xl mb-2">Ochranné pomůcky a doplňky</h5>
                  <p className="text-start col-start-1 justify-self-start text-sm">
                    Zákazníci u nás často objednávají i následující zboží.
                    Všechny tyto produkty vám již po nákupu zůstanou.
                  </p>
                  <p className="text-primaryHover font-semibold text-sm">
                    Na tento typ zboží se slevy neuplatňují.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setAdditionsToggle(!additionsToggle);
                  }}
                  className="buttonSmall"
                >
                  {additionsToggle ? "Zavřít" : "Ukázat"}
                </button>
              </div>
              {additionsToggle && (
                <>
                  <div className="flex justify-between py-5">
                    <p className="font-semibold hidden md:block">Produkty</p>
                    <p className="text-end text-base font-semibold hidden md:block">
                      Jednotková cena {"(vč. DPH)"}
                    </p>
                  </div>
                  <div className="col-start-2 col-span-2"></div>
                  <div className="grid gap-3 col-span-3">
                    {additions.map((product) => {
                      return (
                        <AdditionsTab
                          additions={additions}
                          setAdditions={setAdditions}
                          product={product}
                          key={"cartAdditionsTab" + product.item.name}
                        />
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}
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
              <div
                data-testid="cartFormSecondPart"
                className="mt-10 w-full max-w-wrapper"
              >
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
                {" "}
                <div className="grid items-center py-5 justify-between rounded-lg">
                  <h4 className="">Cena za dopravu</h4>
                  <p className="mt-3">
                    Dovážku techniky provádíme zdarma v Praze a okolí, za které
                    bereme 10 km od místa výjezdu. Za každý další kilometr si
                    účtujeme 7 Kč. Celková cena za dopravu se připočítává k
                    celkové částce a je splatná při převzetí.
                  </p>
                  <p className="mt-3">
                    Vzdálenost se počítá od adresy:{" "}
                    <span className="font-semibold">
                      {" "}
                      Víta Nejedlého, 666/18, Praha 3
                    </span>
                  </p>
                  <p className="mt-3">
                    Pokud si chcete vzdálenost spočítat, klikněte na tento{" "}
                    <a
                      className="text-primaryHover font-semibold"
                      href="https://www.google.com/maps/dir/V.+Nejedl%C3%A9ho+666%2F18,+130+00+Praha+3-%C5%BDi%C5%BEkov//@50.0836275,14.4079782,13z/data=!4m8!4m7!1m5!1m1!1s0x470b9499467ac2a9:0x16e073115a63b4d8!2m2!1d14.4492633!2d50.0836348!1m0?entry=ttu&g_ep=EgoyMDI1MDYxNS4wIKXMDSoASAFQAw%3D%3D"
                    >
                      odkaz
                    </a>
                    .
                  </p>
                </div>
                <div className="md:grid grid-cols-[5fr_1fr_1fr] items-center gap-3 border-borderGray py-5 justify-between border p-5 rounded-lg">
                  <p className="text-end font-semibold col-start-1 md:justify-self-start">
                    Cena za každý kilometr nad 10 km od místa výjezdu
                  </p>
                  <div className="col-start-2 col-span-2">
                    <p className="text-end md:font-semibold">
                      Cena za kilometr {""}
                      <span className="text-lg font-semibold text-primary">
                        7 Kč
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

                      <p data-testid="daterangeShown" className="text-base">
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
