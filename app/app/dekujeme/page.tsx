import React from "react";
import PageHeading from "../_components/Headings/PageHeading";
import OrderSum from "../_components/ThankYouPage/OrderSum";

type Props = any;

export default function page({}: Props) {
  return (
    <>
      <PageHeading
        image="/contract.jpg"
        heading="Děkujeme za objednávku"
        text="V tuto chvíli začínáme vše připravovat"
        datepickerExists={false}
      />
      <OrderSum />
    </>
  );
}
