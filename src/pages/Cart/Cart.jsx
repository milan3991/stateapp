import React, { useState, useEffect } from "react";
import "./cart.style.css";
import CartItem from "./components/CartItem";

const Cart = () => {
  const [cartOrders, setCartOrders] = useState([]);

  const fetchCartOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders");
      const data = await res.json();
      const inPrep = data.filter(order => order.inPreparation && !order.completed);
      setCartOrders(inPrep);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCartOrders();
    const interval = setInterval(fetchCartOrders, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="state-cart-items">
      <div className="cart">
        {cartOrders.map((order) => (
          <div
            key={order.id}
            className={`cart-product-wrapper ${order.ready ? "ready-frame" : ""}`}
          >
            <h4 className="order-number">Broj narudzbe: {order.id}</h4>
            <div className="cart-variants">
              {order.items.map((item, index) => (
                <CartItem
                  key={index}
                  image={item.image}
                  heading={item.heading}
                  quantity={item.quantity}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {!cartOrders.length && (
        <div className="cart-empty">
          <video
            className="cart-video"
            muted
            autoPlay
            loop
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default Cart;
