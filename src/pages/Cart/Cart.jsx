import { useState } from 'react';
import './cart.style.css'
import CartItem from './components/CartItem';



const Cart = ({ cartItems}) => {

    return (
        <div className="state-cart-items">
            <h3 className='items-header'>Priprema</h3>

            <div className='cart'>
                {cartItems.map((cartItem) => (
                    <div key={cartItem.id} className="cart-product-wrapper">
                        <h4>Broj narudzbe: {cartItem.id}</h4>
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
                ))}            </div>
            {!cartItems.length && <div className='cart-empty'>
                <h3>No items in cart</h3>
                <h2>🫣</h2>
            </div>}
        </div>

    )
};

export default Cart;