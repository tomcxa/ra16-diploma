import React from "react";
import Loader from "./Loader";
import useJsonFetch from "../hooks/useJsonFetch";
import CatalogCard from "./CatalogCard";

const url = "http://localhost:7070/api/top-sales";

const TopSales = () => {
  const [data, loading, error] = useJsonFetch(url);

  if (loading) return <Loader />;

  if (error) return null;

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      <div className="row">
        {data.map((card) => {
          return <CatalogCard key={card.id} card={card} />;
        })}
      </div>
    </section>
  );
};

export default TopSales;
