import { CartContext } from "@/app/_context/CartContext";
import React, { useContext } from "react";

export function addToCartFunction(cart: any, setCart: any, item: any) {
  const newCart = cart;

  if (newCart.length == 0) {
    console.log("cart length 0");

    setCart([{ count: 1, item: item }]);
    localStorage.setItem("cart", JSON.stringify([{ count: 1, item: item }]));
    return;
  } else if (newCart.length > 0) {
    console.log(newCart);
    const itemIndex = newCart.findIndex((cartItem: any) => {
      if (cartItem.item.name == item.name) {
        return true;
      }
    });

    if (itemIndex == -1) {
      console.log("itemIndex -1");

      setCart([...newCart, { count: 1, item: item }]);
      localStorage.setItem(
        "cart",
        JSON.stringify([...newCart, { count: 1, item: item }])
      );
      return;
    }

    if (itemIndex != -1) {
      console.log("itemIndex není -1");

      newCart[itemIndex].count = newCart[itemIndex].count + 1;
      setCart([...newCart]);
      localStorage.setItem("cart", JSON.stringify([...newCart]));
      return;
    }
  }
}

export function removeFromCartFunction(cart: any, setCart: any, item: any) {
  const newCart = cart;

  const itemIndex = newCart.findIndex((cartItem: any) => {
    if (cartItem.item.documentId == item.documentId) {
      return true;
    }
  });

  console.log(itemIndex);

  if (newCart[itemIndex].count > 1) {
    newCart[itemIndex].count = newCart[itemIndex].count - 1;
    setCart([...newCart]);
    localStorage.setItem("cart", JSON.stringify([...newCart]));
    return;
  } else if (newCart[itemIndex].count == 1) {
    newCart.splice(itemIndex, 1);
    setCart([...newCart]);
    localStorage.setItem("cart", JSON.stringify([...newCart]));
    return;
  }

  //setCart([...cart, item]);
  return;
}
