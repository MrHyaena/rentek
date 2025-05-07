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
    selection: any;
    changed: boolean;
  };
  setDaterange: any;
};

export const DaterangeContext = createContext<DaterangeContextType>({
  daterange: {
    selection: {},
    changed: false,
  },
  setDaterange: () => {},
});

type Props = {
  children?: ReactNode;
};

export function DaterangeContextProvider({ children }: Props) {
  const [daterange, setDaterange] = useState({
    selection: {},
    changed: false,
  });

  useEffect(() => {
    const data: string | null = localStorage.getItem("daterange");
    if (data !== null) {
      const dates = JSON.parse(data);
      console.log(dates);
      console.log(dates.startDate);
      console.log(new Date() < new Date(dates.startDate));

      if (new Date() < new Date(dates.startDate)) {
        setDaterange({ ...daterange, selection: dates, changed: true });
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
