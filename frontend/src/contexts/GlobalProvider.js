import React, { useState, useEffect } from "react";
import GlobalContext from "./GlobalContext";

const GlobalProvider = ({ children }) => {
  const defaultAnchors = {
    q: "",
    categoryId: "",
    offset: 0,
  };

  const defaultCart = {
    items: [
      // {
      //   id: 123,
      //   title: "Босоножки 'MYER'",
      //   size: "18 US",
      //   count: 1,
      //   price: 34000,
      //   totalPrice: 34000,
      // },
    ],
  };

  const [search, setSearch] = useState("");
  const [anchors, setAnchors] = useState(defaultAnchors);
  const [cart, setCart] = useState(defaultCart);

  useEffect(() => {
    const cartInStorage = JSON.parse(localStorage.getItem("cart"));
    if (!cartInStorage.items.length) setCart(cartInStorage);
  }, []);

  useEffect(() => {
    if (cart.items.length) localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function changeAnchors(newValue) {
    setAnchors((prev) => ({ ...prev, ...newValue }));
  }

  function changeSearch(input) {
    setSearch(input);
  }

  function addToCart(item) {
    console.log(item);
    setCart((prev) => {
      prev.items.push(item);
      return { ...cart, ...prev };
    });
  }

  function removeFromCart(id) {
    console.log(id);
  }

  return (
    <GlobalContext.Provider
      value={{
        anchors,
        changeAnchors,
        search,
        changeSearch,
        cart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
