import React from "react";

import CartForm from "../_components/Cart/CartForm";
import DatepickerSmall from "../_components/Datepickers/DatepickerSmall";
import DatepickerBig from "../_components/Datepickers/DatepickerBig";
import { redirect } from "next/navigation";
import Link from "next/link";

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

  console.log(newAdditions);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start md:p-10 p-5 gap-5 md:mt-0 mt-30">
      {newAdditions.length == 0 ? (
        <>
          <div className="w-full max-w-wrapper flex flex-col items-start gap-5">
            <h3>Košík</h3>
            <p className="">
              V tuto chvíli zatím v košíku nemáte žádnou techniku. Pokud si
              chcete techniku objednat, nejprve ji do košíku vložte.
            </p>{" "}
            <Link href={"/katalog"} className="buttonSmall">
              Přejít do katalogu
            </Link>
          </div>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
