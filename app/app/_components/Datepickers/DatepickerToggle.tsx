"use client";

import {
  faChevronLeft,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDays, set } from "date-fns";
import React, { Dispatch, useContext, useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { cs } from "date-fns/locale/cs";
import { DaterangeContext } from "@/app/_context/DaterangeContext";

type Props = {
  setToggle: Dispatch<Boolean>;
};

export default function DatepickerToggle({ setToggle }: Props) {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [daysCurrentMonth, setDaysCurrentMonth] = useState<number[]>([]);
  const [daysLastMonth, setDaysLastMonth] = useState<number[]>([]);
  const [fieldPick, setFieldPick] = useState(1);
  const [fieldColors, setFieldColors] = useState(["white", "#f4f4f5"]);
  const [firstDate, setFirstDate] = useState(new Date());
  const [secondDate, setSecondDate] = useState(new Date());
  const [clientFirstDate, setClientFirstDate] = useState("-");
  const [clientSecondDate, setClientSecondDate] = useState("-");

  const { setDaterange } = useContext(DaterangeContext);

  const [dayRange, setDayRange] = useState<number[]>([]);

  const daysOfWeek = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"];
  const monthsOfYear = [
    "Leden",
    "Únor",
    "Březen",
    "Duben",
    "Květen",
    "Červen",
    "Červenec",
    "Srpen",
    "Září",
    "Řijen",
    "Listopad",
    "Prosinec",
  ];

  //changing focus
  useEffect(() => {
    setFieldColors([fieldColors[1], fieldColors[0]]);
  }, [fieldPick]);

  //first populate
  useEffect(() => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInLastMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysLeftFromLastMonth = daysInLastMonth - firstDayOfMonth;
    const daysArray: number[] = [];
    const lastDaysArray: number[] = [];

    for (let n = daysLeftFromLastMonth + 1; n < daysInLastMonth; n++) {
      lastDaysArray.push(n);
    }

    let i = 1;
    while (i < daysInMonth + 1) {
      daysArray.push(i);
      i++;
    }

    setDaysLastMonth(lastDaysArray);
    setDaysCurrentMonth(daysArray);
  }, []);

  useEffect(() => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInLastMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysLeftFromLastMonth = daysInLastMonth - firstDayOfMonth;
    const daysArray: number[] = [];
    const lastDaysArray: number[] = [];

    for (let n = daysLeftFromLastMonth + 1; n < daysInLastMonth; n++) {
      lastDaysArray.push(n);
    }

    let i = 1;
    while (i < daysInMonth + 1) {
      daysArray.push(i);
      i++;
    }

    console.log(daysArray);
    console.log(lastDaysArray);

    setDaysLastMonth(lastDaysArray);
    setDaysCurrentMonth(daysArray);
  }, [currentMonth]);

  return (
    <>
      <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-zinc-700/80">
        <div>
          <div className="bg-primary text-textLight p-5 py-6 rounded-t-md justify-between items-center hidden lg:flex">
            <h5>Zvolte datum doručení a odvozu</h5>
            <FontAwesomeIcon
              icon={faXmark}
              className="text-2xl cursor-pointer"
              onClick={() => {
                setToggle(false);
              }}
            />
          </div>
          <div className="min-h-[500px] min-w-[700px] grid grid-cols-3 bg-white rounded-b-md">
            <div className="col-span-2 border-r border-borderGray p-5">
              <div className="grid grid-cols-2 justify-items-stretch gap-5 py-2">
                <div>
                  <p className="mb-2 font-semibold">Datum doručení</p>
                  <p
                    style={{ backgroundColor: fieldColors[0] }}
                    className="p-2 border border-zinc-300 text-textPrimary rounded-md cursor-pointer"
                    onClick={() => {
                      setFieldPick(1);
                    }}
                  >
                    {clientFirstDate}
                  </p>
                </div>
                <div>
                  <p className="mb-2 font-semibold">Datum odvozu</p>
                  <p
                    style={{ backgroundColor: fieldColors[1] }}
                    className="p-2 border border-zinc-300 text-textPrimary  rounded-md cursor-pointer"
                    onClick={() => {
                      setFieldPick(2);
                    }}
                  >
                    {clientSecondDate}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center py-5">
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  onClick={() => {
                    setCurrentMonth(currentMonth - 1);
                  }}
                />
                <p className="font-semibold">
                  {monthsOfYear[currentMonth]} {currentYear}
                </p>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  onClick={() => {
                    setCurrentMonth(currentMonth + 1);
                  }}
                />
              </div>
              <div className="grid grid-cols-7 justify-items-stretch gap-2 mb-2">
                {daysOfWeek.map((item) => {
                  return (
                    <>
                      <p className="font-semibold pb-2 border-b border-borderGray text-center">
                        {item}
                      </p>
                    </>
                  );
                })}
              </div>
              <div className="grid grid-cols-7 justify-items-stretch text-center gap-2">
                {daysLastMonth.map((day) => {
                  return (
                    <>
                      <span className="text-zinc-400 "></span>
                    </>
                  );
                })}
                {daysCurrentMonth.map((day, index) => {
                  return (
                    <>
                      <div
                        onClick={() => {
                          if (fieldPick == 1) {
                            if (index < dayRange[1]) {
                              const newDate = new Date(
                                currentYear,
                                currentMonth,
                                index + 1
                              );
                              console.log(dayRange);
                              setDayRange([index, dayRange[1]]);
                              setClientFirstDate(
                                index +
                                  1 +
                                  "." +
                                  currentMonth +
                                  "." +
                                  currentYear
                              );
                              setFirstDate(newDate);
                              setFieldPick(2);
                            }
                            if (index > dayRange[1]) {
                              const newDate = new Date(
                                currentYear,
                                currentMonth,
                                index + 1
                              );
                              console.log(dayRange);

                              setDayRange([dayRange[0], index]);

                              setClientSecondDate(
                                index +
                                  1 +
                                  "." +
                                  currentMonth +
                                  "." +
                                  currentYear
                              );
                              setSecondDate(newDate);
                              setFieldPick(1);
                            }
                          }
                          if (fieldPick == 2) {
                            if (index > dayRange[0]) {
                              const newDate = new Date(
                                currentYear,
                                currentMonth,
                                index + 1
                              );
                              console.log(dayRange);

                              setDayRange([dayRange[0], index]);

                              setClientSecondDate(
                                index +
                                  1 +
                                  "." +
                                  currentMonth +
                                  "." +
                                  currentYear
                              );
                              setSecondDate(newDate);
                              setFieldPick(1);
                            }
                            if (index < dayRange[0]) {
                              const newDate = new Date(
                                currentYear,
                                currentMonth,
                                index + 1
                              );
                              console.log(dayRange);
                              setDayRange([index, dayRange[1]]);
                              setClientFirstDate(
                                index +
                                  1 +
                                  "." +
                                  currentMonth +
                                  "." +
                                  currentYear
                              );
                              setFirstDate(newDate);
                              setFieldPick(2);
                            }
                          }
                        }}
                      >
                        {index >= dayRange[0] && index <= dayRange[1] ? (
                          <p className="bg-primary/40 h-10 flex items-center justify-center hover:bg-primary/40 rounded-md cursor-pointer">
                            {day}
                          </p>
                        ) : (
                          <p className="bg-zinc-100 h-10 flex items-center justify-center hover:bg-primary/40 rounded-md cursor-pointer">
                            {day}
                          </p>
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            <div></div>
          </div>
        </div>
        ;
      </div>
    </>
  );
}
