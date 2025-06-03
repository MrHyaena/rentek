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

  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [categories, setCategories] = useState<any>({ data: [] });

  const [engineTypeInput, setEngineTypeInput] = useState<any[]>([]);
  const [engineType, setEngineType] = useState<any>({ data: [] });

  const [usesInput, setUsesInput] = useState<any[]>([]);
  const [uses, setUses] = useState<any>({ data: [] });

  const [orders, setOrders] = useState<any>([]);

  const [filtrToggle, setFiltrToggle] = useState<boolean>(false);

  useEffect(() => {
    async function getFilters() {
      const categories = await fetch(
        process.env.STRAPI + `/api/categories?populate=subcategories`,
        {
          method: "GET",
          mode: "cors",
        }
      );

      const json = await categories.json();
      setCategories(json);

      const engineType = await fetch(process.env.STRAPI + `/api/engine-types`, {
        method: "GET",
        mode: "cors",
      });
      const jsonEngine = await engineType.json();
      setEngineType(jsonEngine);

      const uses = await fetch(process.env.STRAPI + `/api/uses`, {
        method: "GET",
        mode: "cors",
      });

      const jsonUses = await uses.json();
      setUses(jsonUses);
    }

    getFilters();
  }, []);

  function SearchHeading({ text }: { text: string }) {
    return (
      <p className="font-semibold border-b text-primary border-borderGray pb-1 mb-2 text-lg">
        {text}
      </p>
    );
  }

  async function Filter(data: any) {
    const formData = new FormData(data);

    const subcategories = formData.getAll("subcategories");
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

    setEngineTypeInput(engineType);

    const queryOfEngineTpye: any[] = [];
    engineType.map((sub) => {
      queryOfEngineTpye.push({
        engine_type: {
          documentId: { $eq: sub },
        },
      });
    });

    const uses = formData.getAll("uses");
    const newUses: any = [];
    uses.map((subcategory) => {
      newUses.push(subcategory);
    });
    setUsesInput(newUses);
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

  function ListFilters({
    items,
    inputGroup,
    inputName,
  }: {
    items: any;
    inputGroup: any;
    inputName: string;
  }) {
    if (items.data.length > 0) {
      return (
        <>
          <div key={"uses"} className="flex flex-col">
            {items.data.map((item: any) => {
              let checkedState = false;
              const checkedArray = inputGroup.filter(
                (documentId: string) => documentId == item.documentId
              );

              if (checkedArray.length > 0) {
                checkedState = true;
              }

              return (
                <div
                  key={item.name + "uses"}
                  className=" flex items-center gap-2"
                >
                  {item.name == "Úprava trávníku" && (
                    <FaSeedling className="text-primary" />
                  )}
                  <label
                    key={item.name + inputName}
                    className="flex gap-2 items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name={inputName}
                      value={item.documentId}
                      defaultChecked={checkedState}
                    />
                    {item.name}
                  </label>{" "}
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
                <ListFilters
                  items={engineType}
                  inputGroup={engineTypeInput}
                  inputName="engineType"
                />
              </div>
              <div>
                <SearchHeading text="Určení" />
                <ListFilters
                  items={uses}
                  inputGroup={usesInput}
                  inputName="uses"
                />
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
                  <SearchHeading text="Typ techniky" />
                  <ListFilters
                    items={engineType}
                    inputGroup={engineTypeInput}
                    inputName="engineType"
                  />
                </div>
                <div>
                  <SearchHeading text="Určení" />
                  <ListFilters
                    items={uses}
                    inputGroup={usesInput}
                    inputName="uses"
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
