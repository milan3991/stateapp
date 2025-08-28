import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import State from "./pages/Counter/State";
import { useState } from "react";
import Cart from "./pages/Cart/Cart";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddCart = (item) => {
    if (!cartItems.some((ci) => ci.id === item.id)) {
      setCartItems((prev) => [...prev, item]);
    }
  };

  const handleRemoveCart = (itemId) => {
    setCartItems((prev) => prev.filter((ci) => ci.id !== itemId));
    console.log("Cart state:", cartItems);
  };

  const isInCart = (id) => cartItems.some((ci) => String(ci.id) === String(id));

  return (
    <Router>
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
            <Cart cartItems={cartItems} handleRemoveCart={handleRemoveCart} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
