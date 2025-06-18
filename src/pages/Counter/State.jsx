import { useState } from 'react';
import image1 from '../../assets/laptop1.svg';
import image2 from '../../assets/laptop2.svg';
import image3 from '../../assets/laptop3.svg';
import image4 from '../../assets/laptop4.svg';

import './style.counter.css';
import StateItem from './components/StateItems';

const State = ({ handleAddCart }) => {
    const items = [
        {
            id: 1,
            image: image1,
            heading: 'Item 1',
            price: 220,
            subheading: 'Brand new laptop'
        },
        {
            id: 2,
            image: image2,
            heading: 'Item 2',
            price: 320,
            subheading: 'Brand new laptop'
        },
        {
            id: 3,
            image: image3,
            heading: 'Item 3',
            price: 420,
            subheading: 'Brand new laptop'
        },
        {
            id: 4,
            image: image4,
            heading: 'Item 4',
            price: 520,
            subheading: 'Brand new laptop'
        },
    ];

    return (
        <div className="state-wrapper">
            <div className="state-content">
                <div className="state-list-items">
                    <h3 className='items-header'>List items</h3>

                    {items.map((item) => {
                        return (
                            <StateItem
                                key={item.id}
                                id={item.id}
                                image={item.image}
                                heading={item.heading}
                                subheading={item.subheading}
                                price={item.price}
                                handleButton={() => handleAddCart(item)}
                            />
                        )
                    })}

                </div>

            </div>
        </div>
    )
};

export default State;