import React from "react";
import { useHistory } from 'react-router-dom'

const HeaderControls = () => {
    const history = useHistory()

    function toCart() {
        history.push('/cart')
    }

  return (
    <div>
      <div className="header-controls-pics">
        <div
          data-id="search-expander"
          className="header-controls-pic header-controls-search"
        ></div>
        <div className="header-controls-pic header-controls-cart" onClick={toCart} >
          <div className="header-controls-cart-full">1</div>
          <div className="header-controls-cart-menu"></div>
        </div>
      </div>
      <form
        data-id="search-form"
        className="header-controls-search-form form-inline invisible"
      >
        <input className="form-control" placeholder="Поиск" />
      </form>
    </div>
  );
};

export default HeaderControls;
