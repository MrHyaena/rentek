import Image from "next/image";
import React from "react";
import parse from "html-react-parser";
import ProductPagePrice from "@/app/_components/prices/ProductPagePrice";
import DatepickerBig from "@/app/_components/Datepickers/DatepickerBig";

type Props = {};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(
    `${process.env.STRAPI}/api/items/${id}/?populate=coverImage&populate=gallery`
  );

  const data = await GetProductData(id);

  async function GetProductData(id: string) {
    const response = await fetch(
      `${process.env.STRAPI}/api/items/${id}/?populate=coverImage&populate=gallery`,
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
      <div className=" w-full  max-w-wrapper grid grid-cols-5 gap-10">
        <div className="col-span-3 max-h-[600px]  grid grid-cols-5 gap-2">
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
        <div className="h-full  col-span-2 flex flex-col gap-5">
          <h4>{data.name}</h4>
          <div className="flex flex-col gap-3">{parse(data.description)}</div>
          <div className="text-center">
            <ProductPagePrice basePrice={data.basePrice} data={data} />
          </div>
          <p className="text-sm text-center">
            *Za každých započatých 24 hodin se přičítá jeden den
          </p>
          <DatepickerBig />
          <div></div>
          <div>
            <h4 className="mb-3">Tabulka slev</h4>
            <div className="w-full max-h-[200px] overflow-hidden rounded border border-borderGray">
              <div className="grid grid-cols-2 justify-items-center p-2 bg-zinc-100 font-semibold">
                <p>Počet dní</p>
                <p>Celková sleva</p>
              </div>
              <div className="grid grid-cols-2 justify-items-center p-2 border-y border-borderGray">
                <p>1 den</p>
                <p>0 %</p>
              </div>
              <div className="grid grid-cols-2 justify-items-center p-2">
                <p>2 - 7 dní</p>
                <p>10 %</p>
              </div>
              <div className="grid grid-cols-2 justify-items-center p-2 border-y border-borderGray">
                <p>8 - 21 dní</p>
                <p>20 %</p>
              </div>
              <div className="grid grid-cols-2 justify-items-center p-2">
                <p>22 a více dní</p>
                <p>25 %</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
