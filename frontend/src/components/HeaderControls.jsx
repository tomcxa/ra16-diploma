import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import GlobalContext from "../contexts/GlobalContext";

const HeaderControls = () => {
  const history = useHistory();
  const [searchVisible, setSearchVisible] = useState(false);
  const [input, setInput] = useState("");
  const { cart, changeSearch, changeAnchors } = useContext(GlobalContext);

  function toCart() {
    history.push("/cart");
  }

  function toCatalog() {
    history.push("/catalog");
  }

  function handleSerchField() {
    if (!input) {
      setSearchVisible((prev) => !prev);
      return;
    }
    changeSearch(input);
    changeAnchors({ q: input, offset: 0 });
    setInput("");
    setSearchVisible(false);
    toCatalog();
  }

  function handleChange(event) {
    const { value } = event.target;
    setInput(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (input) {
      changeSearch(input);
      changeAnchors({ q: input, offset: 0 });
      setInput("");
      setSearchVisible(false);
      toCatalog();
    }
  }

  return (
    <div>
      <div className="header-controls-pics">
        <div
          onClick={handleSerchField}
          className="header-controls-pic header-controls-search"
        ></div>
        <div
          className="header-controls-pic header-controls-cart"
          onClick={toCart}
        >
          {!!cart.items.length && <div className="header-controls-cart-full">{cart.items.length}</div>}
          <div className="header-controls-cart-menu"></div>
        </div>
      </div>
      {searchVisible && (
        <form
          onSubmit={handleSubmit}
          className="header-controls-search-form form-inline"
        >
          <input
            onChange={handleChange}
            name="search"
            className="form-control"
            value={input}
            placeholder="Поиск"
          />
        </form>
      )}
    </div>
  );
};

export default HeaderControls;
