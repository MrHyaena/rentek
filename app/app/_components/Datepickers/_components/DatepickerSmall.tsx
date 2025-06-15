"use client";

import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import DatepickerToggle from "./DatepickerToggle";
import { DaterangeContext } from "@/app/_context/DaterangeContext";
import { format } from "date-fns";
import { truncate } from "fs";

//Functional component datepicker, used for showing date range and toggling date settings
export default function DatepickerSmall() {
  const [toggle, setToggle] = useState<boolean>(false);

  const { daterange } = useContext(DaterangeContext);

  function isValid() {
    if (daterange.endIsValid != false && daterange.startIsValid) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <>
      {toggle && <DatepickerToggle setToggle={setToggle} />}
      <div>
        {" "}
        <div
          className="bg-primary text-white rounded-md px-3 py-3 flex justify-between items-center cursor-pointer"
          onClick={() => {
            setToggle(true);
          }}
        >
          <div className="flex gap-3 items-center justify-center w-full">
            {isValid() ? (
              <>
                <FontAwesomeIcon icon={faCalendar} className="text-2xl" />
                <p className="font-semibold text-base md:text-base">
                  Vyberte časové rozmezí pro vypůjčení
                </p>
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <p className="">
                    Vypůjčení
                    <br className="md:hidden" /> od{" "}
                    <span className="font-semibold">
                      {format(daterange.startDate, "dd.MM.yyy")}{" "}
                      {format(daterange.startDate, "HH:mm")}{" "}
                    </span>
                    do{" "}
                    <span className="font-semibold">
                      {format(daterange.endDate, "dd.MM.yyy")}{" "}
                      {format(daterange.endDate, "HH:mm")}
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <p className="text-start text-sm mt-2 hidden md:block">
          Klikněte pro změnu rozmezí
        </p>
      </div>
    </>
  );
}
