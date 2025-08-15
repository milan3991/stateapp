import React, { useState, useRef, useEffect } from 'react';
import './cart.style.css';
import CartItem from './components/CartItem';
import videoSrc from '../../assets/video1.mp4';
import videoSrc2 from '../../assets/video2.mp4';

const Cart = ({ cartItems, readyOrders = [] }) => {
  const [currentVideo, setCurrentVideo] = useState(1);
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev === 1 ? 2 : 1));
  };


useEffect(() => {
  if (!cartItems.length && videoRef.current) {
    videoRef.current.src = currentVideo === 1 ? videoSrc : videoSrc2;
    videoRef.current
      .play()
      .catch((err) => console.log("Video play error:", err));
  }
}, [cartItems, currentVideo]);

  return (
    <div className="state-cart-items">
      <div className="cart">
        {cartItems.map((cartItem) => (
          <div
            key={cartItem.id}
            className={`cart-product-wrapper ${
              readyOrders.includes(String(cartItem.orderId)) ? 'ready-frame' : ''
            }`}
          >
            <h4 className='order-number'>Broj narudzbe: {cartItem.orderId}</h4>
            <div className="cart-variants">
              {cartItem.variants.map((variant, index) => (
                <CartItem
                  key={index}
                  image={variant.image}
                  heading={variant.heading}
                  quantity={variant.quantity}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {!cartItems.length && (
        <div className="cart-empty">
          <video
            ref={videoRef}
            width="900"
            controls
            muted
            autoPlay
            onEnded={handleVideoEnd}
            style={{ borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.3)' }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default Cart;
