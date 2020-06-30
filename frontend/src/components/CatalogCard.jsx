import React from "react";
import { Link } from "react-router-dom";

const CatalogCard = ({card}) => {  
  return (
    <div className="col-4">
      <div className="card catalog-item-card">
        <img
          src={card.images[0]}
          className="card-img-top img-fluid"
          alt={card.title}
        />
        <div className="card-body">
          <p className="card-text">{card.title}</p>
          <p className="card-text">{card.price} руб.</p>
          <Link to={`/product/${card.id}`} className="btn btn-outline-primary">
            Заказать
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CatalogCard;
