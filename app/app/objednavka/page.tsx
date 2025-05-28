import React, { Suspense } from "react";
import PageHeading from "../_components/Headings/PageHeading";
import OrderSum from "../_components/ThankYouPage/OrderSum";

type Props = any;

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
