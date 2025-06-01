"use client";

import React, { Dispatch, useEffect, useState } from "react";
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
import {
  FaHand,
  FaHelmetSafety,
  FaLeaf,
  FaSeedling,
  FaTree,
} from "react-icons/fa6";
import { MdElectricBolt, MdLocalGasStation } from "react-icons/md";
import { GiGrass, GiHighGrass } from "react-icons/gi";

type Props = {
  items: any;
};

export default function Catalogue({ items }: Props) {
  const [data, setData] = useState<any[]>(items);
  const [category, setCategory] = useState<{ name: string; type: string }>({
    name: "Všechny kategorie",
    type: "categories",
  });
  const [pojizdneSekacky, setPojizdneSekacky] = useState<boolean>(false);
  const [krovinorezy, setKrovinorezy] = useState<boolean>(false);
  const [vertikulatory, setVertikulatory] = useState<boolean>(false);
  const [provzdusnovace, setProvzdusnovace] = useState<boolean>(false);
  const [nuzkyNaPlot, setNuzkyNaPlot] = useState<boolean>(false);
  const [prislusenstviKere, setPrislusenstviKere] = useState<boolean>(false);
  const [retezovePily, setRetezovePily] = useState<boolean>(false);
  const [nuzkyNaVetve, setNuzkyNaVetve] = useState<boolean>(false);
  const [stipackyNaDrevo, setStipackyNaDrevo] = useState<boolean>(false);
  const [prislusenstviStromy, setPrislusenstviStromy] =
    useState<boolean>(false);
  const [nuzkyPilyMacety, setNuzkyPilyMacety] = useState<boolean>(false);
  const [koleckaVedraKrabice, setKoleckaVedraKrabice] =
    useState<boolean>(false);
  const [elektrickyMotor, setElektrickyMotor] = useState<boolean>(false);
  const [benzinovyMotor, setBenzinovyMotor] = useState<boolean>(false);
  const [manualniNaradi, setManualniNarad] = useState<boolean>(false);
  const [standardniPodminky, setStandardniPodminky] = useState<boolean>(false);
  const [narocnePodminky, setnarocnePodminky] = useState<boolean>(false);
  const [subcategories, setSubcategories] = useState<any>([]);
  const [categories, setCategories] = useState<any>({ data: [] });
  const [filtrToggle, setFiltrToggle] = useState<boolean>(false);

  useEffect(() => {
    async function getCategories() {
      const categories = await fetch(
        process.env.STRAPI + `/api/categories?populate=subcategories`,
        {
          method: "GET",
          mode: "cors",
        }
      );

      const json = await categories.json();
      setCategories(json);
      console.log(json);
    }

    getCategories();
  }, []);

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
    setter: any;
    state: any;
  };

  function SearchSubcategory({
    text,
    categoryType,
    value,
    setter,
    state,
  }: searchSubcategoryProps) {
    return (
      <label className="flex gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          name={categoryType}
          value={value}
          checked={state}
          onChange={(e) => {
            setter(!state);
          }}
        />
        {text}
      </label>
    );
  }

  function SearchCategory({
    text,
    categoryType,
  }: {
    text: string;
    categoryType: string;
    value: string;
  }) {
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

    const subcategories = formData.getAll("subcategories");
    console.log(subcategories);
    const newSubcategoriesState: any = [];
    subcategories.map((subcategory) => {
      newSubcategoriesState.push(subcategory);
    });
    setSubcategories(newSubcategoriesState);
    const queryOfSubcategories: any[] = [];

    subcategories.map((sub) => {
      queryOfSubcategories.push({
        subcategories: {
          documentId: { $eq: sub },
        },
      });
    });

    const engineType = formData.getAll("engineType");
    const queryOfEngineTpye: any[] = [];

    engineType.map((sub) => {
      queryOfEngineTpye.push({
        engine_type: {
          documentId: { $eq: sub },
        },
      });
    });

    console.log(queryOfEngineTpye);

    const uses = formData.getAll("uses");
    const queryOfUses: any[] = [];

    uses.map((sub) => {
      queryOfUses.push({
        uses: {
          documentId: { $eq: sub },
        },
      });
    });

    const query = await {
      filters: {
        $and: [
          { pricingType: { $ne: "product" } },
          {
            $or: queryOfSubcategories,
          },
          { $or: queryOfEngineTpye },
          { $or: queryOfUses },
        ],
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
      window.scrollTo({ top: 0, behavior: "smooth" });
      setData(json.data);
    }

    if (!response.ok) {
      console.log("problém");
    }
  }

  function ListCategories({ json }: { json: any }) {
    if (json.data.length > 0) {
      return (
        <>
          <div key={"filtrKategorie"} className="flex flex-col gap-3">
            {json.data.map((item: any) => {
              return (
                <div key={item.name + "kategorie"}>
                  <div className=" flex items-center gap-2">
                    {item.name == "Úprava trávníku" && (
                      <FaSeedling className="text-primary" />
                    )}
                    {item.name == "Úprava keřů" && (
                      <FaLeaf className="text-primary" />
                    )}
                    {item.name == "Úprava stromů a dřeva" && (
                      <FaTree className="text-primary" />
                    )}
                    {item.name == "Manuální nářadí a příslušenství" && (
                      <FaHelmetSafety className="text-primary text-lg" />
                    )}
                    <p className="font-semibold">{item.name}</p>
                  </div>
                  <div className="pl-5 ml-[6px] border-l border-borderGray">
                    {item.subcategories.map((subcategory: any) => {
                      let checkedState = false;
                      const checkedArray = subcategories.filter(
                        (documentId: string) =>
                          documentId == subcategory.documentId
                      );
                      if (checkedArray.length > 0) {
                        checkedState = true;
                      }
                      return (
                        <label
                          key={subcategory.name + "subkategorie"}
                          className="flex gap-2 items-center cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            name="subcategories"
                            value={subcategory.documentId}
                            defaultChecked={checkedState}
                          />
                          {subcategory.name}
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      );
    }
  }

  return (
    <>
      <div className="flex w-full  justify-center md:p-10 p-5">
        <div className="lg:w-full max-w-wrapper grid lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1 hidden lg:block">
            <form
              onSubmit={(data) => {
                data.preventDefault();
                Filter(data.target);
              }}
              className="min-h-50 border border-borderGray rounded-xl p-4 flex flex-col gap-5"
            >
              <p className="text-textPrimary text-2xl font-semibold border-b border-borderGray">
                Filtr
              </p>
              <div>
                <SearchHeading text="Kategorie" />
                <div className="flex flex-col gap-3">
                  <ListCategories json={categories} />
                </div>
              </div>
              <div>
                <SearchHeading text="Typ techniky" />
                <div>
                  <div className="flex items-center gap-2">
                    <MdElectricBolt className="text-primary" />
                    <SearchSubcategory
                      value="n01dkms7x65r2xlbz3z7bt51"
                      categoryType="engineType"
                      text="Elektrický motor"
                      setter={setElektrickyMotor}
                      state={elektrickyMotor}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <MdLocalGasStation className="text-primary" />

                    <SearchSubcategory
                      value="n9upm95rzcpw6ng3e7exv5jb"
                      categoryType="engineType"
                      text="Benzínový motor"
                      setter={setBenzinovyMotor}
                      state={benzinovyMotor}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <FaHand className="text-primary" />
                    <SearchSubcategory
                      value="ziual17oljz0iv5mtnwd2b9t"
                      categoryType="engineType"
                      text="Manuální nářadí a příslušenství"
                      setter={setManualniNarad}
                      state={manualniNaradi}
                    />
                  </div>
                </div>
              </div>

              <div>
                <SearchHeading text="Určení" />
                <div className="flex items-center gap-2">
                  <GiGrass className="text-primary" />
                  <SearchSubcategory
                    value="sk1st3bmd0fbjufgeaz1p49m"
                    categoryType="uses"
                    text="Standardní podmínky"
                    setter={setStandardniPodminky}
                    state={standardniPodminky}
                  />{" "}
                </div>

                <div className="flex items-center gap-2">
                  <GiHighGrass className="text-primary" />
                  <SearchSubcategory
                    value="ie19l68mmhdxcnmnlqzyp1u0"
                    categoryType="uses"
                    text="Náročné podmínky"
                    setter={setnarocnePodminky}
                    state={narocnePodminky}
                  />
                </div>
              </div>
              <button type="submit" className="buttonSmall w-full">
                Vyhledat
              </button>
            </form>
          </div>
          <div className="lg:col-span-1 lg:hidden">
            <div className="flex justify-between items-center border p-2 border-borderGray rounded-md mb-3">
              <p className="text-textPrimary text-2xl font-semibold border-borderGray">
                Filtr
              </p>
              <p
                onClick={() => {
                  setFiltrToggle(!filtrToggle);
                }}
              >
                {filtrToggle ? "Zavřít" : "Otevřit"}
              </p>
            </div>
            {filtrToggle && (
              <form
                onSubmit={(data) => {
                  data.preventDefault();
                  Filter(data.target);
                }}
                className="min-h-50 border border-borderGray rounded-md p-4 flex flex-col gap-5"
              >
                <div>
                  <SearchHeading text="Kategorie" />
                  <div className="flex flex-col gap-3">
                    <ListCategories json={categories} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <MdElectricBolt className="text-primary" />
                    <SearchSubcategory
                      value="n01dkms7x65r2xlbz3z7bt51"
                      categoryType="engineType"
                      text="Elektrický motor"
                      setter={setElektrickyMotor}
                      state={elektrickyMotor}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <MdLocalGasStation className="text-primary" />

                    <SearchSubcategory
                      value="n9upm95rzcpw6ng3e7exv5jb"
                      categoryType="engineType"
                      text="Benzínový motor"
                      setter={setBenzinovyMotor}
                      state={benzinovyMotor}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <FaHand className="text-primary" />
                    <SearchSubcategory
                      value="ziual17oljz0iv5mtnwd2b9t"
                      categoryType="engineType"
                      text="Manuální nářadí a příslušenství"
                      setter={setManualniNarad}
                      state={manualniNaradi}
                    />
                  </div>
                </div>

                <div>
                  <SearchHeading text="Určení" />

                  <SearchSubcategory
                    value="sk1st3bmd0fbjufgeaz1p49m"
                    categoryType="uses"
                    text="Standardní podmínky"
                    setter={setStandardniPodminky}
                    state={standardniPodminky}
                  />
                  <SearchSubcategory
                    value="ie19l68mmhdxcnmnlqzyp1u0"
                    categoryType="uses"
                    text="Náročné podmínky"
                    setter={setnarocnePodminky}
                    state={narocnePodminky}
                  />
                </div>
                <button type="submit" className="buttonSmall w-full">
                  Vyhledat
                </button>
              </form>
            )}
          </div>
          {data.length > 0 && (
            <div className="lg:col-span-3 flex flex-col gap-5">
              {data.map((item: any) => {
                return (
                  <ProductTabHorizontal
                    item={item}
                    key={"productHorizontal" + item.name}
                  />
                );
              })}
            </div>
          )}
          {data.length == 0 && (
            <div className="lg:col-span-3 flex flex-col gap-5">
              <p>
                Nebyli jsme schopni najít žádné produkty odpovídající
                vyhledávání.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
