import { CartContext } from "@/app/_context/CartContext";
import React, { useContext } from "react";

export function addToCartFunction(cart: any, setCart: any, item: any) {
  localStorage.setItem("cart", JSON.stringify([...cart, item]));
  setCart([...cart, item]);
  return;
}

export function removeFromCartFunction(cart: any, setCart: any, item: any) {
  const newCart = cart;

  function checkId(deletedItem: any) {
    console.log(deletedItem.id, item.id);
    return deletedItem.id === item.id;
  }
  const deletedIndex = newCart.findIndex(checkId);
  console.log(deletedIndex);

  if (deletedIndex != -1) {
    newCart.splice(deletedIndex, 1);
  }
  localStorage.setItem("cart", JSON.stringify([...newCart]));

  setCart([...newCart]);

  return;
}
