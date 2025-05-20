"use client";

import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function OrderSum({}: Props) {
  const orderData = localStorage.getItem("orderCompleted");

  let order: any;

  if (orderData != null) {
    order = JSON.parse(orderData);
  }

  const orderInformation = order.orderInformation;
  const items = order.rentalItems;
  const additionalItems = order.additionalItems;

  return (
    <>
      <div className="flex w-full justify-center py-15 p-5 md:p-10 text-sm">
        <div className="w-full max-w-wrapper flex flex-col gap-5">
          <h4>vaše objednávka</h4>
          <p>
            Na vaší objednávce teď pracujeme. Níže můžete najít údaje, které od
            vás máme z objednávkového formuláře. Pokud by byl nějaký z nich
            špatně, napište nám na email{" "}
            <Link className="text-primary" href={"mailto:infor@grasston.cz"}>
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
                {format(orderInformation.dateRange.startDate, "dd.MM.yyyy")}
              </span>{" "}
              od{" "}
              <span className="font-semibold">
                {format(orderInformation.dateRange.endDate, "dd.MM.yyyy")}
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
                {items.map((item: any) => {
                  return (
                    <div className="flex gap-10 items-center">
                      <Image
                        src={process.env.STRAPI + item.item.coverImage.url}
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
                {additionalItems.map((item: any) => {
                  return (
                    <div className="flex gap-10 items-center">
                      <Image
                        src={process.env.STRAPI + item.item.coverImage.url}
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
              <p>{orderInformation.deliveryAddress.ulice}</p>
              <p>{orderInformation.deliveryAddress.cp}</p>
              <p>{orderInformation.deliveryAddress.mesto}</p>
              <p>{orderInformation.deliveryAddress.psc}</p>
            </div>
            <div>
              {" "}
              <h5>Fakturační údaje</h5>
              <p>{orderInformation.invoiceAddress.ulice}</p>
              <p>{orderInformation.invoiceAddress.cp}</p>
              <p>{orderInformation.invoiceAddress.mesto}</p>
              <p>{orderInformation.invoiceAddress.psc}</p>
            </div>
            <div>
              {" "}
              <h5>Kontaktní údaje</h5>
              <p>{orderInformation.contact.jmeno}</p>
              <p>{orderInformation.contact.prijmeni}</p>
              <p>{orderInformation.contact.email}</p>
              <p>{orderInformation.contact.telefon}</p>
            </div>
          </div>
          <div className="h-[1px] bg-borderGray"></div>

          <Link href={"/"} className="buttonSmall text-center">
            Zpět do obchodu
          </Link>
        </div>
      </div>
    </>
  );
}
