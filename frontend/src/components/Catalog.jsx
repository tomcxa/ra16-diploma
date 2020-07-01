import React, { useState, useEffect, useContext, useRef } from "react";
import useJsonFetch from "../hooks/useJsonFetch";
import CatalogCategories from "./CatalogCategories";
import CatalogCardList from "./CatalogCardList";
import GlobalContext from "../contexts/GlobalContext";
import { useRouteMatch } from "react-router-dom";

function getUrl({ categoryId, offset, q }) {
  let url = "http://localhost:7070/api/items";
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
  const [data, loading, error] = useJsonFetch(url);
  const catalogRef = useRef(null);
  const { path } = useRouteMatch();

  //обнуляем каталог если изменилась категория или поисковый запрос
  useEffect(() => {
    setCards([]);
  }, [anchors.q, anchors.categoryId]);

  // при изменении данных с сервера присовокупляем их в каталог
  useEffect(() => {
    setCards((prev) => [...prev, ...data]);
  }, [data]);

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
      <CatalogCardList data={cards} loading={loading} error={error} />
      {data.length < 6 ? null : (
        <div className="text-center">
          <button
            className="btn btn-outline-primary"
            onClick={handleLoad}
            disabled={loading}
          >
            Загрузить ещё
          </button>
        </div>
      )}
    </section>
  );
};

export default Catalog;
