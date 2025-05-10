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
          backgroundPosition: "right",
        }}
        className="max-w-wrapper bg-white w-full rounded-2xl flex items-stretch"
      >
        <div className="w-full h-full bg-linear-90 from-overlay from-20% to-transparent rounded-2xl p-10 py-20 flex justify-start">
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
              <button className="bg-transparent border-2 px-5 py-3 text-lg font-semibold rounded-md text-textLight cursor-pointer hover:bg-zinc-500/20 transition-all ease-in-out">
                Jak to funguje
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
