import React from "react";
import SectionHeading from "../Headings/SectionHeading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { truncate } from "fs";
import ProductTab from "../Products/ProductTab";
import Link from "next/link";

export default function Products({
  popularProducts,
}: {
  popularProducts: any[];
}) {
  const item = {
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
          heading="Populární nářadí a technika"
          firstText=""
          secondText=""
          subheading="Co si půjčují ostatní?"
        />
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-3 flex gap-5 overflow-x-scroll pb-3">
            {popularProducts.map((product: any) => {
              return <ProductTab product={product} />;
            })}
          </div>
          <div
            style={{
              backgroundImage: `url(/mower.webp)`,
              backgroundSize: "cover",
            }}
            className="col-span-1 w-full h-full bg-amber-200 rounded-xl"
          >
            <div className="w-full h-full bg-linear-180 from-overlay/70 to-transparent rounded-xl p-8 flex flex-col justify-start items-start gap-5 scroll-x-gutter">
              <h4 className="text-textLight">Všechna technika</h4>
              <Link href={"/katalog"} className="buttonMid">
                Ukázat nabídku
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
