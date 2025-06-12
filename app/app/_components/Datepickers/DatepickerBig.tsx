"use client";

import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import DatepickerToggle from "./DatepickerToggle";
import { DaterangeContext } from "@/app/_context/DaterangeContext";
import { format } from "date-fns";

//Functional component datepicker, used for showing date range and toggling date settings
export default function DatepickerBig() {
  const [toggle, setToggle] = useState<boolean>(false);

  const { daterange } = useContext(DaterangeContext);

  function isValid() {
    if (daterange.startIsValid == true && daterange.endIsValid == true) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      {toggle && <DatepickerToggle setToggle={setToggle} />}
      <div
        className="bg-primary text-white rounded-md px-5 py-3 flex justify-between items-center cursor-pointer"
        onClick={() => {
          setToggle(true);
        }}
      >
        <div className="flex gap-3 items-center w-full">
          {isValid() ? (
            <>
              <div className="text-lg w-full grid grid-cols-2 items-center gap-10">
                <div className="">
                  <p className="font-semibold text-lg">Datum doručení:</p>
                  <p className="">
                    {format(daterange.startDate, "dd.MM.yyy")} v{" "}
                    {format(daterange.startDate, "HH:mm")}
                  </p>
                </div>
                <div className="border-l-2 pl-5 border-primaryHover/50">
                  <p className="font-semibold text-lg">Datum vyzvednutí:</p>
                  <p>
                    {format(daterange.endDate, "dd.MM.yyy")} v{" "}
                    {format(daterange.endDate, "HH:mm")}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faCalendar} className="text-2xl" />
              <div className="text-lg text-start">
                <p className="font-semibold">
                  Vyberte časové rozmezí pro vypůjčení
                </p>
                <p>
                  Po nastavení datumu se přizpůsobí ceny a dostupnost zboží na
                  celém webu
                </p>
              </div>
            </>
          )}
        </div>
        <button className="buttonSmall">Nastavit</button>
      </div>
    </>
  );
}
