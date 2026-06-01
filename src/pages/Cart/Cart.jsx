import React, { useState, useEffect } from "react";
import "./cart.style.css";
import CartItem from "./components/CartItem";

import videoSrc1 from "../../assets/video1.mp4";
import videoSrc2 from "../../assets/video2.mp4";


const videos = [
  videoSrc1,
  videoSrc2,
  
];

const Cart = () => {
  const [cartOrders, setCartOrders] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const fetchCartOrders = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`);
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
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
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
            className={`cart-product-wrapper ${
              order.ready ? "ready-frame" : ""
            }`}
          >
            <h4 className="order-number">
              Broj narudžbe: {order.id}
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
            key={currentVideoIndex} 
            className="cart-video"
            muted
            autoPlay
            onEnded={handleVideoEnd}
          >
            <source
              src={videos[currentVideoIndex]}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default Cart;