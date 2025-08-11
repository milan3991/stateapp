import { useState, useEffect } from 'react';
import americano from '../../assets/americano.svg';
import cappuccino from '../../assets/cappuccino.svg';
import coffee from '../../assets/coffee.svg';
import espresso from '../../assets/espresso.svg';

import './style.counter.css';
import StateItem from './components/StateItems';

const State = ({ handleAddCart, handleRemoveCart }) => {
    const items = [
        {
            id: 1,
            variants: [
                { image: americano, heading: 'Espresso Classic', quantity: 4 },
                { image: cappuccino, heading: 'Espresso Strong', quantity: 4  },
            ],
        },
        {
            id: 2,
            variants: [
                { image: coffee, heading: 'Macchiato Vanilla', quantity: 2  },
                { image: espresso, heading: 'Macchiato Caramel', quantity: 2  },
            ],
        },
        {
            id: 3,
            variants: [
                { image: americano, heading: 'Espresso Classic', quantity: 3  },
                { image: cappuccino, heading: 'Espresso Strong', quantity: 3  },
            ],
        },
        {
            id: 4,
            variants: [
                { image: coffee, heading: 'Macchiato Vanilla', quantity: 5  },
                { image: espresso, heading: 'Macchiato Caramel', quantity: 5  },
            ],
        },
    ];

    const [showExtraButtons, setShowExtraButtons] = useState(() => {
        const saved = localStorage.getItem("showExtraButtons");
        return saved ? JSON.parse(saved) : {};
    });

    const [completedOrders, setCompletedOrders] = useState(() => {
        const saved = localStorage.getItem("completedOrders");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("showExtraButtons", JSON.stringify(showExtraButtons));
    }, [showExtraButtons]);

    useEffect(() => {
        localStorage.setItem("completedOrders", JSON.stringify(completedOrders));
    }, [completedOrders]);

    const handlePripremaClick = (item) => {
        handleAddCart(item);
        setShowExtraButtons(prev => ({ ...prev, [item.id]: true }));
    };

    const handlePreuzetoClick = (itemId) => {
        setCompletedOrders(prev => [...prev, itemId]); 
        setShowExtraButtons(prev => {
            const copy = { ...prev };
            delete copy[itemId]; 
            return copy;
        });
        handleRemoveCart(itemId); 
    };

    return (
        <div className="state-wrapper">
            <div className="state-content">
                <div className="state-list-items">
                    <h3 className='items-header'>List items</h3>

                    {items
                        .filter(item => !completedOrders.includes(item.id))
                        .map((item) => (
                            <div key={item.id} className="state-item-wrapper">
                                <div className="variants-wrapper">
                                    {item.variants.map((variant, index) => (
                                        <StateItem
                                            key={index}
                                            id={item.id}
                                            image={variant.image}
                                            heading={variant.heading}
                                            hideButton={true}
                                        />
                                    ))}
                                </div>

                                <div className="action-button-wrapper">
                                    <button
                                        onClick={() => handlePripremaClick(item)}
                                        className="action-button"
                                    >
                                        Priprema
                                    </button>

                                    {showExtraButtons[item.id] && (
                                        <>
                                            <button
                                                onClick={() => console.log(`Spremno za ID: ${item.id}`)}
                                                className="action-button ready"
                                            >
                                                Spremno
                                            </button>
                                            <button
                                                onClick={() => handlePreuzetoClick(item.id)}
                                                className="action-button taken"
                                            >
                                                Preuzeto
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default State;
