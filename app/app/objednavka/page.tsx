import React, { Suspense } from "react";
import PageHeading from "../_components/Headings/_components/PageHeading";
import OrderSum from "../_components/ThankYouPage/_components/OrderSum";
import { Metadata } from "next";

type Props = any;

export const metadata: Metadata = {
  title: "Vaše objednávka",
  description:
    "Zkontrolujte detaily své objednávky půjčené zahradní techniky. Termín, vybavení, cena a doručovací údaje.",
};

export default function page({}: Props) {
  return (
    <>
      <PageHeading
        image="/contract.jpg"
        heading="Objednávka"
        text="Níže najdete vaši objednávku"
        datepickerExists={false}
      />
      <Suspense>
        <OrderSum />
      </Suspense>
    </>
  );
}
