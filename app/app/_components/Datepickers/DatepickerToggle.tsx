"use client";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDays } from "date-fns";
import React, { Dispatch, useContext, useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { cs } from "date-fns/locale/cs";
import { DaterangeContext } from "@/app/_context/DaterangeContext";

type Props = {
  setToggle: Dispatch<Boolean>;
};

export default function DatepickerToggle({ setToggle }: Props) {
  const [month, setMonth] = useState(1);
  const [daysCurrentMonth, setDaysCurrentMonth] = useState([]);
  const [daysFollowingMonth, setDaysFollowingMonth] = useState([]);
  const { setDaterange } = useContext(DaterangeContext);

  const [state, setState] = useState<any>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  return (
    <>
      <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-zinc-700/80">
        <div>
          <div className="bg-primary text-textLight p-5 py-6 rounded-t-xl justify-between items-center hidden lg:flex">
            <h5>Zvolte datum doručení a odvozu</h5>
            <FontAwesomeIcon
              icon={faXmark}
              className="text-2xl cursor-pointer"
              onClick={() => {
                setToggle(false);
              }}
            />
          </div>
          <div className="bg-white px-5 pt-5 grid-cols-2 text-center hidden lg:grid">
            <p className="text-lg font-semibold text-textPrimary">
              Datum doručení
            </p>
            <p className="text-lg font-semibold text-textPrimary">
              Datum odvozu
            </p>
          </div>
          <div className="lg:hidden block rounded-xl p-5 bg-white">
            <p className="pb-3 font-semibold">Zvolte datum doručení a odvozu</p>
            <DateRange
              className=" w-full"
              direction="vertical"
              months={1}
              color="#7c9e39"
              rangeColors={["#7c9e39"]}
              editableDateInputs={true}
              onChange={(item) => {
                console.log(item);
                localStorage.setItem(
                  "daterange",
                  JSON.stringify(item.selection)
                );
                setDaterange({ selection: item.selection, changed: true });
                setState([item.selection]);
              }}
              moveRangeOnFirstSelection={false}
              ranges={[state[0]]}
              locale={cs}
              showDateDisplay={true}
              monthDisplayFormat="MMMM yyyy"
            />
          </div>
          <div className="hidden lg:block">
            <DateRange
              className="rounded-b-xl p-5"
              direction="horizontal"
              months={2}
              color="#7c9e39"
              rangeColors={["#7c9e39"]}
              editableDateInputs={true}
              onChange={(item) => {
                console.log(item);
                localStorage.setItem(
                  "daterange",
                  JSON.stringify(item.selection)
                );
                setDaterange({ selection: item.selection, changed: true });
                setState([item.selection]);
              }}
              moveRangeOnFirstSelection={false}
              ranges={[state[0]]}
              locale={cs}
              showDateDisplay={true}
              monthDisplayFormat="MMMM yyyy"
            />
          </div>
        </div>
        ;
      </div>
    </>
  );
}
