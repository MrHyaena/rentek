import React from "react";
import DatepickerBig from "../../Datepickers/_components/DatepickerBig";
import Link from "next/link";
import HowDoesItWorkButton from "./HowDoesItWorkButton";
import DatepickerSmall from "../../Datepickers/_components/DatepickerSmall";

export default function Hero() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(/hero.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "right",
        }}
        className="max-w-wrapper bg-white w-full rounded-2xl flex items-stretch relative"
      >
        <div className="w-full h-full bg-linear-90 from-overlay from-20% to-transparent rounded-2xl md:p-10 md:py-20 p-7  flex justify-start">
          <div className="md:max-w-[80%] lg:max-w-[67%] flex flex-col gap-5 justify-center">
            <h1 className="text-textLight">
              Půjčovna zahradní techniky
              <br />v Praze a okolí
            </h1>
            <p className="text-white md:text-xl text-base">
              Přestaňte kupovat zbytečně drahé stroje kvůli pár dnům práce
              ročně. <br />
              <span className="font-semibold">
                Vše Vám dovezeme přímo před dům, vysvětlíme obsluhu a po
                skončení nájmu se znovu o vše postaráme.
              </span>
            </p>
            <div className="hidden md:block">
              <DatepickerBig />
            </div>
            <div className="block md:hidden">
              <DatepickerSmall />
            </div>
            <div className="flex md:flex-row flex-col md:items-center gap-3 mt-4">
              <Link href={"/katalog"} className="buttonMid">
                Podívejte se do naší nabídky
              </Link>
              <HowDoesItWorkButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
