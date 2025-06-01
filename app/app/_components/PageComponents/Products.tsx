"use client";

import React, { useEffect, useState } from "react";
import SectionHeading from "../Headings/SectionHeading";
import ProductTab from "../Products/ProductTab";
import Link from "next/link";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);

  async function getProducts() {
    const itemsArray: any[] = [];
    let response: any;
    try {
      response = await fetch(
        process.env.STRAPI + "/api/items/?filters[popular][$eq]=yes&populate=*",
        {
          method: "GET",
          mode: "cors",
        }
      );

      if (!response.ok) {
        throw Error("Failed fetch (catalogue)");
      }

      const json = await response.json();

      json.data.map((item: any) => {
        itemsArray.push({
          count: 0,
          item: { ...item },
        });
      });
    } catch {
      console.log("Není žádný produkt");
    }
    setProducts([...itemsArray]);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {products.length != 0 && (
        <>
          <div className="w-full max-w-wrapper">
            <SectionHeading
              heading="Populární nářadí a technika"
              firstText=""
              secondText=""
              subheading="Co si půjčují ostatní?"
            />
            <div className="grid md:grid-cols-4 gap-10">
              <div className="md:col-span-3 flex gap-5 overflow-x-scroll pb-3 scrollbar-thumb-primary">
                {products.map((product: any) => {
                  return (
                    <ProductTab
                      product={product}
                      key={"productCatalogue" + product.item.name}
                    />
                  );
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
      )}
    </>
  );
}
