import React from "react";
import { useContext } from 'react'
import useJsonFetch from '../hooks/useJsonFetch'
import GlobalContext from "../contexts/GlobalContext";
import Loader from "./Loader";

const urlCat = 'http://localhost:7070/api/categories'

const CatalogCategories = () => {
  const [data, loading, error] = useJsonFetch(urlCat)
  const {anchors:{categoryId}, changeAnchors} = useContext(GlobalContext)
  

  function categoryChange(id) {
    changeAnchors({ categoryId: id, offset: 0 })
  }

  if (loading) return <Loader />

  return (
    <ul className="catalog-categories nav justify-content-center">
      <li className="nav-item">
        <a onClick={(e) =>{e.preventDefault(); categoryChange('')}} className={`nav-link${!categoryId ? ' active': ''}`} href='/' >
          Все
        </a>
      </li>
      {!error && data.map((category) => (
        <li key={category.id} className="nav-item">
          {/* eslint-disable-next-line eqeqeq */}
          <a onClick={(e) =>{e.preventDefault(); categoryChange(category.id)}} className={`nav-link${category.id == categoryId ? ' active': ''}`} href='/' >
            {category.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default CatalogCategories;
