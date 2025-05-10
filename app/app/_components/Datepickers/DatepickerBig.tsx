"use client";

import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import DatepickerToggle from "./DatepickerToggle";
import { DaterangeContext } from "@/app/_context/DaterangeContext";
import { format } from "date-fns";

export default function DatepickerBig() {
  const [toggle, setToggle] = useState<Boolean>(false);
  const [firstDate, setFirstDate] = useState<String | null>(null);
  const [secondDate, setSecondDate] = useState<String | null>(null);

  const { daterange } = useContext(DaterangeContext);

  useEffect(() => {
    if (daterange.changed) {
      if (daterange.startDate != null) {
        setFirstDate(format(daterange.startDate, "dd.MM.yyyy"));
      } else if (daterange.startDate == null) {
        setFirstDate("Nenastaveno");
      }
      if (daterange.endDate != null) {
        setSecondDate(format(daterange.endDate, "dd.MM.yyyy"));
      } else if (daterange.endDate == null) {
        setSecondDate("Nenastaveno");
      }
    }
  }, [daterange]);

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
          {!daterange.changed && (
            <>
              <FontAwesomeIcon icon={faCalendar} className="text-2xl" />
              <div className="text-lg">
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
          {daterange.changed && (
            <div className="text-lg w-full grid grid-cols-2 items-center gap-10">
              <div className="">
                <p className="font-semibold text-lg">Datum doručení:</p>
                <p className="">{firstDate}</p>
              </div>
              <div className="border-l pl-5 border-primaryHover">
                <p className="font-semibold text-lg">Datum vyzvednutí:</p>
                <p>{secondDate}</p>
              </div>
            </div>
          )}
        </div>
        <button className="buttonSmall">Nastavit</button>
      </div>
    </>
  );
}
