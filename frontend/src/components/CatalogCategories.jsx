/* eslint-disable eqeqeq */
import React, { useContext } from "react";
import { useAsyncRetry } from "react-use";
import GlobalContext from "../contexts/GlobalContext";
import Loader from "./Loader";
import RetryButton from "./RetryButton";

const url = `${process.env.REACT_APP_API_URL}/categories`;

const CatalogCategories = () => {
  const state = useAsyncRetry(async () => {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  }, [url]);
  const {
    anchors: { categoryId },
    changeAnchors,
  } = useContext(GlobalContext);

  function categoryChange(id) {
    changeAnchors({ categoryId: id, offset: 0 });
  }

  if (state.loading) return <Loader />;

  if (state.error) return <RetryButton retry={state.retry} />;

  return (
    <ul className="catalog-categories nav justify-content-center">
      <li className="nav-item">
        <a
          onClick={(e) => {
            e.preventDefault();
            categoryChange("");
          }}
          className={`nav-link${!categoryId ? " active" : ""}`}
          href="/"
        >
          Все
        </a>
      </li>
      {state.value &&
        state.value.map((category) => (
          <li key={category.id} className="nav-item">
            <a
              onClick={(e) => {
                e.preventDefault();
                categoryChange(category.id);
              }}
              className={`nav-link${
                category.id == categoryId ? " active" : ""
              }`}
              href="/"
            >
              {category.title}
            </a>
          </li>
        ))}
    </ul>
  );
};

export default CatalogCategories;
