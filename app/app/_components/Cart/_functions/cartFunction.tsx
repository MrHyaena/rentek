//Functions for adding and removing items from cart
export function addToCartFunction(
  cart: { [key: string]: any }[],
  setCart: any,
  item: { [key: string]: any }
) {
  const newCart = [...cart];

  if (newCart.length == 0) {
    setCart([{ count: 1, item: item }]);
    localStorage.setItem("cart", JSON.stringify([{ count: 1, item: item }]));
    return;
  } else if (newCart.length > 0) {
    const itemIndex = newCart.findIndex((cartItem: any) => {
      if (cartItem.item.documentId == item.documentId) {
        return true;
      }
    });

    if (itemIndex == -1) {
      setCart([...newCart, { count: 1, item: item }]);
      localStorage.setItem(
        "cart",
        JSON.stringify([...newCart, { count: 1, item: item }])
      );
      return;
    }

    if (itemIndex != -1) {
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
