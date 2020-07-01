import React, { useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../contexts/GlobalContext";

const CartItem = ({ item, index }) => {
  const { removeFromCart } = useContext(GlobalContext);

  const removeHandler = useCallback(() => removeFromCart(item.id), [
    item.id,
    removeFromCart,
  ]);

  return (
    <tr>
      <th scope="row">{index}</th>
      <td>
        <Link to={`/products/${item.id}`}>{item.title}</Link>
      </td>
      <td>{item.size}</td>
      <td>{item.size}</td>
      <td>{item.price}</td>
      <td>{item.totalPrice}</td>
      <td>
        <button
          onClick={removeHandler}
          className="btn btn-outline-danger btn-sm"
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
