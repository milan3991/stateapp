import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import State from "./pages/Counter/State";
import { useState, useEffect } from "react";
import Cart from "./pages/Cart/Cart";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    // Učitavanje iz localStorage odmah prilikom inicijalizacije
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddCart = (item) => {
    const existingItem = cartItems.find((i) => i.id === item.id);
    if (!existingItem) {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const handleRemoveCart = (itemId) => {
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== itemId));
  };

  const isInCart = (id) => cartItems.some(item => item.id === id);

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
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              handleRemoveCart={handleRemoveCart}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
