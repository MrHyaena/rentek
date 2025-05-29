"use client";

import { CartContext } from "@/app/_context/CartContext";
import { format } from "date-fns";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import Image from "next/image";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

type Props = { [key: string]: any };

export default function OrderSum({}: Props) {
  const [data, setData] = useState<any>(null);
  const [orderId, setOrderId] = useState<any>();
  const params = useSearchParams();
  const { setCart } = useContext(CartContext);

  async function getOrderParams() {
    const orderIdParams = params.get("orderid");
    if (orderIdParams) {
      console.log(orderIdParams);
      const orderResponse = await fetch(
        process.env.STRAPI + `/api/orders/${orderIdParams}`,
        {
          method: "GET",
          mode: "cors",
        }
      );
      const json = await orderResponse.json();

      if (orderResponse.ok) {
        console.log(json);
        localStorage.removeItem("cart");
        localStorage.removeItem("additionsCart");
        setCart([]);
        const order = {
          additionalItems: JSON.parse(json.data.additionalItems),
          orderInformation: JSON.parse(json.data.orderInformation),
          payNowPrice: json.data.payNowPrice,
          price: json.data.price,
          afterSalePrice: json.data.afterSalePrice,
          deposit: json.data.deposit,
          saleIndex: json.data.saleIndex,
          rentalItems: JSON.parse(json.data.rentalItems),
        };
        setData(order);
      }
    }
  }
  useEffect(() => {
    getOrderParams();
  }, []);

  async function getOrder() {
    const orderResponse = await fetch(
      process.env.STRAPI + `/api/orders/${orderId}`,
      {
        method: "GET",
        mode: "cors",
      }
    );

    if (orderResponse.ok) {
      const json = await orderResponse.json();
      const order = {
        additionalItems: JSON.parse(json.data.additionalItems),
        orderInformation: JSON.parse(json.data.orderInformation),
        payNowPrice: json.data.payNowPrice,
        price: json.data.price,
        afterSalePrice: json.data.afterSalePrice,
        deposit: json.data.deposit,
        saleIndex: json.data.saleIndex,
        rentalItems: JSON.parse(json.data.rentalItems),
      };
      setData(order);
    }
  }

  return (
    <>
      {data == null ? (
        <>
          <div className="flex w-full justify-center py-15 p-5 md:p-10 text-sm">
            <div className="w-full max-w-wrapper flex flex-col gap-5">
              <h4>vaše objednávka</h4>
              <label className="flex flex-col gap-2">
                Pro zobrazení detailu vložte identifikační číslo objednávky.
                MMůžete jej najít v potvrzovacím emailu v pravém horním rohu.
                <input
                  value={orderId}
                  type="text"
                  onChange={(e) => {
                    setOrderId(e.target.value);
                  }}
                  className="p-2 border rounded-md border-borderGray"
                ></input>
              </label>
              <button onClick={getOrder} className="buttonSmall">
                Najít objednávku
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex w-full justify-center py-15 p-5 md:p-10 text-sm">
            <div className="w-full max-w-wrapper flex flex-col gap-5">
              <h4>Vaše objednávka</h4>
              <p>
                Na vaší objednávce teď pracujeme. Níže můžete najít údaje, které
                od vás máme z objednávkového formuláře. Pokud by byl nějaký z
                nich špatně, napište nám na email{" "}
                <Link
                  className="text-primary"
                  href={"mailto:infor@grasston.cz"}
                >
                  info@grasston.cz
                </Link>
                .
              </p>
              <div className="h-[1px] bg-borderGray"></div>

              <div>
                {" "}
                <h5>Datum doručení a odvozu</h5>
                <p>
                  Od{" "}
                  <span className="font-semibold">
                    {format(
                      data.orderInformation.dateRange.startDate,
                      "dd.MM.yyyy hh:mm"
                    )}
                  </span>{" "}
                  do{" "}
                  <span className="font-semibold">
                    {format(
                      data.orderInformation.dateRange.endDate,
                      "dd.MM.yyyy hh:mm"
                    )}
                  </span>
                </p>
              </div>
              <div className="h-[1px] bg-borderGray"></div>

              <div className="flex flex-col gap-3 items-start">
                <div>
                  <h5>Technika a doplňky</h5>
                  <p>Zde najdete všechny položky v objednávce.</p>
                </div>
                <div className="h-[1px] bg-borderGray w-90"></div>

                <div className="grid md:grid-cols-2 gap-10 items-start w-full">
                  <div>
                    <h6>Technika na pronájem</h6>
                    <div className="flex flex-col">
                      {data.rentalItems.map((item: any) => {
                        return (
                          <div
                            key={"item" + item.item.name}
                            className="flex gap-10 items-center justify-between border-b border-borderGray py-2 only:border-b last:border-b-0"
                          >
                            <div className="flex items-center gap-5">
                              <Image
                                src={item.item.coverImage.url}
                                width={100}
                                height={100}
                                alt="image"
                                className="w-10 h-10 object-cover rounded-sm"
                              />
                              <Link href={`/produkt/${item.item.documentId}`}>
                                {item.item.name}
                              </Link>
                            </div>
                            <p>{item.count} ks.</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="w-full">
                    <h6>Jednorázové produkty</h6>
                    <div className="flex flex-col gap-2">
                      {data.additionalItems.map((item: any) => {
                        return (
                          <div
                            key={"item2" + item.item.name}
                            className="flex gap-10 items-center justify-between border-b border-borderGray py-2 only:border-b last:border-b-0"
                          >
                            {" "}
                            <div className="flex items-center gap-5">
                              <Image
                                src={item.item.coverImage.url}
                                width={100}
                                height={100}
                                alt="image"
                                className="w-10 h-10 object-cover rounded-sm"
                              />
                              <Link href={`/produkt/${item.item.documentId}`}>
                                {item.item.name}
                              </Link>{" "}
                            </div>
                            <p>{item.count} ks.</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[1px] bg-borderGray"></div>

              <div className="grid md:grid-cols-2 gap-10 items-start">
                <div>
                  <h5>Celková cena</h5>
                  <div className="flex flex-col gap-x-10 gap-y-2">
                    <div className="flex justify-between gap-3">
                      <p>Celková cena po slevě: </p>
                      <p className="justify-self-end text-nowrap font-semibold">
                        {data.afterSalePrice} Kč
                      </p>
                    </div>{" "}
                    <div className="h-[1px] bg-borderGray"></div>
                    <div className="flex justify-between gap-3">
                      <p>Rezervační poplatek: </p>
                      <p className="justify-self-end text-nowrap font-semibold">
                        {data.payNowPrice} Kč
                      </p>
                    </div>{" "}
                    <div className="h-[1px] bg-zinc-300"></div>
                    <div className="flex justify-between gap-3">
                      <p>Zbývá doplatit při převzetí: </p>
                      <p className="justify-self-end text-nowrap font-semibold text-primaryHover">
                        {data.afterSalePrice - data.payNowPrice} Kč
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h5>Záloha</h5>
                  <div className="flex flex-col gap-x-10 gap-y-2">
                    <div className="flex justify-between gap-3">
                      <p>Záloha splatná při převzetí: </p>
                      <p className="justify-self-end text-nowrap font-semibold">
                        {data.deposit} Kč
                      </p>
                    </div>{" "}
                    <div className="h-[1px] bg-borderGray"></div>
                  </div>
                </div>
              </div>
              <div className="h-[1px] bg-borderGray"></div>
              <div className=" gap-10 grid md:grid-cols-3 wrap-break-word">
                {" "}
                <div>
                  {" "}
                  <h5>Adresa pro doručení</h5>
                  <p>{data.orderInformation.deliveryAddress.ulice}</p>
                  <p>{data.orderInformation.deliveryAddress.cp}</p>
                  <p>{data.orderInformation.deliveryAddress.mesto}</p>
                  <p>{data.orderInformation.deliveryAddress.psc}</p>
                </div>
                <div>
                  {" "}
                  <h5>Kontaktní údaje</h5>
                  <p>{data.orderInformation.contact.jmeno}</p>
                  <p>{data.orderInformation.contact.prijmeni}</p>
                  <p>{data.orderInformation.contact.email}</p>
                  <p>{data.orderInformation.contact.telefon}</p>
                </div>{" "}
                <div>
                  {" "}
                  <h5>Fakturační údaje</h5>
                  <p>
                    Fakturu společně s údaji o objednávce jsme Vám poslali na
                    email, který jste zadávali do formuláře při placení.
                  </p>
                </div>
              </div>
              <div className="h-[1px] bg-borderGray"></div>

              <Link href={"/"} className="buttonSmall text-center">
                Zpět do obchodu
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
