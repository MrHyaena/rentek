"use client";

import {
  faChevronLeft,
  faChevronRight,
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, useContext, useEffect, useState } from "react";
import { DaterangeContext } from "@/app/_context/DaterangeContext";
import { format, isAfter, isBefore, isEqual } from "date-fns";

type Props = {
  setToggle: Dispatch<Boolean>;
};

export default function DatepickerToggle({ setToggle }: Props) {
  //Fixed and initial values
  const currentDate = new Date();
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

  //Picking date
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [daysCurrentMonth, setDaysCurrentMonth] = useState<Date[]>([]);
  const [daysLastMonth, setDaysLastMonth] = useState<Date[]>([]);

  //Properties for dates picking
  const [fieldPick, setFieldPick] = useState(1);
  const [fieldColors, setFieldColors] = useState(["white", "#f4f4f5"]);

  //Properties for timepicking
  const [timesDelivery, setTimesDelivery] = useState<Date[]>([]);
  const [timesPickup, setTimesPickup] = useState<Date[]>([]);

  const [rangeIsValid, setRangeIsValid] = useState(false);

  const { daterange, setDaterange } = useContext(DaterangeContext);

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
      lastDaysArray.push(new Date(currentYear, currentMonth, n));
    }

    setDaysLastMonth(lastDaysArray);
    setDaysCurrentMonth(daysArray);
  }, [currentMonth]);

  //Pick a date when clicking on date
  function pickDate(index: any) {
    const newDate = new Date(currentYear, currentMonth, index + 1);

    //First date rules
    if (fieldPick == 1) {
      localStorage.setItem(
        "daterange",
        JSON.stringify({
          startDate: newDate,
          endDate: new Date(),
          startIsValid: false,
          endIsValid: false,
        })
      );

      setDaterange({
        startDate: newDate,
        endDate: daterange.endDate,
        startIsValid: false,
        endIsValid: false,
      });

      setFieldPick(2);
    }

    //Second date rules
    if (fieldPick == 2) {
      if (daterange.startDate == null) {
        setFieldPick(1);
      }

      if (daterange.startDate !== null) {
        if (newDate >= daterange.startDate) {
          setDaterange({
            startDate: daterange.startDate,
            endDate: newDate,
            startIsValid: daterange.startIsValid,
            endIsValid: false,
          });

          localStorage.setItem(
            "daterange",
            JSON.stringify({
              startDate: daterange.startDate,
              endDate: newDate,
              startIsValid: daterange.startIsValid,
              endIsValid: false,
            })
          );

          setFieldPick(1);
        } else if (newDate < daterange.startDate) {
          setDaterange({
            startDate: newDate,
            endDate: new Date(),
            startIsValid: false,
            endIsValid: false,
          });
          localStorage.setItem(
            "daterange",
            JSON.stringify({
              startDate: newDate,
              endDate: new Date(),
              startIsValid: false,
              endIsValid: false,
            })
          );
          setFieldPick(2);
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
    let startDate = new Date(daterange.startDate);
    let endDate = new Date(daterange.endDate);

    const year = startDate.getFullYear();
    const month = startDate.getMonth();
    const day = startDate.getDate();

    const secondYear = endDate.getFullYear();
    const secondMonth = endDate.getMonth();
    const secondDay = endDate.getDate();

    if (
      isAfter(date, daterange.startDate) &&
      isBefore(date, daterange.endDate)
    ) {
      return true;
    }

    if (isEqual(date, new Date(year, month, day))) {
      return true;
    }

    if (isEqual(date, new Date(secondYear, secondMonth, secondDay))) {
      return true;
    }
  }

  function GenerateDay(day: Date, index: Number) {
    let monthDay = day.getDate();
    let weekDay = day.getDay();
    if (weekDay == 0) {
      weekDay = 7;
    }

    if (day > new Date()) {
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
      } else if (!dateIsActive(day)) {
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
    } else if (day < new Date()) {
      return (
        <p className="bg-zinc-50 text-zinc-300  h-10 flex items-center justify-center  rounded-md cursor-pointer">
          {monthDay}
        </p>
      );
    }
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

  //Times of the delivery and pickup
  useEffect(() => {
    fetchTimeslots();
    async function fetchTimeslots() {
      let response = await fetch(process.env.STRAPI + "/api/timeslots", {
        method: "GET",
        mode: "cors",
      });

      const json = await response.json();
      const data: any[] = json.data;

      const deliveryTimesArray: Date[] = [];
      const pickupTimesArray: Date[] = [];

      const { startDate, endDate } = daterange;

      if (startDate != null) {
        const startYearNew = new Date(startDate);
        for (let i = 8; i < 21; i++) {
          const date = new Date(
            startYearNew.getFullYear(),
            startYearNew.getMonth(),
            startYearNew.getDate(),
            i
          );
          data.map((slot: any) => {
            if (isEqual(slot.delivery, date)) {
              console.log(true);
            } else if (!isEqual(slot.delivery, date)) {
              deliveryTimesArray.push(date);
            }
          });
        }
      }

      if (endDate != null) {
        const endDateNew = new Date(endDate);
        for (let i = 8; i < 21; i++) {
          const date = new Date(
            endDateNew.getFullYear(),
            endDateNew.getMonth(),
            endDateNew.getDate(),
            i
          );
          data.map((slot: any) => {
            if (isEqual(slot.pickup, date)) {
              console.log(true);
            } else if (!isEqual(slot.delivery, date)) {
              pickupTimesArray.push(date);
            }
          });
        }
        setTimesDelivery(deliveryTimesArray);
        setTimesPickup(pickupTimesArray);
      }
    }
  }, [daterange]);

  function PickDeliveryTime(time: Date) {
    let startDate = new Date(daterange.startDate);

    const year = startDate.getFullYear();
    const month = startDate.getMonth();
    const day = startDate.getDate();

    if (
      isAfter(time, new Date(year, month, day, 7)) &&
      isBefore(time, new Date(year, month, day, 21))
    ) {
      setDaterange({
        startDate: time,
        endDate: daterange.endDate,
        startIsValid: true,
        endIsValid: daterange.endIsValid,
      });
      localStorage.setItem(
        "daterange",
        JSON.stringify({
          startDate: time,
          endDate: daterange.endDate,
          startIsValid: true,
          endIsValid: daterange.endIsValid,
        })
      );
    } else {
      setDaterange({
        startDate: time,
        endDate: daterange.endDate,
        startIsValid: false,
        endIsValid: daterange.endIsValid,
      });
    }
  }

  function GenerateDeliveryTimes(time: Date) {
    if (isEqual(time, daterange.startDate)) {
      return (
        <button
          onClick={() => {
            PickDeliveryTime(time);
          }}
          className="p-3  border bg-primary/40 rounded-md border-borderGray hover:bg-primary/40 cursor-pointer"
        >
          {format(time, "H:mm")}
        </button>
      );
    } else {
      return (
        <button
          onClick={() => {
            PickDeliveryTime(time);
          }}
          className="p-3  border rounded-md border-borderGray hover:bg-primary/40 cursor-pointer"
        >
          {format(time, "H:mm")}
        </button>
      );
    }
  }

  function PickPickupTime(time: Date) {
    let endDate = new Date(daterange.endDate);

    const year = endDate.getFullYear();
    const month = endDate.getMonth();
    const day = endDate.getDate();

    if (
      isAfter(time, new Date(year, month, day, 7)) &&
      isBefore(time, new Date(year, month, day, 21))
    ) {
      setDaterange({
        startDate: daterange.startDate,
        endDate: time,
        startIsValid: daterange.startIsValid,
        endIsValid: true,
      });
      localStorage.setItem(
        "daterange",
        JSON.stringify({
          startDate: daterange.startDate,
          endDate: time,
          startIsValid: daterange.startIsValid,
          endIsValid: true,
        })
      );
    } else {
      console.log(false);
      setDaterange({
        startDate: daterange.startDate,
        endDate: time,
        startIsValid: daterange.startIsValid,
        endIsValid: false,
      });
    }
  }

  function GeneratePickupTimes(time: Date) {
    if (isEqual(time, daterange.endDate)) {
      return (
        <button
          onClick={() => {
            PickPickupTime(time);
          }}
          className="p-3  border bg-primary/40 rounded-md border-borderGray hover:bg-primary/40 cursor-pointer"
        >
          {format(time, "H:mm")}
        </button>
      );
    } else {
      return (
        <button
          onClick={() => {
            PickPickupTime(time);
          }}
          className="p-3  border rounded-md border-borderGray hover:bg-primary/40 cursor-pointer"
        >
          {format(time, "H:mm")}
        </button>
      );
    }
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
          <div className=" max-h-[500px] min-w-[800px] grid grid-cols-4 bg-white border-b border-borderGray">
            <div className="col-span-2 border-r border-borderGray p-5">
              <div className="grid grid-cols-2 justify-items-stretch gap-5 py-2 text-center">
                <div>
                  <p className="mb-2 font-semibold">Datum doručení</p>
                  <p
                    style={{ backgroundColor: fieldColors[0] }}
                    className="p-2 border border-zinc-300 text-textPrimary rounded-md cursor-pointer"
                    onClick={() => {
                      setFieldPick(1);
                    }}
                  >
                    {daterange.startDate != null
                      ? format(daterange.startDate, "dd.MM.yyyy")
                      : "-"}
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
                    {daterange.endDate != null
                      ? format(daterange.endDate, "dd.MM.yyyy")
                      : "-"}
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
                 grid grid-cols-2 justify-items-stretch gap-5 py-5 text-center"
              >
                <div>
                  <p className="mb-2 font-semibold">Čas doručení</p>
                  <p
                    className="p-2 border border-zinc-300 text-textPrimary rounded-md cursor-pointer"
                    onClick={() => {
                      setFieldPick(1);
                    }}
                  >
                    {daterange.startIsValid
                      ? format(daterange.startDate, "HH:mm")
                      : "Nezvoleno"}
                  </p>
                </div>
                <div>
                  <p className="mb-2 font-semibold">Čas odvozu</p>
                  <p
                    className="p-2 border border-zinc-300 text-textPrimary  rounded-md cursor-pointer"
                    onClick={() => {
                      setFieldPick(2);
                    }}
                  >
                    {daterange.endIsValid
                      ? format(daterange.endDate, "HH:mm")
                      : "Nezvoleno"}
                  </p>
                </div>
              </div>
              <div className="pr-2 max-h-[320px] overflow-y-scroll gap-5 grid grid-cols-2 justify-items-stretch text-center">
                <div className=" flex flex-col items-stretch gap-3">
                  {timesDelivery != null &&
                    timesDelivery.map((time) => {
                      return GenerateDeliveryTimes(time);
                    })}
                </div>
                <div className=" flex flex-col items-stretch gap-3">
                  {timesPickup != null &&
                    timesPickup.map((time) => {
                      return GeneratePickupTimes(time);
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className=" max-h-[500px] min-w-[800px] bg-white rounded-b-md">
            <div className="p-5 text-center">
              {daterange.endIsValid && daterange.startIsValid && (
                <>
                  <p>
                    Techniku si budete půjčovat od{" "}
                    <span className="font-semibold">
                      {format(daterange.startDate, "dd.MM.yyyy HH:mm")}
                    </span>{" "}
                    od{" "}
                    <span className="font-semibold">
                      {format(daterange.endDate, "dd.MM.yyyy HH:mm")}
                    </span>
                  </p>
                </>
              )}
              {!daterange.startIsValid && (
                <>
                  <div className="flex items-center justify-center gap-3">
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      className="text-amber-500"
                    />
                    <p className=" font-semibold">Doplňte čas doručení</p>
                  </div>
                </>
              )}
              {!daterange.endIsValid && (
                <>
                  <div className="flex items-center justify-center gap-3">
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      className="text-amber-500"
                    />
                    <p className="font-semibold">Doplňte čas odvozu</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        ;
      </div>
    </>
  );
}
