import React from "react";

const CatalogCard = ({card}) => {  
  return (
    <div className="col-4">
      <div className="card">
        <img
          src={card.images[0]}
          className="card-img-top img-fluid"
          alt={card.title}
        />
        <div className="card-body">
          <p className="card-text">{card.title}</p>
          <p className="card-text">{card.price} руб.</p>
          <a href="/products/1.html" className="btn btn-outline-primary">
            Заказать
          </a>
        </div>
      </div>
    </div>
  );
};

export default CatalogCard;
