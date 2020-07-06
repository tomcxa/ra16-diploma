import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, useRouteMatch, useHistory } from "react-router-dom";
import { useAsyncRetry } from "react-use";
import Loader from "./Loader";
import GlobalContext from "../contexts/GlobalContext";
import RetryButton from "./RetryButton";

const getUrl = (id) => {
  const url = `${process.env.REACT_APP_API_URL}/items/${id}`;
  return url;
};

const setSelectedClass = (selected, current) => {
  return selected === current ? " selected" : "";
};

const Product = () => {
  const { id } = useParams();
  const { path } = useRouteMatch();
  const history = useHistory();
  const productRef = useRef(null);
  const [selectedSize, setSize] = useState("");
  const [count, setCount] = useState(1);
  const [imgError, setImgError] = useState(false)
  const state = useAsyncRetry(async () => {
    const response = await fetch(getUrl(id));
    const result = await response.json();
    return result;
  });
  const { addToCart } = useContext(GlobalContext);

  useEffect(() => {
    if (path === `/product/${id}`) {
      setTimeout(() => productRef.current.scrollIntoView(true), 200);
    }
  }, [path, id]);

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
      id: +id,
      title: state.value?.title,
      size: selectedSize,
      count: count,
      price: state.value?.price,
    };

    addToCart(cartItem);
    history.push('/cart');
  }

  function handleImgError() {
    setImgError(true)
  }

  const avalibleSizes = state.value?.sizes?.filter(({ avalible }) => avalible);

  if (state.loading) return <Loader />;

  if (state.error) return <RetryButton retry={state.retry} />;

  return (
    <section ref={productRef} id='product' className="catalog-item">
      <h2 className="text-center">{state.value?.title}</h2>
      <div className="row">
        <div className="col-5">
          <img
            src={imgError ? 'http://placehold.it/400x400/33bee5/FFFFFF/&text=ФОТО ВРЕМЕННО ОТСУТСТВУЕТ' : state.value?.images && state.value?.images[0]}
            onError={handleImgError}
            className="img-fluid"
            alt=""
          />
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{state.value?.sku}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{state.value?.manufacturer}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{state.value?.color}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{state.value?.material}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{state.value?.season}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{state.value?.reason}</td>
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
