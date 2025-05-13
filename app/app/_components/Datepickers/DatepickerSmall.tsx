"use client";

import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import DatepickerToggle from "./DatepickerToggle";
import { DaterangeContext } from "@/app/_context/DaterangeContext";
import { format } from "date-fns";
import { truncate } from "fs";

export default function DatepickerSmall() {
  const [toggle, setToggle] = useState<Boolean>(false);

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
          <div className="flex gap-3 items-center justify-start w-full">
            {isValid() ? (
              <>
                <FontAwesomeIcon icon={faCalendar} className="text-2xl" />
                <div className="text-lg">
                  <p className="font-semibold">
                    Vyberte časové rozmezí pro vypůjčení
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <p className="">
                    Vypůjčení od{" "}
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
        <p className="text-start text-sm mt-2">Klikněte pro změnu rozmezí</p>
      </div>
    </>
  );
}
