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
    <div className="min-h-screen flex flex-col items-center justify-start md:p-10 p-5 gap-5 md:mt-0 mt-30">
      <div className="w-full max-w-wrapper flex flex-col gap-5">
        <h3>Košík</h3>
        <p className="">
          Níže můžete vidět všechno vybrané zboží. Abychom předešli zahlcení
          našich služeb z nekalých důvodů, vyžadujeme při objednání vždy
          zaplatit 5 procent z ceny celkové objednávky. O tuto částku se
          samozřejmě při převzetí sníží celková doplácená suma.
        </p>{" "}
        <div className="hidden md:block">
          <DatepickerBig />
        </div>
        <div className="md:hidden">
          <DatepickerSmall />
        </div>
      </div>
      <CartForm newAdditions={newAdditions} />
    </div>
  );
}
