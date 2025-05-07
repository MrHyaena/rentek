import React, { Children, ReactNode } from "react";
import { CartContextProvider } from "../_context/CartContext";
import { DaterangeContextProvider } from "../_context/DaterangeContext";

interface Props {
  children?: ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <DaterangeContextProvider>
      <CartContextProvider>{children}</CartContextProvider>
    </DaterangeContextProvider>
  );
}
