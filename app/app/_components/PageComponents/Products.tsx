import React from "react";
import SectionHeading from "../Headings/SectionHeading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { truncate } from "fs";
import ProductTab from "../Products/ProductTab";

export default function Products() {
  let item = {
    image: "/hero.webp",
    name: "Sekačka",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea officiis quisquam nisi eos neque expedita magnam ex? Similique, fuga explicabo? Provident ipsam reprehenderit incidunt? Quos, debitis veritatis. Animi, ad amet!",
    link: "/",
    price: 100,
  };

  return (
    <>
      <div className="w-full max-w-wrapper">
        <SectionHeading
          heading="Populární nářadí a stroje"
          firstText=""
          secondText=""
          subheading="Co si půjčují ostatní?"
        />
        <div className="grid grid-cols-4 gap-10">
          <div className="col-span-3 flex gap-5 overflow-x-scroll">
            <ProductTab item={item} />
            <ProductTab item={item} />
            <ProductTab item={item} />
            <ProductTab item={item} />
            <ProductTab item={item} />
            <ProductTab item={item} />
          </div>
          <div
            style={{
              backgroundImage: `url(/hero.webp)`,
              backgroundSize: "cover",
            }}
            className="col-span-1 h-full bg-amber-200 rounded-xl"
          >
            <div className="w-full h-full bg-linear-180 from-overlay/70 to-transparent rounded-xl p-8 flex flex-col justify-start items-start gap-5">
              <h4 className="text-textLight">Všechny nástroje</h4>
              <button className="buttonMid">Ukázat nabídku</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
