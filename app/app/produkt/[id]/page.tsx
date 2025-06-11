import Image from "next/image";
import React from "react";
import parse from "html-react-parser";
import ProductPagePrice from "@/app/_components/Prices/ProductPrice";
import DatepickerSmall from "@/app/_components/Datepickers/DatepickerSmall";

import { FaChevronLeft, FaSeedling } from "react-icons/fa";

import ProductSpecsRental from "@/app/_components/Products/ProductSpecsRental";
import ProductPrice from "@/app/_components/Prices/ProductPrice";
import AddToCartButton from "@/app/_components/Cart/AddToCartButton";
import ProductSpecsProduct from "@/app/_components/Products/ProductSpecsProduct";
import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";
import * as qs from "qs";
import Availability from "@/app/_components/Products/Availability";

export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata> {
  // read route params
  const id = params.id;
  const response = await fetch(`${process.env.STRAPI}/api/items/${id}`, {
    method: "GET",
    mode: "cors",
    next: {
      revalidate: 20,
    },
  });

  const json = await response.json();

  return {
    title: json.data.name,
    description: json.data.excerpt,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await GetProductData(id);

  async function GetProductData(id: string) {
    const response = await fetch(
      `${process.env.STRAPI}/api/items/${id}/?populate=*`,
      {
        method: "GET",
        mode: "cors",
        next: {
          revalidate: 20,
        },
      }
    );

    const json = await response.json();

    return json.data;
  }

  async function GetTimeslots() {
    const nowDate = await new Date();

    const query = await {
      filters: {
        delivery: {
          $gt: nowDate.toISOString(),
        },
      },
    };
    let response = await fetch(
      process.env.STRAPI +
        `/api/timeslots?populate=*&${qs.stringify(query, {
          encodeValuesOnly: true,
        })}`,
      {
        method: "GET",
        mode: "cors",
        next: {
          revalidate: 10,
        },
      }
    );

    const json = await response.json();
    console.log(json);

    return json.data;
  }

  const timeslots = await GetTimeslots();

  return (
    <>
      <Head>
        <title>{data.name}</title>
        <meta property="og:title" content={data.name} />
      </Head>
      <div className="flex flex-col items-center justify-start md:p-10 p-5 gap-5 mt-[100px] md:mt-0">
        <a
          href="/katalog"
          className="w-full text-start max-w-wrapper flex items-center gap-3 text-sm py-3"
        >
          <FaChevronLeft />
          <p className="font-semibold">Zpět do katalogu</p>
        </a>

        <div className=" w-full  max-w-wrapper grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2 flex flex-col md:gap-15 gap-5">
            {data.gallery != null ? (
              <div className="grid grid-cols-5 gap-2 border">
                <div className="flex items-center justify-center aspect-square w-full col-span-4 rounded-lg h-full">
                  <Image
                    width={990}
                    height={990}
                    src={`${data.coverImage.formats.large.url}`}
                    alt={data.name + "-hero"}
                    className=""
                  />
                </div>
                <div className="grid grid-rows-4 w-full gap-2">
                  {data.gallery.map((item: any) => {
                    return (
                      <Image
                        key={item.url}
                        width={990}
                        height={990}
                        src={`${item.url}`}
                        alt={data.name + "-hero"}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className=" flex items-center justify-center w-full aspect-square col-span-4 rounded-lg">
                <Image
                  width={990}
                  height={990}
                  src={`${data.coverImage.url}`}
                  alt={data.name + "-hero"}
                  className=""
                />
              </div>
            )}
            <div className="hidden md:block">
              {data.pricingType == "rental" && (
                <ProductSpecsRental data={data} />
              )}
            </div>
          </div>{" "}
          <div className="h-full  md:col-span-2 flex flex-col gap-5">
            <div className="flex flex-col items-start gap-2">
              <h4 className="text-textPrimary">{data.name}</h4>
              <Availability timeslots={timeslots} item={data} />
            </div>

            <div className="flex flex-col gap-3 text-textPrimary">
              {parse(data.description)}
            </div>
            <div className="text-center flex flex-col gap-2 border p-5 rounded-lg border-borderGray">
              <ProductPrice data={data} />
              <div className="w-full grid grid-cols-2 gap-2 md:grid-cols-4">
                <AddToCartButton item={data} timeslots={timeslots} />
                <Link href={"/kosik"} className="buttonSmall col-span-2">
                  Přejít do košíku
                </Link>
              </div>
              {data.pricingType == "rental" && <DatepickerSmall />}
            </div>

            {data.pricingType == "rental" && (
              <div>
                <h5 className="mb-3">Tabulka slev</h5>
                <div className="w-full max-h-[200px] overflow-hidden rounded border border-borderGray">
                  <div className="grid grid-cols-2 justify-items-center p-2 bg-zinc-100 font-semibold">
                    <p>Počet dní</p>
                    <p>Celková sleva</p>
                  </div>
                  <div className="grid grid-cols-2 justify-items-center p-2 border-y border-borderGray">
                    <p>1 den</p>
                    <p className="font-semibold">0 %</p>
                  </div>
                  <div className="grid grid-cols-2 justify-items-center p-2">
                    <p>2 - 7 dní</p>
                    <p className="font-semibold">5 %</p>
                  </div>
                  <div className="grid grid-cols-2 justify-items-center p-2 border-y border-borderGray">
                    <p>8 - 21 dní</p>
                    <p className="font-semibold">10 %</p>
                  </div>
                  <div className="grid grid-cols-2 justify-items-center p-2">
                    <p>22 a více dní</p>
                    <p className="font-semibold">15 %</p>
                  </div>
                </div>
                <p className="text-sm text-start mt-3">
                  *Za každých započatých 24 hodin se přičítá jeden den
                </p>
              </div>
            )}
          </div>
          <div className="md:hidden">
            {data.pricingType == "rental" ? (
              <ProductSpecsRental data={data} />
            ) : (
              <ProductSpecsProduct data={data} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
