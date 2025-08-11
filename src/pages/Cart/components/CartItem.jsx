
import GlobalButton from '../../../components/GlobalButton/GlobalButton';
import '../../Counter/style.counter.css'

const CartItem = ({ image,  heading, quantity}) => {
    return (
        <div className='items_part'>
            <img src={image} className='items_image' alt={heading} />
            <div className='item_details'>
                <div className='nameprice'>
                    <h4>{heading}</h4>
                    <h4>X</h4>
                    <h4>{quantity}</h4>
                </div>
            </div>
        </div>
    );
};

export default CartItem;