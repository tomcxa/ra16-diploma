import React from "react";
import CatalogCard from "./CatalogCard";
import Loader from "./Loader";
import RetryButton from './RetryButton'

const CatalogCardList = ({ data, loading, error, retry }) => {
  return (
    <div className="card-deck">
      {data.map((item) => (
        <CatalogCard key={item.id} card={item} />
      ))}
      {loading && <Loader />}
      {error && <RetryButton retry={retry} />}
    </div>
  );
};

export default CatalogCardList;
