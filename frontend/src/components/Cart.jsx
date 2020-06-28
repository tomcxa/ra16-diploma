import React from "react";
import CartItem from "./CartItem";

const Cart = () => {
  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
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
          <CartItem />
          <tr>
            <td colSpan="5" className="text-right">
              Общая стоимость
            </td>
            <td>34 000 руб.</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Cart;
