import '../style.counter.css'


const StateItem = ({id, image, heading}) => {
    return (
        <div className='items_part'>
            <img src={image} className='items_image' />
            <div className='item_details'>
                <div className='nameprice'>
                    <h4>{heading}</h4>
                </div>
            </div>
            
            </div>
    );
};


StateItem.defaultProps = {
    buttonLabel: "Add to Cart"
};

export default StateItem;


