import React from "react";
import Loader from "./Loader";
import CatalogCard from "./CatalogCard";
import CatalogCategories from "./CatalogCategories";

const Catalog = ({children}) => {
  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {children}
      <CatalogCategories />
      {/* <CatalogCard /> */}
    </section>
  );
};

export default Catalog;
