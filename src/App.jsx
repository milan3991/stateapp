import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import State from "./pages/Counter/State";
import { useState, useEffect } from "react";
import Cart from "./pages/Cart/Cart";

import { db } from "./firebase";
import {
  collection, onSnapshot, doc, setDoc, deleteDoc, serverTimestamp
} from "firebase/firestore";

import { getAuth, signInAnonymously } from "firebase/auth";
const auth = getAuth();
signInAnonymously(auth).catch(console.error);

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [readyOrders, setReadyOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]); 

  // Listen za cartItems
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "cartItems"), (snap) => {
      const data = snap.docs.map(d => ({
        orderId: d.id,
        ...d.data()
      }));
      setCartItems(data);
    });
    return unsub;
  }, []);

  // Listen za readyOrders
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "readyOrders"), (snap) => {
      const ids = snap.docs.map(d => d.id);
      setReadyOrders(ids);
    });
    return unsub;
  }, []);

  // Listen za completedOrders 
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "completedOrders"), (snap) => {
      const ids = snap.docs.map(d => Number(d.id)); // pretvori u broj
      setCompletedOrders(ids);
    });
    return unsub;
  }, []);

  const handleAddCart = async (item) => {
    const orderId = String(item.id);
    await setDoc(
      doc(db, "cartItems", orderId),
      {
        variants: item.variants,
        createdAt: serverTimestamp()
      },
      { merge: false }
    );
  };

  const handleRemoveCart = async (itemId) => {
    const id = String(itemId);
    await deleteDoc(doc(db, "cartItems", id)).catch(() => {});
    await deleteDoc(doc(db, "readyOrders", id)).catch(() => {});
  };

  const isInCart = (id) => cartItems.some(ci => String(ci.orderId) === String(id));

  return (
    <Router>
            <Navigation cartItems={cartItems} />

      <Routes>
        <Route
          path="/"
          element={
            <State
              handleAddCart={handleAddCart}
              handleRemoveCart={handleRemoveCart}
              cartItems={cartItems}
              isInCart={isInCart}
              readyOrders={readyOrders}
              setReadyOrders={setReadyOrders}
              completedOrders={completedOrders} // NOVO
            />
          }
        />
        <Route
          path="/state"
          element={
            <State
              handleAddCart={handleAddCart}
              handleRemoveCart={handleRemoveCart}
              cartItems={cartItems}
              isInCart={isInCart}
              readyOrders={readyOrders}
              setReadyOrders={setReadyOrders}
              completedOrders={completedOrders} // NOVO
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              handleRemoveCart={handleRemoveCart}
              readyOrders={readyOrders}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
