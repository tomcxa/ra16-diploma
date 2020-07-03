import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import CatalogPage from "./pages/CatalogPage";
import HomePage from "./pages/HomePage";
import ContactsPage from "./pages/ContactsPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import GlobalProvider from "./contexts/GlobalProvider";

function App() {
  return (
    <Router>
      <GlobalProvider>
        <Header />
        <Main>
          <Switch>
            <Route exact path="/about">
              <AboutPage />
            </Route>
            <Route exact path="/product/:id">
              <ProductPage />
            </Route>
            <Route exact path="/catalog">
              <CatalogPage />
            </Route>
            <Route exact path="/contacts">
              <ContactsPage />
            </Route>
            <Route exact path="/cart">
              <CartPage />
            </Route>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="*">
              <ErrorPage />
            </Route>
          </Switch>
        </Main>
      </GlobalProvider>
      <Footer />
    </Router>
  );
}

export default App;
