import Image from "next/image";
import React from "react";
import parse from "html-react-parser";
import ProductPagePrice from "@/app/_components/prices/ProductPagePrice";
import DatepickerBig from "@/app/_components/Datepickers/DatepickerBig";
import DatepickerSmall from "@/app/_components/Datepickers/DatepickerSmall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGasPump, faSeedling } from "@fortawesome/free-solid-svg-icons";
import { FaSeedling } from "react-icons/fa";
import { GiGrass, GiHighGrass } from "react-icons/gi";

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
      <div className="w-full text-start max-w-wrapper flex items-end gap-3 text-sm">
        <p>Katalog</p>
        <p>-</p>
        <p>{data.name}</p>
      </div>

      <div className=" w-full  max-w-wrapper grid grid-cols-5 gap-10">
        <div className="col-span-3 flex flex-col gap-5">
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

          <div className="h-[300px] p-5 grid grid-cols-3">
            <div>
              <h5 className="mb-3">Určení</h5>
              <div className="flex flex-wrap gap-10">
                {data.uses.map((item: { name: string; [key: string]: any }) => {
                  if (item.name == "Vysoká tráva") {
                    return (
                      <div className="flex items-center gap-2">
                        <GiHighGrass className="text-xl text-primary" />
                        <p className="">{item.name}</p>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div>
              <h5 className="mb-3">Specifikace</h5>
              <div className="flex flex-wrap gap-10">
                {data.specifications.map(
                  (item: { name: string; [key: string]: any }) => {
                    if (item.name == "Spalovací motor") {
                      return (
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon
                            icon={faGasPump}
                            className="text-amber-600"
                          />
                          <p className="">{item.name}</p>
                        </div>
                      );
                    }
                  }
                )}
              </div>
            </div>
            <div>
              <h5 className="mb-3">Příslušenství</h5>
              <div className="flex flex-wrap gap-10">
                {data.specifications.map(
                  (item: { tagName: string; [key: string]: any }) => {
                    if (item.tagName == "Spalovací motor") {
                      return (
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon
                            icon={faGasPump}
                            className="text-amber-600"
                          />
                          <p className="">{item.tagName}</p>
                        </div>
                      );
                    }
                  }
                )}
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="h-full  col-span-2 flex flex-col gap-5">
          <h4 className="text-textPrimary">{data.name}</h4>
          <div className="flex flex-col gap-3 text-textPrimary">
            {parse(data.description)}
          </div>
          <div className="text-center flex flex-col gap-2 border p-5 rounded-lg border-borderGray">
            <ProductPagePrice basePrice={data.basePrice} data={data} />
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
            <p className="text-sm text-start mt-3">
              *Za každých započatých 24 hodin se přičítá jeden den
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
