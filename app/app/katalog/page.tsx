import PageHeading from "@/app/_components/Headings/_components/PageHeading";
import React from "react";
import Catalogue from "../_components/Catalogue/_components/Catalogue";
import { Metadata } from "next";

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
  const params = await searchParams;
  return (
    <>
      <PageHeading
        image="/catalogHero.jpg"
        heading="Katalog techniky"
        text="Nejprve vyberte rozmezí datumů, ve kterých si chcete techniku vypůjčit. Ceny a dostupnost se upraví automaticky."
        datepickerExists={true}
      />
      <Catalogue searchParams={params} />
    </>
  );
}
