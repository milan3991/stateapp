import './cart.style.css'
import CartItem from './components/CartItem';

const Cart = ({ cartItems, handleRemoveCart, handleIncreaseQuantity, handleDecreaseQuantity }) => {

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

    const discountMap = [
        { code: 'SAVE10', discount: 0.1 },
        { code: 'HELLO20', discount: 0.2 },
        { code: 'REACT30', discount: 0.3 },
    ];

    return (
        <div className="state-cart-items">
            <h3 className='items-header'>Cart items</h3>

            <div className='cart'>
                {cartItems.map((cartItem) => {
                    return (
                        <CartItem
                            key={Math.random()}
                            image={cartItem.image}
                            heading={cartItem.heading}
                            subheading={cartItem.subheading}
                            price={cartItem.price}
                            quantity={cartItem.quantity}
                            handleButton={() => handleRemoveCart(cartItem.id)}
                            increase={() => handleIncreaseQuantity(cartItem.id)}
                            decrease={() => handleDecreaseQuantity(cartItem.id)}
                        />
                    )
                })}

            </div>
            <div className='inputfield'>
                <input
                    type="text"
                    placeholder="Enter discount code"
                    value={discount}
                    onChange={handleDiscountChange}
                    className="discount-input"
                />
                <button className="apply-discount" onClick={handleApplyDiscount}>
                    Apply
                </button>
            </div>

            <div className='price-details'>
                <p className='original-price'>
                    Subtotal: {totalPrice.toFixed(2)}$
                </p>
                {discountedPrice !== totalPrice && (
                    <>
                        <p className='discount-amount'>
                            Discount: {(totalPrice - discountedPrice).toFixed(2)}$
                        </p>
                        <p className='final-price'>
                            Total: {discountedPrice.toFixed(2)}$
                        </p>
                    </>
                )}
            </div>
            {!cartItems.length && <div className='cart-empty'>
                <h3>No items in cart</h3>
                <h2>🫣</h2>
            </div>}

        </div>

    )
};

export default Cart;