import React from "react";
import { useAsync } from "react-use";
import Loader from "./Loader";
import CatalogCard from "./CatalogCard";

const url = "http://localhost:7070/api/top-sales";

const TopSales = () => {
  const state = useAsync(async () => {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  }, [url]);

  if (state.loading) return <Loader />;

  if (state.error) return null;

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      <div className="card-deck">
        {state.value?.map((card) => {
          return <CatalogCard key={card.id} card={card} />;
        })}
      </div>
    </section>
  );
};

export default TopSales;
