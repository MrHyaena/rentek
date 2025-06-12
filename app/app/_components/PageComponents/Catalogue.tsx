"use client";

import React, { Dispatch, useContext, useEffect, useState } from "react";
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
import arraySort from "array-sort";
import { SearchContext } from "@/app/_context/SearchContext";

type Props = {
  items: any;
  timeslots: [];
};

export default function Catalogue({ items, timeslots }: Props) {
  const { search, setSearch } = useContext(SearchContext);

  const [data, setData] = useState<any[]>(items);

  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [categories, setCategories] = useState<any>({ data: [] });

  const [engineTypeInput, setEngineTypeInput] = useState<any[]>([]);
  const [engineType, setEngineType] = useState<any>({ data: [] });

  const [usesInput, setUsesInput] = useState<any[]>([]);
  const [uses, setUses] = useState<any>({ data: [] });

  const [filtrToggle, setFiltrToggle] = useState<boolean>(false);

  useEffect(() => {
    async function getFilters() {
      const categories = await fetch(
        process.env.STRAPI + `/api/categories?populate=subcategories`,
        {
          method: "GET",
          mode: "cors",
          next: {
            revalidate: 20,
          },
        }
      );

      const json = await categories.json();
      setCategories(json);

      const engineType = await fetch(process.env.STRAPI + `/api/engine-types`, {
        method: "GET",
        mode: "cors",
        next: {
          revalidate: 20,
        },
      });
      const jsonEngine = await engineType.json();
      setEngineType(jsonEngine);

      const uses = await fetch(process.env.STRAPI + `/api/uses`, {
        method: "GET",
        mode: "cors",
        next: {
          revalidate: 20,
        },
      });

      const jsonUses = await uses.json();
      setUses(jsonUses);
    }

    getFilters();
  }, []);

  useEffect(() => {
    if (
      search.engineType.length > 0 ||
      search.subcategories.length > 0 ||
      search.uses.length > 0
    ) {
      InitFilter(search);
    }
  }, []);

  function SearchHeading({ text }: { text: string }) {
    return (
      <p className="font-semibold border-b text-primary border-borderGray pb-1 mb-2 text-lg">
        {text}
      </p>
    );
  }

  async function InitFilter(data: {
    subcategories: any[];
    uses: any[];
    engineType: any[];
  }) {
    const subcategories = data.subcategories;
    const newSubcategoriesState: any = [];
    subcategories.map((subcategory: any) => {
      newSubcategoriesState.push(subcategory);
    });
    setSubcategories(newSubcategoriesState);

    const queryOfSubcategories: any[] = [];
    subcategories.map((sub: any) => {
      queryOfSubcategories.push({
        subcategories: {
          documentId: { $eq: sub },
        },
      });
    });

    const newEngineType = data.engineType;
    const newEngineTypeArray: any = [];
    newEngineType.map((engineType: any) => {
      newEngineTypeArray.push(engineType);
    });
    setEngineTypeInput(newEngineType);

    const queryOfEngineTpye: any[] = [];
    newEngineType.map((sub: any) => {
      queryOfEngineTpye.push({
        engine_type: {
          documentId: { $eq: sub },
        },
      });
    });

    const uses = data.uses;
    const newUses: any = [];
    uses.map((use: any) => {
      newUses.push(use);
    });
    setUsesInput(newUses);

    setSearch({
      subcategories: newSubcategoriesState,
      engineType: newEngineTypeArray,
      uses: newUses,
    });

    const queryOfUses: any[] = [];

    uses.map((sub: any) => {
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
        })}&populate=*&pagination[pageSize]=30&sort=position`,
      {
        method: "GET",
        mode: "cors",
        next: {
          revalidate: 20,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const sortedArray = await arraySort(json.data, "position");
      setData(json.data);
    }

    if (!response.ok) {
      console.log("problém");
    }
  }

  async function Filter(data: any) {
    const formData = new FormData(data);
    console.log(formData);

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

    const newEngineType = formData.getAll("engineType");
    const newEngineTypeArray: any = [];
    newEngineType.map((engineType) => {
      newEngineTypeArray.push(engineType);
    });
    setEngineTypeInput(newEngineType);

    const queryOfEngineTpye: any[] = [];
    newEngineType.map((sub) => {
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

    setSearch({
      subcategories: newSubcategoriesState,
      engineType: newEngineTypeArray,
      uses: newUses,
    });

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
        })}&populate=*&pagination[pageSize]=30&sort=position`,
      {
        method: "GET",
        mode: "cors",
        next: {
          revalidate: 20,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const sortedArray = await arraySort(json.data, "position");
      setData(json.data);
    }

    if (!response.ok) {
      console.log("problém");
    }
  }

  function ListCategories({ json }: { json: any }) {
    if (json.data.length > 0) {
      const newArray = arraySort(json.data, "position");

      return (
        <>
          <div key={"filtrKategorie"} className="flex flex-col gap-3">
            {newArray.map((item: any) => {
              const subcategoriesArray = item.subcategories;
              arraySort(subcategoriesArray, "position");

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
                    {subcategoriesArray.map((subcategory: any) => {
                      let checkedState = false;
                      const checkedArray = search.subcategories.filter(
                        (documentId: string) =>
                          documentId == subcategory.documentId
                      );
                      if (checkedArray.length > 0) {
                        checkedState = true;
                      }
                      return (
                        <label
                          key={subcategory.name + "subkategorie"}
                          className="flex gap-2 items-center cursor-pointer hover:text-primaryHover"
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
    inputs,
    inputName,
  }: {
    items: any;
    inputs: any;
    inputName: string;
  }) {
    if (items.data.length > 0) {
      return (
        <>
          <div key={"uses"} className="flex flex-col">
            {items.data.map((item: any) => {
              let checkedState = false;
              const checkedArray = inputs.filter(
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
                  inputs={search.engineType}
                  inputName="engineType"
                />
              </div>
              <div>
                <SearchHeading text="Určení" />
                <ListFilters
                  items={uses}
                  inputs={search.uses}
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
                    inputs={search.engineType}
                    inputName="engineType"
                  />
                </div>
                <div>
                  <SearchHeading text="Určení" />
                  <ListFilters
                    items={uses}
                    inputs={search.uses}
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
                    timeslots={timeslots}
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
