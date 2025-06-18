import { Route, Routes, BrowserRouter as Router } from "react-router-dom"
import './App.css'
import Navigation from "./components/Navigation/Navigation"
import Footer from "./components/Footer/Footer"
import Home from "./pages/Home/Home"
import State from "./pages/Counter/State"
import Users from "./pages/Users/Users"
import { useState } from "react"
import Cart from "./pages/Cart/Cart"

function App() {

    const [cartItems, setCartItems] = useState([]);

  const handleAddCart = (item) => {
    const existingItem = cartItems.find((i) => i.id === item.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      )
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }])
    }
  };


  const handleRemoveCart = (itemId) => {
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== itemId))
  };


  // Increase and decrease quantity
  const handleIncreaseQuantity = (itemid) => {
    setCartItems(
      cartItems.map((i) =>
        i.id === itemid ? { ...i, quantity: i.quantity + 1 } : i
      )
    )
  };

  const handleDecreaseQuantity = (itemId) => {
    // const item = cartItems.find(i => i.id === itemid);
    // if (item.quantity === 1) {
    //     handleRemoveCart(item.id);
    // } else {
    //     setCartItems(
    //         cartItems.map((i) =>
    //             i.id === itemid ? { ...i, quantity: i.quantity - 1 } : i
    //         )
    //     )
    // }

    // drugi nacin
    setCartItems(
      cartItems
        .map((i) => (i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    )
  };


  return (
    <Router>
      <Navigation
        cartCounter={cartItems.length}
      />

      <Routes>
        <Route path="/" element={<State
          handleAddCart={handleAddCart}
        />}
        />
        <Route path="/state" element={<State
          handleAddCart={handleAddCart}
        />}
        />
        <Route path='/users' element={<Users />} />
        <Route path="/cart" element={<Cart
          cartItems={cartItems}
          handleRemoveCart={handleRemoveCart}
          handleIncreaseQuantity={handleIncreaseQuantity}
          handleDecreaseQuantity={handleDecreaseQuantity}
        />}
        />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
