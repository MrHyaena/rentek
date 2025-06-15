import { Dispatch, SetStateAction } from "react";
import { item } from "./global";

export type CartState = any[];

export interface CartContextType {
  cart: CartState;
  setCart: Dispatch<SetStateAction<CartState>>;
}
