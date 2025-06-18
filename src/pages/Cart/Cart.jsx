import './cart.style.css'
import CartItem from './components/CartItem';

const Cart = ({ cartItems, handleRemoveCart, handleIncreaseQuantity, handleDecreaseQuantity }) => {

    // Total price cart items
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)


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
            {cartItems.length > 0 && <p className='total-price'>Total: {totalPrice}$</p>}

            {!cartItems.length && <div className='cart-empty'>
                <h3>No items in cart</h3>
                <h2>🫣</h2>
            </div>}

        </div>

    )
};

export default Cart;