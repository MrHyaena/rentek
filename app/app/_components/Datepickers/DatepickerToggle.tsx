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
  const [daysCurrentMonth, setDaysCurrentMonth] = useState<Date[]>([]);
  const [daysLastMonth, setDaysLastMonth] = useState<number[]>([]);

  const [fieldPick, setFieldPick] = useState(1);
  const [fieldColors, setFieldColors] = useState(["white", "#f4f4f5"]);
  const [firstDate, setFirstDate] = useState(new Date());
  const [secondDate, setSecondDate] = useState<any>(new Date());
  const [clientFirstDate, setClientFirstDate] = useState("-");
  const [clientSecondDate, setClientSecondDate] = useState("-");
  const { setDaterange } = useContext(DaterangeContext);

  const [dayRange, setDayRange] = useState<{
    firstYear: any;
    firstMonth: any;
    firstDay: any;
    secondYear: any;
    secondMonth: any;
    secondDay: any;
  }>({
    firstYear: null,
    firstMonth: null,
    firstDay: null,
    secondYear: null,
    secondMonth: null,
    secondDay: null,
  });

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
    //Number of days in current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    //Last weeekday of last month
    let lastDayOfLastMonth = new Date(currentYear, currentMonth, 0).getDay();
    if (lastDayOfLastMonth == 0) {
      lastDayOfLastMonth = 7;
    }
    const daysArray: Date[] = [];
    const lastDaysArray: number[] = [];

    for (let i = 1; i < daysInMonth + 1; i++) {
      daysArray.push(new Date(currentYear, currentMonth, i));
      console.log(new Date(currentYear, currentMonth, i));
    }

    for (let n = 1; n < lastDayOfLastMonth + 1; n++) {
      lastDaysArray.push(n);
    }

    setDaysLastMonth(lastDaysArray);
    setDaysCurrentMonth(daysArray);
  }, []);

  //setting days in month on month change
  useEffect(() => {
    //Number of days in current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    //Last weeekday of last month
    let lastDayOfLastMonth = new Date(currentYear, currentMonth, 0).getDay();
    if (lastDayOfLastMonth == 0) {
      lastDayOfLastMonth = 7;
    }
    const daysArray: Date[] = [];
    const lastDaysArray: number[] = [];

    for (let i = 1; i < daysInMonth + 1; i++) {
      daysArray.push(new Date(currentYear, currentMonth, i));
      console.log(new Date(currentYear, currentMonth, i));
    }

    for (let n = 1; n < lastDayOfLastMonth + 1; n++) {
      lastDaysArray.push(n);
    }

    setDaysLastMonth(lastDaysArray);
    setDaysCurrentMonth(daysArray);
  }, [currentMonth]);

  //Pick a date when clicking on date
  function pickDate(index: any) {
    const newDate = new Date(currentYear, currentMonth, index + 1);
    const clientDate =
      index + 1 + "." + (newDate.getMonth() + 1) + "." + newDate.getFullYear();
    console.log(index);
    //First date rules
    if (fieldPick == 1) {
      setFirstDate(newDate);
      setSecondDate(null);

      setClientFirstDate(clientDate);
      setClientSecondDate("-");

      setFieldPick(2);
      setDayRange({
        firstYear: newDate.getFullYear(),
        firstMonth: newDate.getMonth(),
        firstDay: index,
        secondYear: null,
        secondMonth: null,
        secondDay: null,
      });
    }

    //Second date rules
    if (fieldPick == 2) {
      if (clientFirstDate == "-") {
        setFieldPick(1);
      }

      if (clientFirstDate !== "-") {
        if (newDate > firstDate) {
          setSecondDate(newDate);
          setClientSecondDate(clientDate);
          setFieldPick(1);
          setDayRange({
            ...dayRange,
            secondYear: newDate.getFullYear(),
            secondMonth: newDate.getMonth(),
            secondDay: index,
          });
        } else {
          setClientFirstDate(clientDate);
          setFieldPick(2);
          setDayRange({
            firstYear: newDate.getFullYear(),
            firstMonth: newDate.getMonth(),
            firstDay: index,
            secondYear: null,
            secondMonth: null,
            secondDay: null,
          });
        }
      }
    }
  }

  function changeMonth(direction: string) {
    if (direction == "plus") {
      if (currentMonth == 11) {
        setCurrentYear(currentYear + 1);
        setCurrentMonth(0);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }

    if (direction == "minus") {
      if (currentMonth == 0) {
        setCurrentYear(currentYear - 1);

        setCurrentMonth(11);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  }

  function dateIsActive(date: Date) {
    const day = date.getDate() - 1;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const stringDate = day + 1 + "." + month + "." + year;

    const dayTwo = firstDate.getDate();
    const monthTwo = firstDate.getMonth();
    const yearTwo = firstDate.getFullYear();

    const dateOne = new Date(year, month - 1, day + 1);
    const dateTwo = new Date(yearTwo, monthTwo, dayTwo);

    if (dateOne >= firstDate && dateOne <= secondDate) {
      return true;
    }
    if (clientFirstDate == stringDate) {
      return true;
    }
  }

  return (
    <>
      <div className="w-screen h-screen fixed top-0 left-0 flex items-start pt-50 justify-center bg-zinc-700/80">
        <div>
          <div className="bg-primary text-textLight p-5 py-6 rounded-t-md justify-between items-center flex">
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
                  className="cursor-pointer"
                  icon={faChevronLeft}
                  onClick={() => {
                    changeMonth("minus");
                  }}
                />
                <p className="font-semibold">
                  {monthsOfYear[currentMonth]} {currentYear}
                </p>
                <FontAwesomeIcon
                  className="cursor-pointer"
                  icon={faChevronRight}
                  onClick={() => {
                    changeMonth("plus");
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
                  let getDay = day.getDate();

                  return (
                    <>
                      <div
                        onClick={() => {
                          console.log(index);
                          pickDate(index);
                        }}
                      >
                        {dateIsActive(day) ? (
                          <p className="bg-primary/40 h-10 flex items-center justify-center hover:bg-primary/40 rounded-md cursor-pointer">
                            {getDay}
                          </p>
                        ) : (
                          <p className="bg-zinc-100 h-10 flex items-center justify-center hover:bg-primary/40 rounded-md cursor-pointer">
                            {getDay}
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
