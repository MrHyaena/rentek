"use client";

import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = { [key: string]: any };

export default function OrderSum({}: Props) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const response = localStorage.getItem("orderCompleted");

    if (response != null) {
      setData(JSON.parse(response));
    }
  }, []);

  return (
    <>
      {data == null ? (
        <>
          <div className="flex w-full justify-center py-15 p-5 md:p-10 text-sm">
            <div className="w-full max-w-wrapper flex flex-col gap-5">
              <h4>vaše objednávka</h4>
              <p>V tuto chvíli nemáte žádnou dokončenou objednávku.</p>
              <Link
                className="buttonSmall"
                href={process.env.WEBSITE + "/katalog"}
              >
                Najít objednávku
              </Link>
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

                <div>
                  <h6>Technika na pronájem</h6>
                  <div className="flex flex-col gap-2">
                    {data.rentalItems.map((item: any) => {
                      return (
                        <div
                          key={"item" + item.item.name}
                          className="flex gap-10 items-center"
                        >
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
                          className="flex gap-10 items-center"
                        >
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
                          <p>{item.count} ks.</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="h-[1px] bg-borderGray"></div>
              <div className="flex md:flex-row flex-col gap-10 wrap-break-word">
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
                  <h5>Fakturační údaje</h5>
                  <p>{data.orderInformation.invoiceAddress.ulice}</p>
                  <p>{data.orderInformation.invoiceAddress.cp}</p>
                  <p>{data.orderInformation.invoiceAddress.mesto}</p>
                  <p>{data.orderInformation.invoiceAddress.psc}</p>
                </div>
                <div>
                  {" "}
                  <h5>Kontaktní údaje</h5>
                  <p>{data.orderInformation.contact.jmeno}</p>
                  <p>{data.orderInformation.contact.prijmeni}</p>
                  <p>{data.orderInformation.contact.email}</p>
                  <p>{data.orderInformation.contact.telefon}</p>
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
