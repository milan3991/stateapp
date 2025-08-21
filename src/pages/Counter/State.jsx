import { useState, useEffect } from 'react';
import StateItem from './components/StateItems';

import './style.counter.css';

import { db } from '../../firebase';
import { doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";


const State = ({ handleAddCart, handleRemoveCart, readyOrders, setReadyOrders, completedOrders }) => {
    const [items, setItems] = useState([]);
    const [statusById, setStatusById] = useState({});


useEffect(() => {
  const fetchItems = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/items");
      if (!res.ok) throw new Error(`HTTP greška: ${res.status}`);
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Greška pri učitavanju:", error);
    }
  };

  fetchItems();

  const intervalId = setInterval(fetchItems, 5000); // svakih 5 sekundi

  return () => clearInterval(intervalId);
}, []);

useEffect(() => {
  if (items.length === 0) return; // čekaj dok se items ne učitaju

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
}, [items]);

    const isInPreparation = (id) => !!statusById[id]?.inPreparation;
    const isCompletedDB = (id) => !!statusById[id]?.completed;

 const handlePripremaClick = async (item) => {
  handleAddCart(item);

  setStatusById(prev => ({
    ...prev,
    [item.id]: { ...prev[item.id], inPreparation: true }
  }));

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

  await setDoc(doc(db, "orders", String(itemId)), {
    ready: true,
    inPreparation: true,  
    completed: false
  }, { merge: true });

  await setDoc(doc(db, "readyOrders", String(itemId)), {
    addedAt: serverTimestamp()
  });
};

const handlePreuzetoClick = async (itemId) => {
  setStatusById(prev => ({
    ...prev,
    [itemId]: {
      completed: true,
      inPreparation: false,
      ready: false
    }
  }));

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
