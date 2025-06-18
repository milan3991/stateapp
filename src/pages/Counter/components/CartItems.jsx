import GlobalButton from '../../../components/GlobalButton/GlobalButton';
import '../style.counter.css'

const CartItems = ({ image, price, heading, handleButton, quantity, increase, decrease }) => {
    return (
        <div className='items_part'>
            <img src={image} className='items_image' alt={heading} />
            <div className='item_details'>
                <div className='nameprice'>
                    <h4>{heading}</h4>
                    <h4>{price.toFixed(2)}$</h4>
                    <div className='quantity'>
                        <button onClick={increase}>+</button>
                        <span>{quantity}</span>
                        <button onClick={decrease}>-</button>
                    </div>
                </div>
            </div>
            <GlobalButton text="X" handleClick={handleButton} className='remove_button' />
        </div>
    );
};

export default CartItems;