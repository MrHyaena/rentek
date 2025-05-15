import React from "react";

import CartForm from "../_components/Cart/CartForm";
import DatepickerSmall from "../_components/Datepickers/DatepickerSmall";
import DatepickerBig from "../_components/Datepickers/DatepickerBig";

export default async function page() {
  async function GetAdditions() {
    let response = await fetch(
      process.env.STRAPI +
        "/api/items/?filters[pricingType][$eq]=product&populate=*",
      {
        method: "GET",
        mode: "cors",
      }
    );

    const itemsArray: any[] = [];

    const json = await response.json();

    json.data.map((item: any) => {
      itemsArray.push({
        count: 0,
        item: { ...item },
      });
    });

    return itemsArray;
  }

  let newAdditions = await GetAdditions();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-10 gap-5">
      <div className="w-full max-w-wrapper flex flex-col gap-5">
        <h3>Košík</h3>
        <p className="">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
          placeat, cupiditate, pariatur deleniti neque itaque quisquam
          recusandae dolore quo illum assumenda quam est excepturi eaque
          perspiciatis iure tempora, amet fugit!
        </p>{" "}
        <DatepickerBig />
      </div>
      <CartForm newAdditions={newAdditions} />
    </div>
  );
}
