import React, { useContext, useState } from "react";
import GlobalContext from "../contexts/GlobalContext";

const url = `${process.env.REACT_APP_API_URL}/order`;

const OrderForm = () => {
  const defaultForm = {
    phone: "",
    address: "",
    agreement: false,
  };

  const { cart, orderStatusChange } = useContext(GlobalContext);
  const [form, setForm] = useState(defaultForm);
  const isValid = form.address.trim() && form.phone.trim() && form.agreement;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isValid) {
      const body = {
        owner: {
          phone: form.phone.trim(),
          address: form.address.trim(),
        },
        ...cart,
      };
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        orderStatusChange({ loading: true });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        console.log("sucess");
        orderStatusChange({ success: true });
      } catch (e) {
        console.log(e)
        orderStatusChange({ error: true });
      } finally {
        orderStatusChange({ loading: false });
      }
    }
  };

  function handleChange({ target }) {
    if (target.type === "checkbox") {
      setForm((prev) => ({ ...prev, agreement: target.checked }));
      return;
    }
    const { name, value } = target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{ maxWidth: "30rem", margin: "0 auto" }}>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input
              onChange={handleChange}
              className="form-control"
              name="phone"
              id="phone"
              placeholder="Ваш телефон"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input
              onChange={handleChange}
              className="form-control"
              name="address"
              id="address"
              placeholder="Адрес доставки"
            />
          </div>
          <div className="form-group form-check">
            <input
              onChange={handleChange}
              type="checkbox"
              className="form-check-input"
              name="agreement"
              id="agreement"
            />
            <label className="form-check-label" htmlFor="agreement">
              Согласен с правилами доставки
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-outline-secondary"
            disabled={!isValid}
          >
            Оформить
          </button>
        </form>
      </div>
    </section>
  );
};

export default OrderForm;
