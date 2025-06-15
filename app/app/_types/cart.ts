import { Dispatch, SetStateAction } from "react";
import { Item } from "./global";

export type CartState = [] | [Item];

export interface CartContextType {
  cart: CartState;
  setCart: Dispatch<SetStateAction<CartState>>;
}
