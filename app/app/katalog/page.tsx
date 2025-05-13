import PageHeading from "@/app/_components/Headings/PageHeading";
import React from "react";
import ProductTab from "../_components/Products/ProductTab";
import ProductTabHorizontal from "../_components/Products/ProductHorizontal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHelmetSafety,
  faLeaf,
  faSeedling,
  faTree,
} from "@fortawesome/free-solid-svg-icons";

export default async function page({
  params,
}: {
  params: Promise<{ kategorie: string }>;
}) {
  type searchHeadingProps = {
    text: string;
  };

  function SearchHeading({ text }: searchHeadingProps) {
    return (
      <p className="font-semibold border-b text-primary border-borderGray pb-1 mb-2 text-lg">
        {text}
      </p>
    );
  }

  type searchSubecategoryProps = {
    text: string;
  };

  function SearchSubcategory({ text }: searchSubecategoryProps) {
    return (
      <label className="flex gap-2 items-center">
        <input type="checkbox" />

        <p>{text}</p>
      </label>
    );
  }

  async function GetItems() {
    let response = await fetch(
      process.env.STRAPI + "/api/items/?populate=coverImage",
      {
        method: "GET",
        mode: "cors",
      }
    );

    const itemsArray: any[] = [];

    const json = await response.json();

    json.data.map((item: any) => {
      itemsArray.push({
        imageUrl: item.coverImage.formats.small.url,
        name: item.name,
        description: item.excerpt,
        id: item.id,
        price: item.basePrice,
        slug: item.slug,
        documentId: item.documentId,
        excerpt: item.excerpt,
      });
    });

    return itemsArray;
  }

  const items = await GetItems();
  return (
    <>
      <PageHeading
        image="/hero.webp"
        heading="Podmínky ochrany osobních údajů"
        text="Na bezpečí vašich dat nám záleží!"
        datepickerExists={true}
      />
      <div className="flex w-full  justify-center p-10">
        <div className="w-full max-w-wrapper grid grid-cols-4 gap-10">
          <div className="col-span-1">
            <div className="min-h-50 border border-borderGray rounded-md p-4 flex flex-col gap-5">
              <p className="text-textPrimary text-2xl font-semibold border-b border-borderGray">
                Filtr
              </p>
              <div>
                <SearchHeading text="Kategorie" />
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="flex gap-2 items-center">
                      <input type="checkbox" />
                      <FontAwesomeIcon
                        icon={faSeedling}
                        className="text-primary"
                      />
                      <p className="font-semibold">Úprava trávníku</p>
                    </label>
                    <div className="pl-5 ml-[6px] border-l border-borderGray">
                      <SearchSubcategory text="Pojízdné sekačky" />
                      <SearchSubcategory text="Křovinořezy" />
                      <SearchSubcategory text="Vertikulátory a kultivátory" />
                      <SearchSubcategory text="Provzdušňovače a mulčovače" />
                    </div>
                  </div>
                  <div>
                    <label className="flex gap-2 items-center">
                      <input type="checkbox" />
                      <FontAwesomeIcon icon={faLeaf} className="text-primary" />
                      <p className="font-semibold">Úprava keřů</p>
                    </label>
                    <div className="pl-5 ml-[6px] border-l border-borderGray">
                      <SearchSubcategory text="Nůžky na živý plot" />
                      <SearchSubcategory text="Příslušenství a nářadí pro úpravu keřů" />
                    </div>
                  </div>
                  <div>
                    <label className="flex gap-2 items-center">
                      <input type="checkbox" />
                      <FontAwesomeIcon icon={faTree} className="text-primary" />
                      <p className="font-semibold">Úprava stromů a dřeva</p>
                    </label>
                    <div className="pl-5 ml-[6px] border-l border-borderGray">
                      <SearchSubcategory text="Řetěžové a vyvětvovací pily" />
                      <SearchSubcategory text="Nůžky na větve" />
                      <SearchSubcategory text="Štípačky na dřevo" />
                      <SearchSubcategory text="Příslušenství a nářadí pro úpravu stromů" />
                    </div>
                  </div>
                  <div>
                    <label className="flex gap-2 items-center">
                      <input type="checkbox" />
                      <FontAwesomeIcon
                        icon={faHelmetSafety}
                        className="text-primary"
                      />
                      <p className="font-semibold">
                        Manuální nářadí a příslušenství
                      </p>
                    </label>
                    <div className="pl-5 ml-[6px] border-l border-borderGray">
                      <SearchSubcategory text="Nůžky, pily, mačety a jiné" />
                      <SearchSubcategory text="Kolečka, vědra a krabice" />
                      <SearchSubcategory text="Štípačky na dřevo" />
                      <SearchSubcategory text="Rukavice, ochranné brýle a jiné pomůcky" />
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
                  <p>Elektrický</p>
                </div>
                <div className="flex gap-2 items-center">
                  <input type="checkbox" />
                  <p>Benzínový</p>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="appearance-auto border-2 w-3 h-3"
                  />
                  <p>Manuální</p>
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
                <SearchHeading text="Výkon" />

                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="appearance-auto border-2 w-3 h-3"
                  />
                  <p>Standardní</p>
                </div>
                <div className="flex gap-2 items-center">
                  <input type="checkbox" />
                  <p>Vysoký</p>
                </div>
              </div>
              <button className="buttonSmall w-full">Vyhledat</button>
            </div>
          </div>
          <div className="col-span-3 flex flex-col gap-5">
            {items.map((item) => {
              return <ProductTabHorizontal item={item} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
