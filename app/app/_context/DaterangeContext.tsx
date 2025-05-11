"use client";

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

  useEffect(() => {
    const data: string | null = localStorage.getItem("daterange");
    if (data !== null) {
      const dates = JSON.parse(data);

      if (new Date() < new Date(dates.startDate)) {
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

  return (
    <DaterangeContext.Provider value={{ daterange, setDaterange }}>
      {children}
    </DaterangeContext.Provider>
  );
}
