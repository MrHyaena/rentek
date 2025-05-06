import React, { Children, ReactNode } from "react";
import { CartContextProvider } from "../_context/CartContext";

interface Props {
  children?: ReactNode;
}

export default function Providers({ children }: Props) {
  return <CartContextProvider>{children}</CartContextProvider>;
}
