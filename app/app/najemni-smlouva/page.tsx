import React from "react";
import PageHeading from "../_components/Headings/PageHeading";
import Link from "next/link";
import { IoIosPaper } from "react-icons/io";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nájemní smlouva",
  description:
    "Podívejte se na vzorovou smlouvu o zapůjčení zahradní techniky. Přehledná ukázka podmínek, rozsahu odpovědnosti a povinností nájemce.",
};

export default function page() {
  return (
    <>
      <PageHeading
        image="/contract.jpg"
        heading="Nájemní smlouva"
        text=""
        datepickerExists={false}
      />
      <div className="flex w-full justify-center py-15 p-5">
        <div className="w-full max-w-wrapper flex flex-col gap-5 items-start">
          <p>Kliknutím na tlačítko níže se dostanete na PDF smlouvu.</p>
          <Link
            href={"/Nájemní smlouva.pdf"}
            className="flex gap-5 items-center text-primaryHover buttonSmall"
          >
            <IoIosPaper /> Nájemní smlouva
          </Link>
        </div>
      </div>
    </>
  );
}
