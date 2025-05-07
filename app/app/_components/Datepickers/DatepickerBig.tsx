"use client";

import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import DatepickerToggle from "./DatepickerToggle";

export default function DatepickerBig() {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <DatepickerToggle />
      <div
        className="bg-primary text-white rounded-md px-5 py-3 flex justify-between items-center cursor-pointer"
        onClick={() => {
          setToggle(true);
        }}
      >
        <div className="flex gap-3 items-center">
          <FontAwesomeIcon icon={faCalendar} className="text-2xl" />
          <div className="text-lg">
            <p className="font-semibold">
              Vyberte časové rozmezí pro vypůjčení
            </p>
            <p>Ukázat ceny a dostupnost</p>
          </div>
        </div>
        <FontAwesomeIcon icon={faChevronRight} className="text-2xl" />
      </div>
    </>
  );
}
