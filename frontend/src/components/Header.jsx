import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/header-logo.png";
import HeaderMenu from "./HeaderMenu";
import HeaderControls from "./HeaderControls";

const Header = () => {
  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="Bosa Noga" />
            </Link>

            <div className="collapase navbar-collapse" id="navbarMain">
              <HeaderMenu />
              <HeaderControls />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
