import PageHeading from "@/app/_components/Headings/PageHeading";
import React from "react";
import Catalogue from "../_components/PageComponents/Catalogue";

export default async function page() {
  async function GetItems() {
    let response = await fetch(
      process.env.STRAPI +
        "/api/items/?populate=*&filters[pricingType][$eq]=rental",
      {
        method: "GET",
        mode: "cors",
      }
    );

    const itemsArray: any[] = [];

    const json = await response.json();

    json.data.map((item: any) => {
      itemsArray.push({
        ...item,
      });
    });

    return itemsArray;
  }

  const items = await GetItems();
  return (
    <>
      <PageHeading
        image="/hero.webp"
        heading="Katalog techniky"
        text="Nejprve vyberte rozmezí datumů, ve kterých si chcete techniku vypůjčit. Ceny a dostupnost se upraví automaticky."
        datepickerExists={true}
      />
      <Catalogue items={items} />
    </>
  );
}
