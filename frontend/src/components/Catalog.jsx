import React, { useState, useEffect, useContext, useRef } from "react";
import { useRouteMatch } from "react-router-dom";
import { useAsyncRetry } from "react-use";
import GlobalContext from "../contexts/GlobalContext";
import CatalogCategories from "./CatalogCategories";
import CatalogCardList from "./CatalogCardList";

function getUrl({ categoryId, offset, q }) {
  let url = `${process.env.REACT_APP_API_URL}/items`;
  let anchor = "";
  if (categoryId && q && offset) {
    anchor = `?q=${q}&categoryId=${categoryId}&offset=${offset}`;
    return url + anchor;
  }
  if (categoryId && q) {
    anchor = `?q=${q}&categoryId=${categoryId}`;
    return url + anchor;
  }
  if (offset && q) {
    anchor = `?q=${q}&offset=${offset}`;
    return url + anchor;
  }
  if (categoryId && offset) {
    anchor = `?categoryId=${categoryId}&offset=${offset}`;
    return url + anchor;
  }
  if (categoryId) {
    anchor = `?categoryId=${categoryId}`;
    return url + anchor;
  }
  if (offset) {
    anchor = `?offset=${offset}`;
    return url + anchor;
  }
  if (q) {
    anchor = `?q=${q}`;
    return url + anchor;
  }
  return url;
}

const Catalog = ({ children }) => {
  const offsetGap = 6;
  const { anchors, changeAnchors } = useContext(GlobalContext);
  const [cards, setCards] = useState([]);
  const url = getUrl(anchors);
  const state = useAsyncRetry(async () => {
    const response = await fetch(url);
    const result = await response.json();
    return result
  }, [url]);
  const catalogRef = useRef(null);
  const { path } = useRouteMatch();

  //обнуляем каталог если изменилась категория или поисковый запрос
  useEffect(() => {
    setCards([]);
  }, [anchors.q, anchors.categoryId]);

  // при изменении данных с сервера присовокупляем их в каталог
  useEffect(() => {
    if (state.value) setCards((prev) => [...prev, ...state.value]);
  }, [state.value]);

  useEffect(() => {
    if (path === "/catalog") {
      catalogRef.current.scrollIntoView(true);
    }
  }, [path]);

  function handleLoad() {
    const { offset } = anchors;
    const newOffset = offset + offsetGap;
    changeAnchors({ offset: newOffset });
  }

  function categoryChange(id) {
    changeAnchors({ categoryId: id, offset: 0 });
  }

  return (
    <section ref={catalogRef} className="catalog">
      <h2 className="text-center">Каталог</h2>
      {children}
      <CatalogCategories categoryChange={categoryChange} />
      <CatalogCardList data={cards} loading={state.loading} error={state.error} retry={state.retry} />
      {state.value?.length < 6 || state.error ? null : (
        <div className="text-center">
          <button
            className="btn btn-outline-primary"
            onClick={handleLoad}
            disabled={state.loading}
          >
            Загрузить ещё
          </button>
        </div>
      )}
    </section>
  );
};

export default Catalog;
