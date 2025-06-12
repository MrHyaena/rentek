import React, { Children, ReactNode } from "react";
import { CartContextProvider } from "../_context/CartContext";
import { DaterangeContextProvider } from "../_context/DaterangeContext";
import { SearchContextProvider } from "../_context/SearchContext";

interface Props {
  [key: string]: any;
  children?: ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <DaterangeContextProvider>
      <CartContextProvider>
        <SearchContextProvider>{children}</SearchContextProvider>
      </CartContextProvider>
    </DaterangeContextProvider>
  );
}
