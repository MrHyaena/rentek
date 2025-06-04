import PageHeading from "@/app/_components/Headings/PageHeading";
import React from "react";
import Catalogue from "../_components/PageComponents/Catalogue";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import arraySort from "array-sort";

export const metadata: Metadata = {
  title: "Katalog techniky",
  description:
    "Prohlédněte si kompletní katalog zahradní techniky k zapůjčení. Široký výběr, férové ceny a snadná rezervace online. Vše pro vaši zahradu.",
};

export default async function page() {
  async function GetItems() {
    let response: any;

    try {
      response = await fetch(
        process.env.STRAPI +
          "/api/items/?populate=*&filters[pricingType][$eq]=rental",
        {
          method: "GET",
          mode: "cors",
          next: {
            revalidate: 10,
          },
        }
      );

      if (!response.ok) {
        throw Error("Failed fetch (catalogue)");
      }
    } catch {
      return [];
    }

    const itemsArray: any[] = [];

    const json = await response.json();

    json.data.map((item: any) => {
      itemsArray.push({
        ...item,
      });
    });

    await arraySort(itemsArray, "position");

    return itemsArray;
  }

  const items = await GetItems();
  return (
    <>
      <PageHeading
        image="/catalogHero.jpg"
        heading="Katalog techniky"
        text="Nejprve vyberte rozmezí datumů, ve kterých si chcete techniku vypůjčit. Ceny a dostupnost se upraví automaticky."
        datepickerExists={true}
      />
      <Catalogue items={items} />
    </>
  );
}
