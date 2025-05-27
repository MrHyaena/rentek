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

  function SearchHeading({ text }: { text: string }) {
    return (
      <p className="font-semibold border-b text-primary border-borderGray pb-1 mb-2 text-lg">
        {text}
      </p>
    );
  }

  const [filtrToggle, setFiltrToggle] = useState<boolean>(false);

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
    console.log(formData.getAll("subcategories"));

    const subcategories = formData.getAll("subcategories");
    const queryOrSubcategories: any[] = [];

    subcategories.map((sub) => {
      queryOrSubcategories.push({
        subcategories: {
          documentId: { $eq: sub },
        },
      });
    });

    const specifications = formData.getAll("specifications");
    const queryOrSpecifications: any[] = [];

    specifications.map((sub) => {
      queryOrSpecifications.push({
        specifications: {
          documentId: { $eq: sub },
        },
      });
    });

    const uses = formData.getAll("uses");
    const queryOrUses: any[] = [];

    uses.map((sub) => {
      queryOrUses.push({
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
            $or: queryOrSubcategories,
          },
          { $or: queryOrSpecifications },
          { $or: queryOrUses },
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
                        setter={setPojizdneSekacky}
                        state={pojizdneSekacky}
                      />
                      <SearchSubcategory
                        value="kubile3os5ohdznhd6mwzglp"
                        categoryType="subcategories"
                        text="Křovinořezy"
                        setter={setKrovinorezy}
                        state={krovinorezy}
                      />
                      <SearchSubcategory
                        value="voar2ydhmjmsv67qnwexrtfq"
                        categoryType="subcategories"
                        text="Vertikulátory a kultivátory"
                        setter={setVertikulatory}
                        state={vertikulatory}
                      />
                      <SearchSubcategory
                        value="yn15ya18q9oren1tomenj1qa"
                        categoryType="subcategories"
                        text="Provzdušňovače a mulčovače"
                        setter={setProvzdusnovace}
                        state={provzdusnovace}
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
                        setter={setNuzkyNaPlot}
                        state={nuzkyNaPlot}
                      />
                      <SearchSubcategory
                        value="bslnpe1894ajoyrgsi2p1vpz"
                        categoryType="subcategories"
                        text="Příslušenství a nářadí pro úpravu keřů"
                        setter={setPrislusenstviKere}
                        state={prislusenstviKere}
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
                        setter={setRetezovePily}
                        state={retezovePily}
                      />
                      <SearchSubcategory
                        value="rl1xd2g2pbgk9solkr0k1aeo"
                        categoryType="subcategories"
                        text="Nůžky na větve"
                        setter={setNuzkyNaVetve}
                        state={nuzkyNaVetve}
                      />
                      <SearchSubcategory
                        value="uy0p67uov9trc6z29vefr32e"
                        categoryType="subcategories"
                        text="Štípačky na dřevo"
                        setter={setStipackyNaDrevo}
                        state={stipackyNaDrevo}
                      />
                      <SearchSubcategory
                        value="cx7kuahbibil6osjr0wyvccf"
                        categoryType="subcategories"
                        text="Příslušenství a nářadí pro úpravu stromů"
                        setter={setPrislusenstviStromy}
                        state={prislusenstviStromy}
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
                        setter={setNuzkyPilyMacety}
                        state={nuzkyPilyMacety}
                      />
                      <SearchSubcategory
                        value="k4h6f38xlvuxc3lh59j57vw0"
                        categoryType="subcategories"
                        text="Kolečka, vědra a krabice"
                        setter={setKoleckaVedraKrabice}
                        state={koleckaVedraKrabice}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <SearchHeading text="Typ pohonu" />
                <SearchSubcategory
                  value="bf4ngqecws94nqtv5dlbyuve"
                  categoryType="specifications"
                  text="Elektrický motor"
                  setter={setElektrickyMotor}
                  state={elektrickyMotor}
                />
                <SearchSubcategory
                  value="u076llljnkr3g2oolm3g5z50"
                  categoryType="specifications"
                  text="Benzínový motor"
                  setter={setBenzinovyMotor}
                  state={benzinovyMotor}
                />
                <SearchSubcategory
                  value="ca7w1imw40v3syl7178f0oan"
                  categoryType="specifications"
                  text="Manuální nářadí"
                  setter={setManualniNarad}
                  state={manualniNaradi}
                />
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
                          setter={setPojizdneSekacky}
                          state={pojizdneSekacky}
                        />
                        <SearchSubcategory
                          value="kubile3os5ohdznhd6mwzglp"
                          categoryType="subcategories"
                          text="Křovinořezy"
                          setter={setKrovinorezy}
                          state={krovinorezy}
                        />
                        <SearchSubcategory
                          value="voar2ydhmjmsv67qnwexrtfq"
                          categoryType="subcategories"
                          text="Vertikulátory a kultivátory"
                          setter={setVertikulatory}
                          state={vertikulatory}
                        />
                        <SearchSubcategory
                          value="yn15ya18q9oren1tomenj1qa"
                          categoryType="subcategories"
                          text="Provzdušňovače a mulčovače"
                          setter={setProvzdusnovace}
                          state={provzdusnovace}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="flex gap-2 items-center">
                        <FontAwesomeIcon
                          icon={faLeaf}
                          className="text-primary"
                        />
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
                          setter={setNuzkyNaPlot}
                          state={nuzkyNaPlot}
                        />
                        <SearchSubcategory
                          value="bslnpe1894ajoyrgsi2p1vpz"
                          categoryType="subcategories"
                          text="Příslušenství a nářadí pro úpravu keřů"
                          setter={setPrislusenstviKere}
                          state={prislusenstviKere}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="flex gap-2 items-center">
                        <FontAwesomeIcon
                          icon={faTree}
                          className="text-primary"
                        />
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
                          setter={setRetezovePily}
                          state={retezovePily}
                        />
                        <SearchSubcategory
                          value="rl1xd2g2pbgk9solkr0k1aeo"
                          categoryType="subcategories"
                          text="Nůžky na větve"
                          setter={setNuzkyNaVetve}
                          state={nuzkyNaVetve}
                        />
                        <SearchSubcategory
                          value="uy0p67uov9trc6z29vefr32e"
                          categoryType="subcategories"
                          text="Štípačky na dřevo"
                          setter={setStipackyNaDrevo}
                          state={stipackyNaDrevo}
                        />
                        <SearchSubcategory
                          value="cx7kuahbibil6osjr0wyvccf"
                          categoryType="subcategories"
                          text="Příslušenství a nářadí pro úpravu stromů"
                          setter={setPrislusenstviStromy}
                          state={prislusenstviStromy}
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
                          setter={setNuzkyPilyMacety}
                          state={nuzkyPilyMacety}
                        />
                        <SearchSubcategory
                          value="k4h6f38xlvuxc3lh59j57vw0"
                          categoryType="subcategories"
                          text="Kolečka, vědra a krabice"
                          setter={setKoleckaVedraKrabice}
                          state={koleckaVedraKrabice}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <SearchHeading text="Typ pohonu" />
                  <SearchSubcategory
                    value="bf4ngqecws94nqtv5dlbyuve"
                    categoryType="specifications"
                    text="Elektrický motor"
                    setter={setElektrickyMotor}
                    state={elektrickyMotor}
                  />
                  <SearchSubcategory
                    value="u076llljnkr3g2oolm3g5z50"
                    categoryType="specifications"
                    text="Benzínový motor"
                    setter={setBenzinovyMotor}
                    state={benzinovyMotor}
                  />
                  <SearchSubcategory
                    value="ca7w1imw40v3syl7178f0oan"
                    categoryType="specifications"
                    text="Manuální nářadí"
                    setter={setManualniNarad}
                    state={manualniNaradi}
                  />
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
          <div className="lg:col-span-3 flex flex-col gap-5">
            {data.map((item: any) => {
              return <ProductTabHorizontal item={item} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
