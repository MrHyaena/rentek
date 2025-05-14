import Image from "next/image";
import React from "react";
import parse from "html-react-parser";
import ProductPagePrice from "@/app/_components/Prices/ProductPagePrice";
import DatepickerSmall from "@/app/_components/Datepickers/DatepickerSmall";

import { FaChevronLeft, FaSeedling } from "react-icons/fa";

import ProductSpecsRental from "@/app/_components/Products/ProductSpecsRental";
import ProductPrice from "@/app/_components/Prices/ProductPagePrice";
import AddToCartButton from "@/app/_components/Cart/AddToCartButton";

type Props = {};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(`${process.env.STRAPI}/api/items/${id}/?populate=*`);

  const data = await GetProductData(id);

  async function GetProductData(id: string) {
    const response = await fetch(
      `${process.env.STRAPI}/api/items/${id}/?populate=*`,
      {
        method: "GET",
        mode: "cors",
      }
    );

    const json = await response.json();

    return json.data;
  }

  console.log(data);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-10 gap-5">
      <a
        href="/katalog"
        className="w-full text-start max-w-wrapper flex items-center gap-3 text-sm"
      >
        <FaChevronLeft />
        <p className="font-semibold">Zpět do katalogu</p>
      </a>

      <div className=" w-full  max-w-wrapper grid grid-cols-5 gap-10">
        <div className="col-span-3 flex flex-col gap-5">
          {data.gallery != null ? (
            <div className="grid grid-cols-5 gap-2">
              <Image
                width={990}
                height={990}
                src={`${process.env.STRAPI}${data.coverImage.url}`}
                alt={data.name + "-hero"}
                className="w-full col-span-4 object-cover rounded-lg h-full"
              />
              <div className="grid grid-rows-4 w-full max-h-[600px] gap-2">
                {data.gallery.map((item: any) => {
                  return (
                    <Image
                      width={500}
                      height={500}
                      src={`${process.env.STRAPI}${item.url}`}
                      alt={data.name + "-hero"}
                      className="w-full object-cover rounded-lg h-full"
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="">
              <Image
                width={990}
                height={990}
                src={`${process.env.STRAPI}${data.coverImage.url}`}
                alt={data.name + "-hero"}
                className="w-full col-span-4 object-cover rounded-lg h-full"
              />
            </div>
          )}
          <ProductSpecsRental data={data} />
        </div>{" "}
        <div className="h-full  col-span-2 flex flex-col gap-5">
          <h4 className="text-textPrimary">{data.name}</h4>
          <div className="flex flex-col gap-3 text-textPrimary">
            {parse(data.description)}
          </div>
          <div className="text-center flex flex-col gap-2 border p-5 rounded-lg border-borderGray">
            <ProductPrice data={data} />
            <AddToCartButton data={data} />
            <DatepickerSmall />
          </div>

          <div></div>
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
                <p className="font-semibold">10 %</p>
              </div>
              <div className="grid grid-cols-2 justify-items-center p-2 border-y border-borderGray">
                <p>8 - 21 dní</p>
                <p className="font-semibold">20 %</p>
              </div>
              <div className="grid grid-cols-2 justify-items-center p-2">
                <p>22 a více dní</p>
                <p className="font-semibold">25 %</p>
              </div>
            </div>
            <p className="text-sm text-start mt-3">
              *Za každých započatých 24 hodin se přičítá jeden den
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
