import React from "react";

import CartForm from "../_components/Cart/CartForm";
import DatepickerSmall from "../_components/Datepickers/DatepickerSmall";
import DatepickerBig from "../_components/Datepickers/DatepickerBig";
import { redirect } from "next/navigation";
import Link from "next/link";
import * as qs from "qs";

export default async function page() {
  let response: any;
  const newAdditions: any[] = [];

  try {
    response = await fetch(
      process.env.STRAPI +
        "/api/items/?filters[pricingType][$eq]=product&populate=*",
      {
        method: "GET",
        mode: "cors",
        next: {
          revalidate: 20,
        },
      }
    );
    if (!response.ok) {
      throw Error("Fetch failed");
    }
    const json = await response.json();
    if (json.data != null) {
      if (json.data.length > 0) {
        json.data.map((item: any) => {
          newAdditions.push({
            count: 0,
            item,
          });
        });
      }
    }
  } catch (error) {
    console.log(error);
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

  const timeslots = await GetTimeslots();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start md:p-10 p-5 gap-5 md:mt-0 mt-30">
      <div className="w-full max-w-wrapper flex flex-col gap-5">
        <h3>Košík</h3>
      </div>
      <CartForm newAdditions={newAdditions} timeslots={timeslots} />
    </div>
  );
}
