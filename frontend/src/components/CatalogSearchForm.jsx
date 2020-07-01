import React, { useContext } from "react";
import GlobalContext from "../contexts/GlobalContext";

const CatalogSearchForm = () => {
  const { search, changeSearch, changeAnchors } = useContext(GlobalContext);

  function handleSubmit(event) {
    event.preventDefault();
    if (search) {
      changeAnchors({ q: search, offset: 0 });
      return;
    }
    changeAnchors({ q: "", offset: 0 });
  }

  function handleChange({ target }) {
    changeSearch(target.value.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="catalog-search-form form-inline">
      <input
        onChange={handleChange}
        value={search}
        className="form-control"
        placeholder="Поиск"
      />
    </form>
  );
};

export default CatalogSearchForm;
