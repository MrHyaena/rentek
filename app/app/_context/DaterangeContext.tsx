"use client";

import { differenceInDays } from "date-fns";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import React from "react";

type DaterangeContextType = {
  daterange: {
    startDate: Date;
    endDate: Date;
    startIsValid: boolean;
    endIsValid: boolean;
  };
  setDaterange: any;
  saleIndex: number;
  numberOfDays: number;
};

type Props = {
  children?: ReactNode;
};

export const DaterangeContext = createContext<DaterangeContextType>({
  daterange: {
    startDate: new Date(),
    endDate: new Date(),
    startIsValid: false,
    endIsValid: false,
  },
  setDaterange: () => {},
  saleIndex: 1,
  numberOfDays: 1,
});

export function DaterangeContextProvider({ children }: Props) {
  const [daterange, setDaterange] = useState<{
    startDate: Date;
    endDate: Date;
    startIsValid: boolean;
    endIsValid: boolean;
  }>({
    startDate: new Date(),
    endDate: new Date(),
    startIsValid: false,
    endIsValid: false,
  });
  const [numberOfDays, setNumberOfDays] = useState<number>(1);
  const [saleIndex, setSaleIndex] = useState<number>(1);

  useEffect(() => {
    const data: string | null = localStorage.getItem("daterange");
    if (data !== null) {
      const dates = JSON.parse(data);

      if (new Date() < new Date(dates.startDate)) {
        const daysRange = differenceInDays(dates.endDate, dates.startDate);
        setNumberOfDays(daysRange);

        let newSaleIndex: number = 0;

        if (numberOfDays == 1) {
          newSaleIndex = 0;
        } else if (numberOfDays <= 7) {
          newSaleIndex = 0.9;
        } else if (numberOfDays <= 21) {
          newSaleIndex = 0.85;
        } else if (numberOfDays > 21) {
          newSaleIndex = 0.8;
        }

        setSaleIndex(newSaleIndex);

        setDaterange({
          startDate: dates.startDate,
          endDate: dates.endDate,
          startIsValid: dates.startIsValid,
          endIsValid: dates.endIsValid,
        });
      }

      if (new Date() > new Date(dates.startDate)) {
        localStorage.removeItem("daterange");
      }
    }
  }, []);

  useEffect(() => {
    const daysRange = differenceInDays(daterange.endDate, daterange.startDate);
    setNumberOfDays(daysRange);

    let newSaleIndex: number = 0;

    if (numberOfDays == 1) {
      newSaleIndex = 0;
    } else if (numberOfDays <= 7) {
      newSaleIndex = 0.9;
    } else if (numberOfDays <= 21) {
      newSaleIndex = 0.85;
    } else if (numberOfDays > 21) {
      newSaleIndex = 0.8;
    }

    setSaleIndex(newSaleIndex);
  }, [daterange]);

  return (
    <DaterangeContext.Provider
      value={{ daterange, setDaterange, saleIndex, numberOfDays }}
    >
      {children}
    </DaterangeContext.Provider>
  );
}
