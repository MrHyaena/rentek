"use client";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import cs from "react-date-range/dist/locale";

export default function DatepickerToggle({}) {
  const [month, setMonth] = useState(1);
  const [daysCurrentMonth, setDaysCurrentMonth] = useState([]);
  const [daysFollowingMonth, setDaysFollowingMonth] = useState([]);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  function SetDays(today, monthNow) {
    let firstMonth = new Date(today.getFullYear(), monthNow + 1, 0).getDate();
    let secondMonth = new Date(today.getFullYear(), monthNow + 2, 0).getDate();
    let firstMonthArray = [];
    let secondMonthArray = [];

    for (let i = 1; i < firstMonth + 1; i++) {
      firstMonthArray.push(i);
    }

    for (let i = 1; i < secondMonth + 1; i++) {
      secondMonthArray.push(i);
    }

    setDaysCurrentMonth(firstMonthArray);
    setDaysFollowingMonth(secondMonthArray);
  }

  return (
    <>
      <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-zinc-700/80">
        <div>
          <div className="bg-primary text-textLight p-5 py-6 rounded-t-xl flex justify-between items-center">
            <h5>Vyberte datum</h5>
            <FontAwesomeIcon icon={faXmark} className="text-2xl" />
          </div>
          <DateRange
            className="rounded-b-xl p-5"
            disabledDates={[new Date()]}
            direction="horizontal"
            months={2}
            color="#7c9e39"
            rangeColors={["#7c9e39"]}
            editableDateInputs={true}
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
            showDateDisplay={true}
          />
        </div>
        ;
      </div>
    </>
  );
}
