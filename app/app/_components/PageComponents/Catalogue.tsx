"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHelmetSafety,
  faLeaf,
  faSeedling,
  faTree,
} from "@fortawesome/free-solid-svg-icons";
import ProductTabHorizontal from "../Products/ProductHorizontal";
import Link from "next/link";
import { BiCategoryAlt } from "react-icons/bi";
import * as qs from "qs";

type Props = {
  items: any;
};

export default function Catalogue({ items }: Props) {
  const [data, setData] = useState<any[]>(items);
  const [category, setCategory] = useState<{ name: string; type: string }>({
    name: "Všechny kategorie",
    type: "categories",
  });

  function SearchHeading({ text }: { text: string }) {
    return (
      <p className="font-semibold border-b text-primary border-borderGray pb-1 mb-2 text-lg">
        {text}
      </p>
    );
  }

  type searchSubcategoryProps = {
    text: string;
    categoryType: string;
    value: string;
  };

  function SearchSubcategory({
    text,
    categoryType,
    value,
  }: searchSubcategoryProps) {
    function isActive() {
      if (category.type == "subcategories" && category.name == text) {
        return true;
      }
    }

    return (
      <label className="flex gap-2 items-center cursor-pointer">
        <input type="checkbox" name="subcategories" value={value} />
        {isActive() ? (
          <p className="text-primary">{text}</p>
        ) : (
          <p className="">{text}</p>
        )}
      </label>
    );
  }

  function SearchCategory({ text, categoryType }: searchSubcategoryProps) {
    function isActive() {
      if (category.type == "categories" && category.name == text) {
        return true;
      }
    }

    return (
      <div
        onClick={() => {
          setCategory({ name: text, type: categoryType });
        }}
        className="flex gap-2 items-center cursor-pointer"
      >
        {isActive() ? (
          <p className="font-semibold text-primary">{text}</p>
        ) : (
          <p className="font-semibold">{text}</p>
        )}
      </div>
    );
  }

  async function Filter(data: any) {
    const formData = new FormData(data);
    console.log(formData.getAll("subcategories"));

    let subcategories = formData.getAll("subcategories");
    let querySubcategories: any[] = [];

    subcategories.map((sub) => {
      querySubcategories.push({
        subcategories: {
          documentId: { $eq: sub },
        },
      });
    });

    if (querySubcategories.length == null) {
      querySubcategories = ["empty"];
    }

    const query = await {
      filters: {
        $or: querySubcategories,
      },
    };

    const response = await fetch(
      process.env.STRAPI +
        `/api/items?${qs.stringify(query, {
          encodeValuesOnly: true,
        })}&populate=*`,
      {
        method: "GET",
        mode: "cors",
      }
    );
    const json = await response.json();

    if (response.ok) {
      console.log(json.data);
      setData(json.data);
    }

    if (!response.ok) {
      console.log("problém");
    }
  }

  return (
    <>
      <div className="flex w-full  justify-center p-10">
        <div className="w-full max-w-wrapper grid grid-cols-4 gap-10">
          <div className="col-span-1">
            <form
              onSubmit={(data) => {
                data.preventDefault();
                Filter(data.target);
              }}
              className="min-h-50 border border-borderGray rounded-md p-4 flex flex-col gap-5"
            >
              <p className="text-textPrimary text-2xl font-semibold border-b border-borderGray">
                Filtr
              </p>
              <div>
                <SearchHeading text="Kategorie" />
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="flex gap-2 items-center">
                      <BiCategoryAlt className="text-primary" />
                      <SearchCategory
                        value="ffff"
                        text="Všechny kategorie"
                        categoryType="categories"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="flex gap-2 items-center">
                      <FontAwesomeIcon
                        icon={faSeedling}
                        className="text-primary"
                      />
                      <SearchCategory
                        value="p61jw52ag3pzulw0qzcvdd8s"
                        text="Úprava trávníku"
                        categoryType="categories"
                      />
                    </label>
                    <div className="pl-5 ml-[6px] border-l border-borderGray">
                      <SearchSubcategory
                        value="uvepwsnfouqcpzvpxdrvyhys"
                        categoryType="subcategories"
                        text="Pojízdné sekačky"
                      />
                      <SearchSubcategory
                        value="kubile3os5ohdznhd6mwzglp"
                        categoryType="subcategories"
                        text="Křovinořezy"
                      />
                      <SearchSubcategory
                        value="voar2ydhmjmsv67qnwexrtfq"
                        categoryType="subcategories"
                        text="Vertikulátory a kultivátory"
                      />
                      <SearchSubcategory
                        value="yn15ya18q9oren1tomenj1qa"
                        categoryType="subcategories"
                        text="Provzdušňovače a mulčovače"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="flex gap-2 items-center">
                      <FontAwesomeIcon icon={faLeaf} className="text-primary" />
                      <SearchCategory
                        value="ba8e198g65fe64l1obbze549"
                        text="Úprava keřů"
                        categoryType="categories"
                      />{" "}
                    </label>
                    <div className="pl-5 ml-[6px] border-l border-borderGray">
                      <SearchSubcategory
                        value="aiec68ul2uy4lt2btz2lv2wb"
                        categoryType="subcategories"
                        text="Nůžky na živý plot"
                      />
                      <SearchSubcategory
                        value="bslnpe1894ajoyrgsi2p1vpz"
                        categoryType="subcategories"
                        text="Příslušenství a nářadí pro úpravu keřů"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="flex gap-2 items-center">
                      <FontAwesomeIcon icon={faTree} className="text-primary" />
                      <SearchCategory
                        value="xo1ctmhlqtw16bp2tq67dah0"
                        text="Úprava stromů a dřeva"
                        categoryType="categories"
                      />{" "}
                    </label>
                    <div className="pl-5 ml-[6px] border-l border-borderGray">
                      <SearchSubcategory
                        value="qkhgxzq8mlqiaqhndwvq63eh"
                        categoryType="subcategories"
                        text="Řetěžové a vyvětvovací pily"
                      />
                      <SearchSubcategory
                        value="rl1xd2g2pbgk9solkr0k1aeo"
                        categoryType="subcategories"
                        text="Nůžky na větve"
                      />
                      <SearchSubcategory
                        value="uy0p67uov9trc6z29vefr32e"
                        categoryType="subcategories"
                        text="Štípačky na dřevo"
                      />
                      <SearchSubcategory
                        value="cx7kuahbibil6osjr0wyvccf"
                        categoryType="subcategories"
                        text="Příslušenství a nářadí pro úpravu stromů"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="flex gap-2 items-center">
                      <FontAwesomeIcon
                        icon={faHelmetSafety}
                        className="text-primary"
                      />
                      <SearchCategory
                        value="urxyvl380onqrzd4mv57azk6"
                        text="Manuální nářadí a příslušenství"
                        categoryType="categories"
                      />
                    </label>
                    <div className="pl-5 ml-[6px] border-l border-borderGray">
                      <SearchSubcategory
                        value="zsn9d5bbczpp7w34ij85xtzl"
                        categoryType="subcategories"
                        text="Nůžky, pily, mačety a jiné"
                      />
                      <SearchSubcategory
                        value="k4h6f38xlvuxc3lh59j57vw0"
                        categoryType="subcategories"
                        text="Kolečka, vědra a krabice"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <SearchHeading text="Typ pohonu" />

                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="appearance-auto border-2 w-3 h-3"
                  />
                  <p>Elektrický motor</p>
                </div>
                <div className="flex gap-2 items-center">
                  <input type="checkbox" />
                  <p>Benzínový motor </p>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="appearance-auto border-2 w-3 h-3"
                  />
                  <p>Manuální nářadí</p>
                </div>
              </div>
              <div>
                <SearchHeading text="Cena za den" />

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-2 items-start max-w-full">
                    <p>Od</p>
                    <input
                      type="number"
                      className="border rounded-sm border-zinc-300 max-w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-2 items-start max-w-full">
                    <p>Od</p>
                    <input
                      type="number"
                      className="border rounded-sm border-zinc-300 max-w-full"
                    />
                  </div>
                </div>
              </div>
              <div>
                <SearchHeading text="Určení" />

                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="appearance-auto border-2 w-3 h-3"
                  />
                  <p>Standardní podmínky</p>
                </div>
                <div className="flex gap-2 items-center">
                  <input type="checkbox" />
                  <p>Těžké podmínky</p>
                </div>
              </div>
              <button type="submit" className="buttonSmall w-full">
                Vyhledat
              </button>
            </form>
          </div>
          <div className="col-span-3 flex flex-col gap-5">
            {data.map((item: any) => {
              return <ProductTabHorizontal item={item} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
