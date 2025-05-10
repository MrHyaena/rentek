"use client";

import {
  faChevronLeft,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, useContext, useEffect, useState } from "react";
import { DaterangeContext } from "@/app/_context/DaterangeContext";

type Props = {
  setToggle: Dispatch<Boolean>;
};

export default function DatepickerToggle({ setToggle }: Props) {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [daysCurrentMonth, setDaysCurrentMonth] = useState<Date[]>([]);
  const [daysLastMonth, setDaysLastMonth] = useState<Date[]>([]);

  const [fieldPick, setFieldPick] = useState(1);
  const [fieldColors, setFieldColors] = useState(["white", "#f4f4f5"]);
  const [firstDate, setFirstDate] = useState(new Date());
  const [secondDate, setSecondDate] = useState<any>(new Date());
  const [clientFirstDate, setClientFirstDate] = useState("-");
  const [clientSecondDate, setClientSecondDate] = useState("-");
  const { daterange, setDaterange } = useContext(DaterangeContext);

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

  //populate states from context

  //changing focus
  useEffect(() => {
    setFieldColors([fieldColors[1], fieldColors[0]]);
  }, [fieldPick]);

  //first populate
  useEffect(() => {
    //Number of days in current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInLastMonth = new Date(currentYear, currentMonth, 0).getDate();

    //Last weeekday of last month
    let lastDayOfLastMonth = new Date(currentYear, currentMonth, 0).getDay();
    if (lastDayOfLastMonth == 0) {
      lastDayOfLastMonth = 7;
    }

    const daysArray: Date[] = [];
    const lastDaysArray: Date[] = [];

    for (let i = 1; i < daysInMonth + 1; i++) {
      daysArray.push(new Date(currentYear, currentMonth, i));
    }

    for (
      let n = daysInLastMonth - lastDayOfLastMonth + 1;
      n < daysInLastMonth + 1;
      n++
    ) {
      lastDaysArray.push(new Date(currentYear, currentMonth, n));
    }

    setDaysLastMonth(lastDaysArray);
    setDaysCurrentMonth(daysArray);
  }, []);

  //setting days in month on month change
  useEffect(() => {
    //Number of days in current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInLastMonth = new Date(currentYear, currentMonth, 0).getDate();

    //Last weeekday of last month
    let lastDayOfLastMonth = new Date(currentYear, currentMonth, 0).getDay();
    if (lastDayOfLastMonth == 0) {
      lastDayOfLastMonth = 7;
    }

    const daysArray: Date[] = [];
    const lastDaysArray: Date[] = [];

    for (let i = 1; i < daysInMonth + 1; i++) {
      daysArray.push(new Date(currentYear, currentMonth, i));
    }

    for (
      let n = daysInLastMonth - lastDayOfLastMonth;
      n < daysInLastMonth;
      n++
    ) {
      console.log(daysInLastMonth);
      console.log(lastDayOfLastMonth);
      console.log(n);
      lastDaysArray.push(new Date(currentYear, currentMonth, n));
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

      localStorage.setItem(
        "daterange",
        JSON.stringify({ startDate: newDate, endDate: null, changed: true })
      );

      setDaterange({ startDate: newDate, endDate: null, changed: true });

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
          setDaterange({
            startDate: firstDate,
            endDate: newDate,
            changed: true,
          });

          localStorage.setItem(
            "daterange",
            JSON.stringify({
              startDate: firstDate,
              endDate: newDate,
              changed: true,
            })
          );

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
          setDaterange({
            startDate: newDate,
            endDate: null,
            changed: true,
          });
          localStorage.setItem(
            "daterange",
            JSON.stringify({
              startDate: newDate,
              endDate: null,
              changed: true,
            })
          );
          setFirstDate(newDate);
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
    } else if (clientFirstDate == stringDate) {
      return true;
    } else {
      return false;
    }
  }

  function GenerateDay(day: Date, index: Number) {
    let monthDay = day.getDate();
    let weekDay = day.getDay();
    if (weekDay == 0) {
      weekDay = 7;
    }

    if (dateIsActive(day)) {
      if (weekDay > 5) {
        return (
          <p className="bg-primary/60 h-10 flex items-center justify-center hover:bg-primary/40 rounded-md cursor-pointer">
            {monthDay}
          </p>
        );
      }
      if (weekDay < 6) {
        return (
          <p
            onClick={() => {
              pickDate(index);
            }}
            className="bg-primary/40 h-10 flex items-center justify-center hover:bg-primary/40 rounded-md cursor-pointer"
          >
            {monthDay}
          </p>
        );
      }
    }

    if (!dateIsActive(day)) {
      if (weekDay > 5) {
        return (
          <p className="bg-zinc-300 h-10 flex items-center justify-center hover:bg-primary/40 rounded-md cursor-pointer">
            {monthDay}
          </p>
        );
      }
      if (weekDay < 6) {
        return (
          <p
            onClick={() => {
              pickDate(index);
            }}
            className="bg-zinc-100 h-10 flex items-center justify-center hover:bg-primary/40 rounded-md cursor-pointer"
          >
            {monthDay}
          </p>
        );
      }
    }

    return (
      <>
        <div
          onClick={() => {
            pickDate(index);
          }}
        >
          {dateIsActive(day) ? (
            <p className="bg-primary/40 h-10 flex items-center justify-center hover:bg-primary/40 rounded-md cursor-pointer">
              {monthDay}
            </p>
          ) : (
            <p className="bg-zinc-100 h-10 flex items-center justify-center hover:bg-primary/40 rounded-md cursor-pointer">
              {monthDay}
            </p>
          )}
        </div>
      </>
    );
  }

  function GenerateLastMonthDay(day: Date) {
    let monthDay = day.getDate();
    let weekDay = day.getDay();
    if (weekDay == 0) {
      weekDay = 7;
    }

    return (
      <p className="bg-zinc-50 text-zinc-400 h-10 flex items-center justify-center rounded-md"></p>
    );
  }

  return (
    <>
      <div
        onClick={() => {
          setToggle(false);
        }}
        className="w-screen h-screen fixed top-0 left-0 flex items-start pt-50 justify-center bg-zinc-700/80"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="bg-primary text-textLight p-5 py-6 rounded-t-md justify-between items-center flex">
            <h5>Zvolte datum doručení a odvozu</h5>
            <FontAwesomeIcon
              icon={faXmark}
              className="text-2xl cursor-pointer hover:bg-primaryHover p-2 rounded-md"
              onClick={() => {
                setToggle(false);
              }}
            />
          </div>
          <div className=" max-h-[500px] min-w-[800px] grid grid-cols-4 bg-white rounded-b-md">
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
                  return GenerateLastMonthDay(day);
                })}
                {daysCurrentMonth.map((day, index) => {
                  return GenerateDay(day, index);
                })}
              </div>
            </div>
            <div className=" col-span-2 py-2 px-5 ">
              <div
                style={{ scrollbarGutter: "stable" }}
                className="overflow-auto pr-2
                 grid grid-cols-2 justify-items-stretch gap-5 py-5"
              >
                <div>
                  <p className="mb-2 font-semibold">Čas doručení</p>
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
                  <p className="mb-2 font-semibold">Čas odvozu</p>
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
              <div className="pr-2 max-h-[320px] overflow-y-scroll gap-5 grid grid-cols-2 justify-items-stretch text-center">
                <div className=" flex flex-col items-stretch gap-3">
                  <button className="p-3  border rounded-md border-borderGray">
                    8:00
                  </button>
                  <button className="p-3 border rounded-md border-borderGray">
                    9:00
                  </button>
                  <button className="p-3 border rounded-md border-borderGray">
                    10:00
                  </button>
                  <button className="p-3 border rounded-md border-borderGray">
                    11:00
                  </button>
                  <button className="p-3 border rounded-md border-borderGray">
                    12:00
                  </button>
                  <button className="p-3 border rounded-md border-borderGray">
                    13:00
                  </button>
                  <button className="p-3 border rounded-md border-borderGray">
                    14:00
                  </button>
                  <button className="p-3 border rounded-md border-borderGray">
                    15:00
                  </button>
                  <button className="p-3 border rounded-md border-borderGray">
                    17:00
                  </button>
                  <button className="p-3 border rounded-md border-borderGray">
                    18:00
                  </button>
                  <button className="p-3 border rounded-md border-borderGray">
                    19:00
                  </button>
                  <button className="p-3 border rounded-md border-borderGray">
                    20:00
                  </button>
                </div>
                <div className=" flex flex-col items-stretch gap-3">
                  <button className="p-3  border rounded-md border-borderGray">
                    8:00
                  </button>
                  <button className="p-3 border rounded-md border-borderGray">
                    9:00
                  </button>
                  <button className="p-3 border rounded-md border-borderGray">
                    10:00
                  </button>
                  <button className="p-3 border rounded-md border-borderGray">
                    11:00
                  </button>
                  <button className="p-3 border rounded-md border-borderGray">
                    12:00
                  </button>
                  <button className="p-3 border rounded-md border-borderGray">
                    13:00
                  </button>
                  <button className="p-3 border rounded-md border-borderGray">
                    14:00
                  </button>
                  <button className="p-3 border rounded-md border-borderGray">
                    15:00
                  </button>
                  <button className="p-3 border rounded-md border-borderGray">
                    17:00
                  </button>
                  <button className="p-3 border rounded-md border-borderGray">
                    18:00
                  </button>
                  <button className="p-3 border rounded-md border-borderGray">
                    19:00
                  </button>
                  <button className="p-3 border rounded-md border-borderGray">
                    20:00
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        ;
      </div>
    </>
  );
}
