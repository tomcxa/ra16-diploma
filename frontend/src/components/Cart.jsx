import React, {
  useContext,
  useRef,
  useEffect,
} from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import GlobalContext from "../contexts/GlobalContext";
import CartItem from "./CartItem";
import OrderForm from "./OrderForm";
import Loader from "./Loader";



const Cart = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const cartRef = useRef(null);
  const { changeAnchors, cart, remove, orderStatus, orderStatusChange } = useContext(GlobalContext);

  useEffect(() => {
    if (path === "/cart") cartRef.current.scrollIntoView(true);
  }, [path]);

  useEffect(() => {
    if (orderStatus.success) {
      remove()
    }
  }, [orderStatus.success, orderStatusChange, remove])

  function handleToCatalog(event) {
    event.preventDefault();
    changeAnchors({ q: "", categoryId: "", offset: 0 });
    orderStatusChange({success: false})
    history.push("/catalog");
  }

  function handleToCart(event) {
    event.preventDefault();
    orderStatusChange({error: false})
  }

  function removeHandler() {
    remove();
  }

  if (orderStatus.loading) return <Loader />;

  if (orderStatus.error)
    return (
      <div className="text-center">
        <p>
          Что-то пошло не так! Вернуться{" "}
          <a onClick={handleToCart} href="/cart">
            в корзину
          </a>
        </p>
      </div>
    );

  return (
    <section ref={cartRef} className="cart">
      <h2 className="text-center">Корзина</h2>
      {cart?.items?.length ? (
        <>
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
              {cart.items.map((item, index) => (
                <CartItem
                  key={item.id + item.size}
                  index={++index}
                  item={item}
                />
              ))}
              <tr>
                <td colSpan="5" className="text-right">
                  Общая стоимость
                </td>
                <td>
                  {cart.items.reduce((prev, current) => {
                    const totalCurrent = +current.count * +current.price;
                    return prev + totalCurrent;
                  }, 0)}{" "}
                  руб.
                </td>
                <td>
                  <button
                    onClick={removeHandler}
                    className="btn btn-outline-danger btn-sm"
                  >
                    Очистить корзину
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <OrderForm />
        </>
      ) : (
        <div className="text-center">
          <p>
            {orderStatus.success
              ? "Заказ успешно оформлен! Вернуться"
              : "Здесь пока пусто! Что бы нога была не боса загляни"}{" "}
            <a onClick={handleToCatalog} href="/catalog">
              в каталог
            </a>
          </p>
        </div>
      )}
    </section>
  );
};

export default Cart;
