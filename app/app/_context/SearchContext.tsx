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

type SearchContextType = {
  search: { subcategories: any[]; uses: any[]; engineType: any[] };
  setSearch: Dispatch<
    SetStateAction<{ subcategories: []; uses: []; engineType: [] }>
  >;
};

export const SearchContext = createContext<SearchContextType>({
  search: { subcategories: [], uses: [], engineType: [] },
  setSearch: () => {},
});

type Props = {
  children?: ReactNode;
};

type StateType = { subcategories: []; uses: []; engineType: [] };

export function SearchContextProvider({ children }: Props) {
  const [search, setSearch] = useState<StateType>({
    subcategories: [],
    uses: [],
    engineType: [],
  });

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}
