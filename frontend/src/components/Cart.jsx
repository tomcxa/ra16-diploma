import React, { useContext } from "react";
import CartItem from "./CartItem";
import GlobalContext from "../contexts/GlobalContext";
import { useHistory } from "react-router-dom";

const Cart = () => {
  const history = useHistory();
  const { changeAnchors, cart } = useContext(GlobalContext);

  function handleClick(event) {
    event.preventDefault();
    changeAnchors({ q: "", categoryId: "", offset: 0 });
    history.push("/catalog");
  }

  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      {cart.items?.length ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            <CartItem item={cart.items[0]} />
            <tr>
              <td colSpan="5" className="text-right">
                Общая стоимость
              </td>
              <td>34 000 руб.</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div className='text-center' >
          <p>
            Здесь пока пусто! Что бы нога была не боса загляни{" "}
            <a onClick={handleClick} href="/catalog">
              в каталог
            </a>
          </p>
        </div>
      )}
    </section>
  );
};

export default Cart;
