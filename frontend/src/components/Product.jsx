import React, { useEffect, useState, useContext } from "react";
import useJsonFetch from "../hooks/useJsonFetch";
import { useParams, Redirect } from "react-router-dom";
import Loader from "./Loader";
import GlobalContext from "../contexts/GlobalContext";

const getUrl = (id) => {
  const url = `http://localhost:7070/api/items/${id}`;
  return url;
};

const setSelectedClass = (selected, current) => {
  return selected === current ? " selected" : "";
};

const Product = () => {
  const { id } = useParams();
  const [selectedSize, setSize] = useState("");
  const [count, setCount] = useState(1);
  const [data, loading, error] = useJsonFetch(getUrl(id));
  const { addToCart } = useContext(GlobalContext);

  function selectSize(size) {
    setSize(size);
  }

  function increment() {
    setCount((prev) => {
      if (prev === 10) return prev;
      return prev + 1;
    });
  }

  function decrement() {
    setCount((prev) => {
      if (prev === 1) return prev;
      return prev - 1;
    });
  }

  function handleAddToCart() {
    const cartItem = {
      id: id,
      title: data.title,
      size: selectedSize,
      count: count,
      price: data.price,
      totalPrice: data.price * count,
    };

    addToCart(cartItem);
  }

  const avalibleSizes = data.sizes?.filter(({ avalible }) => avalible);

  if (loading) return <Loader />;

  if (error) return <Redirect to="/404" />;

  return (
    <section className="catalog-item">
      <h2 className="text-center">{data.title}</h2>
      <div className="row">
        <div className="col-5">
          <img
            src={data.images && data.images[0]}
            className="img-fluid"
            alt=""
          />
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{data.sku}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{data.manufacturer}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{data.color}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{data.material}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{data.season}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{data.reason}</td>
              </tr>
            </tbody>
          </table>
          {avalibleSizes?.length ? (
            <div className="text-center">
              <p>
                Размеры в наличии:{" "}
                {avalibleSizes.map(({ size }) => (
                  <span
                    key={size}
                    onClick={() => selectSize(size)}
                    className={`catalog-item-size${setSelectedClass(
                      selectedSize,
                      size
                    )}`}
                  >
                    {size}
                  </span>
                ))}
              </p>
              <p>
                Количество:{" "}
                <span className="btn-group btn-group-sm pl-2">
                  <button onClick={decrement} className="btn btn-secondary">
                    -
                  </button>
                  <span className="btn btn-outline-primary">{count}</span>
                  <button onClick={increment} className="btn btn-secondary">
                    +
                  </button>
                </span>
              </p>
            </div>
          ) : (
            <p className="text-center">Товара нет в наличии</p>
          )}
          {avalibleSizes?.length && (
            <button
              onClick={handleAddToCart}
              className="btn btn-danger btn-block btn-lg"
              disabled={!selectedSize}
            >
              В корзину
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Product;
