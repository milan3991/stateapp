import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, setDoc, serverTimestamp, onSnapshot } from "firebase/firestore";

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

    const [statusById, setStatusById] = useState({});

    // 🔹 Real-time sync za svaki artikl
    useEffect(() => {
        const unsubscribers = items.map(item => {
            const ref = doc(db, "orders", String(item.id));
            return onSnapshot(ref, (snapshot) => {
                const data = snapshot.data();
                setStatusById(prev => ({
                    ...prev,
                    [item.id]: {
                        inPreparation: !!data?.inPreparation,
                        ready: !!data?.ready,
                        completed: !!data?.completed
                    }
                }));
            });
        });

        return () => unsubscribers.forEach(unsub => unsub());
    }, []);

    const isInPreparation = (id) => !!statusById[id]?.inPreparation;
    const isCompletedDB = (id) => !!statusById[id]?.completed;

    const handlePripremaClick = async (item) => {
        handleAddCart(item);

        // Odmah lokalno prikaži dugmad
        setStatusById(prev => ({
            ...prev,
            [item.id]: { ...prev[item.id], inPreparation: true }
        }));

        // Spremi u Firestore
        await setDoc(doc(db, "orders", String(item.id)), {
            inPreparation: true,
            ready: false,
            completed: false
        }, { merge: true });
    };

const handleSpremnoClick = async (itemId) => {
  setStatusById(prev => ({
    ...prev,
    [itemId]: { ...prev[itemId], ready: true }
  }));

  // Firestore orders update
  await setDoc(doc(db, "orders", String(itemId)), {
    ready: true
  }, { merge: true });

  // Dodaj u readyOrders kolekciju
  await setDoc(doc(db, "readyOrders", String(itemId)), {
    addedAt: serverTimestamp()
  });
};

    const handlePreuzetoClick = async (itemId) => {
        await setDoc(doc(db, "orders", String(itemId)), {
            completed: true,
            inPreparation: false,
            ready: false
        }, { merge: true });

        handleRemoveCart(itemId);
    };

    return (
        <div className="state-wrapper">
            <div className="state-content">
                <div className="state-list-items">

                    {items
                        .filter(item => !completedOrders.includes(item.id) && !isCompletedDB(item.id))
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
                                    {!isInPreparation(item.id) && (
                                        <button
                                            onClick={() => handlePripremaClick(item)}
                                            className="action-button"
                                        >
                                            Priprema
                                        </button>
                                    )}

                                    {isInPreparation(item.id) && (
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
