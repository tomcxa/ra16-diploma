import React, { useEffect } from "react";
import useJsonFetch from "../hooks/useJsonFetch";
import { useParams, Redirect } from "react-router-dom";
import Loader from "./Loader";

const getUrl = (id) => {
  const url = `http://localhost:7070/api/items/${id}`
  return url
}

const Product = () => {
  const { id } = useParams()
  const [data, loading, error] = useJsonFetch(getUrl(id))

  useEffect(() => {
    console.log(data)
  }, [data])

  if (loading) return <Loader />

  if (error) return <Redirect to='/404' />

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
          <div className="text-center">
            <p>
              Размеры в наличии:{" "}
              {<span className="catalog-item-size">20 US</span>}
            </p>
            <p>
              Количество:{" "}
              <span className="btn-group btn-group-sm pl-2">
                <button className="btn btn-secondary">-</button>
                <span className="btn btn-outline-primary">1</span>
                <button className="btn btn-secondary">+</button>
              </span>
            </p>
          </div>
          <button className="btn btn-danger btn-block btn-lg">В корзину</button>
        </div>
      </div>
    </section>
  );
};

export default Product;
