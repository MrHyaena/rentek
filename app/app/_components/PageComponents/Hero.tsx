import { url } from "inspector";
import React from "react";
import DatepickerBig from "../Datepickers/DatepickerBig";

export default function Hero() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(/hero.webp)`,
          backgroundSize: "cover",
        }}
        className="max-w-wrapper bg-white h-[650px] w-full rounded-2xl"
      >
        <div className="w-full h-full bg-linear-90 from-overlay to-transparent rounded-2xl p-10 flex justify-start">
          <div className="max-w-[63%] flex flex-col gap-5 justify-center">
            <h1 className="text-textLight">
              Půjčovna techniky v Praze <br />
              Pro každou zahradu
            </h1>
            <p className="text-white text-xl">
              Přestaňte kupovat zbytečně drahé stroje kvůli pár dnům práce
              ročně. <br />
              <span className="font-semibold">
                Vše Vám dovezeme přímo před dům, vysvětlíme obsluhu, a po
                skončení nájmu zase odvezeme.
              </span>
            </p>
            <DatepickerBig />
            <div className="flex items-center gap-3 mt-4">
              <button className="buttonMid">
                Podívejte se do naší nabídky
              </button>
              <button className="buttonMid">Jak to funguje</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
