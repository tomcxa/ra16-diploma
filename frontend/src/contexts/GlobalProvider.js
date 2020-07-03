import React, { useState } from "react";
import { useLocalStorage } from "react-use";
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

  const defaultOrderStatus = {
    loading: false,
    success: false,
    error: false,
  };

  const [search, setSearch] = useState("");
  const [anchors, setAnchors] = useState(defaultAnchors);
  const [cart, setCart] = useLocalStorage("cart", defaultCart);
  const [orderStatus, setOrderStatus] = useState(defaultOrderStatus);

  function changeAnchors(newValue) {
    setAnchors((prev) => ({ ...prev, ...newValue }));
  }

  function changeSearch(input) {
    setSearch(input);
  }

  function orderStatusChange(newStatus) {
    setOrderStatus((prev) => ({ ...prev, ...newStatus }));
  }

  function addToCart(item) {
    setCart((prev) => {
      console.log(prev)
      const { items } = prev;
      const index = items.findIndex(
        (o) => o.id === item.id && o.size === item.size
      );
      if (index !== -1) {
        const updatedItem = items[index];
        updatedItem.count += item.count;
        updatedItem.count =
          updatedItem.count > 10 ? (updatedItem.count = 10) : updatedItem.count;
      } else {
        items.push(item);
      }
      return { ...prev };
    });
  }

  function removeFromCart(id) {
    setCart((prev) => {
      const { items } = prev;
      const index = items.findIndex((item) => item.id + item.size === id);
      items.splice(index, 1);
      return { ...prev };
    });
  }

  function remove() {
    setCart(prev => {
      const { items } = prev;
      items.splice(0, items.length);
      return { ...prev };
    })
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
        remove,
        orderStatus,
        orderStatusChange,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
