import { useState } from 'react';
import { db } from '../../firebase';
import { doc, setDoc } from "firebase/firestore";

import americano from '../../assets/americano.svg';
import cappuccino from '../../assets/cappuccino.svg';
import coffee from '../../assets/coffee.svg';
import espresso from '../../assets/espresso.svg';

import './style.counter.css';
import StateItem from './components/StateItems';

const State = ({ handleAddCart, handleRemoveCart, readyOrders, setReadyOrders, completedOrders }) => {
    const items = [
        {
            id: 1, variants: [
                { image: americano, heading: 'Espresso Classic', quantity: 4 },
                { image: cappuccino, heading: 'Espresso Strong', quantity: 4 },
                { image: americano, heading: 'Espresso Classic', quantity: 4 },
                { image: cappuccino, heading: 'Espresso Strong', quantity: 4 },

            ]
        },
        {
            id: 2, variants: [
                { image: coffee, heading: 'Macchiato Vanilla', quantity: 2 },
                { image: espresso, heading: 'Macchiato Caramel', quantity: 2 },
                { image: americano, heading: 'Espresso Classic', quantity: 4 },
                { image: cappuccino, heading: 'Espresso Strong', quantity: 4 },

            ]
        },
        {
            id: 3, variants: [
                { image: americano, heading: 'Espresso Classic', quantity: 3 },
                { image: cappuccino, heading: 'Espresso Strong', quantity: 3 },
                { image: americano, heading: 'Espresso Classic', quantity: 4 },
                { image: cappuccino, heading: 'Espresso Strong', quantity: 4 },
                { image: americano, heading: 'Espresso Classic', quantity: 4 },
                { image: cappuccino, heading: 'Espresso Strong', quantity: 4 },

            ]
        },
        {
            id: 4, variants: [
                { image: coffee, heading: 'Macchiato Vanilla', quantity: 5 },
                { image: espresso, heading: 'Macchiato Caramel', quantity: 5 },
            ]
        },
                {
            id: 5, variants: [
                { image: americano, heading: 'Espresso Classic', quantity: 4 },
                { image: cappuccino, heading: 'Espresso Strong', quantity: 4 },
                { image: americano, heading: 'Espresso Classic', quantity: 4 },
                { image: cappuccino, heading: 'Espresso Strong', quantity: 4 },

            ]
        },
        {
            id: 6, variants: [
                { image: coffee, heading: 'Macchiato Vanilla', quantity: 2 },
                { image: espresso, heading: 'Macchiato Caramel', quantity: 2 },
                { image: americano, heading: 'Espresso Classic', quantity: 4 },
                { image: cappuccino, heading: 'Espresso Strong', quantity: 4 },

            ]
        },
        {
            id: 7, variants: [
                { image: americano, heading: 'Espresso Classic', quantity: 3 },
                { image: cappuccino, heading: 'Espresso Strong', quantity: 3 },
                { image: americano, heading: 'Espresso Classic', quantity: 4 },
                { image: cappuccino, heading: 'Espresso Strong', quantity: 4 },
                { image: americano, heading: 'Espresso Classic', quantity: 4 },
                { image: cappuccino, heading: 'Espresso Strong', quantity: 4 },

            ]
        },
        {
            id: 8, variants: [
                { image: coffee, heading: 'Macchiato Vanilla', quantity: 5 },
                { image: espresso, heading: 'Macchiato Caramel', quantity: 5 },
            ]
        },

    ];

    const [showExtraButtons, setShowExtraButtons] = useState({});

    const handlePripremaClick = (item) => {
        handleAddCart(item);
        setShowExtraButtons(prev => ({ ...prev, [item.id]: true }));
    };

    const handlePreuzetoClick = async (itemId) => {
        // Zapiši u completedOrders
        await setDoc(doc(db, "completedOrders", String(itemId)), { completed: true });

        // Ukloni iz prikaza odmah
        setShowExtraButtons(prev => {
            const copy = { ...prev };
            delete copy[itemId];
            return copy;
        });

        handleRemoveCart(itemId);
    };

    const handleSpremnoClick = async (itemId) => {
        await setDoc(doc(db, "readyOrders", String(itemId)), { ready: true });
    };

    return (
        <div className="state-wrapper">
            <div className="state-content">
                <div className="state-list-items">

                    {items
                        .filter(item => !completedOrders.includes(item.id)) // ✅ filtriraj trajno
                        .map((item) => (
                            <div key={item.id} className="state-item-wrapper">
                                <div className="variants-wrapper">
                                    {item.variants.map((variant, index) => (
                                        <StateItem
                                            key={index}
                                            id={item.id}
                                            image={variant.image}
                                            heading={variant.heading}
                                            quantity={variant.quantity}
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
                                                onClick={() => handleSpremnoClick(item.id)}
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
                        ))}
                </div>
            </div>
        </div>
    );
};

export default State;
