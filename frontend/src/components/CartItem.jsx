import React from "react";

const CartItem = () => {
  return (
    <tr>
      <th scope="row">1</th>
      <td>
        <a href="/products/1.html">Босоножки 'MYER'</a>
      </td>
      <td>18 US</td>
      <td>1</td>
      <td>34 000 руб.</td>
      <td>34 000 руб.</td>
      <td>
        <button className="btn btn-outline-danger btn-sm">Удалить</button>
      </td>
    </tr>
  );
};

export default CartItem;
