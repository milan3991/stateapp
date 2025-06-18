import GlobalButton from '../../../components/GlobalButton/GlobalButton';
import '../style.counter.css'

const StateItem = ({ image, price, heading, handleButton, subheading }) => {
    return (
        <div className='items_part'>
            <img src={image} className='items_image' />
            <div className='item_details'>
                <div className='nameprice'>
                    <h4>{heading}</h4>
                    <p>-</p>
                    <h4>{price}$</h4>
                </div>
                <h5>{subheading}</h5>
            </div>
            <GlobalButton text="Add" handleClick={handleButton} className='addtocart_button' />
        </div>
    );
};

export default StateItem;
