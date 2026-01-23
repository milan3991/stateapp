import React, { useState, useEffect, useRef } from "react";
import "./cart.style.css";
import CartItem from "./components/CartItem";

import videoSrc from "../../assets/video1.mp4";
import videoSrc2 from "../../assets/video2.mp4";

const Cart = () => {
  const [cartOrders, setCartOrders] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(1);
  const videoRef = useRef(null);

  const fetchCartOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders");
      const data = await res.json();
      const inPrep = data.filter(
        (order) => order.inPreparation && !order.completed
      );
      setCartOrders(inPrep);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev === 1 ? 2 : 1));
  };

  useEffect(() => {
    fetchCartOrders();
    const interval = setInterval(fetchCartOrders, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!cartOrders.length && videoRef.current) {
      videoRef.current.src =
        currentVideo === 1 ? videoSrc : videoSrc2;

      videoRef.current
        .play()
        .catch((err) => console.log("Video play error:", err));
    }
  }, [cartOrders, currentVideo]);

  return (
    <div className="state-cart-items">
      <div className="cart">
        {cartOrders.map((order) => (
          <div
            key={order.id}
            className={`cart-product-wrapper ${
              order.ready ? "ready-frame" : ""
            }`}
          >
            <h4 className="order-number">
              Broj narudzbe: {order.id}
            </h4>

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
            ref={videoRef}
            className="cart-video"
            muted
            autoPlay
            onEnded={handleVideoEnd}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default Cart;
