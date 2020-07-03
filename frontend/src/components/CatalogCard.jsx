import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";

const CatalogCard = ({ card }) => {
  const [imgError, setImgError] = useState(false);

  const handleError = useCallback(() => {
    setImgError(true);
  }, [setImgError]);

  return (
    <div className="card mb-3" style={{ minWidth: "30%" }}>
      <div className="image-box">
      <img
        src={imgError ? 'http://placehold.it/400x400/33bee5/FFFFFF/&text=ФОТО ВРЕМЕННО ОТСУТСТВУЕТ' : card.images[0]}
        onError={handleError}
        className="card-img-top img-fluid"
        alt={card.title}
      />
      </ div>
      <div className="card-footer" style={{ marginTop: 'auto', marginBottom: '0'}}>
        <p className="card-text">{card.title}</p>
        <p className="card-text">{card.price} руб.</p>
        <Link to={`/product/${card.id}`} className="btn btn-outline-primary">
          Заказать
        </Link>
      </div>
    </div>
  );
};

export default CatalogCard;
