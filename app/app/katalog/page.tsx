import PageHeading from "@/app/_components/Headings/PageHeading";
import React from "react";
import Catalogue from "../_components/PageComponents/Catalogue";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import arraySort from "array-sort";
import * as qs from "qs";

export const metadata: Metadata = {
  title: "Katalog techniky",
  description:
    "Prohlédněte si kompletní katalog zahradní techniky k zapůjčení. Široký výběr, férové ceny a snadná rezervace online. Vše pro vaši zahradu.",
};

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string | string[] | undefined;
  }>;
}) {
  async function GetItems() {
    let response: any;

    const { subcategory } = await searchParams;

    let url =
      process.env.STRAPI +
      `/api/items/?pagination[pageSize]=30&populate=*&filters[pricingType][$eq]=rental&sort=position`;

    if (subcategory != undefined) {
      const query = await {
        filters: {
          $and: [
            { pricingType: { $eq: "rental" } },
            {
              subcategories: {
                documentId: { $eq: subcategory },
              },
            },
          ],
        },
      };
      url =
        process.env.STRAPI +
        `/api/items/?populate=*&${qs.stringify(query, {
          encodeValuesOnly: true,
        })}`;
    }

    try {
      response = await fetch(url, {
        method: "GET",
        mode: "cors",
        next: {
          revalidate: 10,
        },
      });

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

    return itemsArray;
  }

  async function GetTimeslots() {
    const nowDate = await new Date();

    const query = await {
      filters: {
        delivery: {
          $gt: nowDate.toISOString(),
        },
      },
    };
    const response = await fetch(
      process.env.STRAPI +
        `/api/timeslots?populate=*&${qs.stringify(query, {
          encodeValuesOnly: true,
        })}`,
      {
        method: "GET",
        mode: "cors",
        next: {
          revalidate: 10,
        },
      }
    );

    const json = await response.json();

    return json.data;
  }

  const items = await GetItems();
  const timeslots = await GetTimeslots();
  return (
    <>
      <PageHeading
        image="/catalogHero.jpg"
        heading="Katalog techniky"
        text="Nejprve vyberte rozmezí datumů, ve kterých si chcete techniku vypůjčit. Ceny a dostupnost se upraví automaticky."
        datepickerExists={true}
      />
      <Catalogue items={items} timeslots={timeslots} />
    </>
  );
}
