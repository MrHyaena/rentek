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
    startDate: Date | null;
    endDate: Date | null;

    changed: boolean;
  };
  setDaterange: any;
};

type Props = {
  children?: ReactNode;
};

export const DaterangeContext = createContext<DaterangeContextType>({
  daterange: {
    startDate: null,
    endDate: null,
    changed: false,
  },
  setDaterange: () => {},
});

export function DaterangeContextProvider({ children }: Props) {
  const [daterange, setDaterange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
    changed: boolean;
  }>({
    startDate: null,
    endDate: null,
    changed: false,
  });

  useEffect(() => {
    const data: string | null = localStorage.getItem("daterange");
    if (data !== null) {
      const dates = JSON.parse(data);

      if (new Date() < new Date(dates.startDate)) {
        setDaterange({
          startDate: dates.startDate,
          endDate: dates.endDate,
          changed: true,
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
