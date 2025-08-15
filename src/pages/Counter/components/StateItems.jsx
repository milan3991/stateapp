import '../style.counter.css'


const StateItem = ({id, image, heading, quantity}) => {
    return (
        <div className='items_part'>
            <img src={image} className='items_image' />
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


StateItem.defaultProps = {
    buttonLabel: "Add to Cart"
};

export default StateItem;


