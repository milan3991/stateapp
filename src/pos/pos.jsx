import { useState, useRef } from "react";
import "./style.pos.css";

const PRODUCTS = [
  {
    id: 1,
    heading: "Espresso",
    image: "https://www.svgrepo.com/show/211921/espresso.svg",
  },
  {
    id: 2,
    heading: "Cappuccino",
    image: "https://www.svgrepo.com/show/211880/frappe.svg",
  },
  {
    id: 3,
    heading: "Latte",
    image: "https://www.svgrepo.com/show/499751/coffee.svg",
  },
  {
    id: 4,
    heading: "Macchiato Vanilla",
    image: "https://www.svgrepo.com/show/211921/espresso.svg",
  },
  {
    id: 5,
    heading: "Macchiato Caramel",
    image: "https://www.svgrepo.com/show/211880/frappe.svg",
  },
  {
    id: 6,
    heading: "Espresso Classic",
    image: "https://www.svgrepo.com/show/499751/coffee.svg",
  },
];

export default function POS() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const isSubmitting = useRef(false);

  /* ➕ DODAJ ARTIKAL */
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  /* ➖ UKLONI ARTIKAL */
  const removeFromCart = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  /* 📤 SLANJE NARUDŽBE */
  const submitOrder = async () => {
    if (isSubmitting.current || !cart.length) return;

    isSubmitting.current = true;
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      });

      if (!response.ok) throw new Error("Server error");

      setCart([]);
      alert("Narudžba poslana! ✅");
    } catch (err) {
      alert("Greška pri slanju ❌");
    } finally {
      setLoading(false);
      isSubmitting.current = false;
    }
  };

  return (
    <div className="wrapper">
      {/* PRODUCTS */}
      <div>
        <h2 className="heading">Proizvodi</h2>
        <div className="products_wrapper">
          {PRODUCTS.map((p) => (
            <button
              key={p.id}
              onClick={() => addToCart(p)}
              className="pos_button"
            >
              <img src={p.image} className="pos_image" />
              <div className="heading">{p.heading}</div>
            </button>
          ))}
        </div>
      </div>

      {/* CART */}
      <div>
        <h2 className="heading">Narudžba</h2>

        <div className="cart">
          {!cart.length && <div className="heading">Prazno</div>}

          {cart.map((item) => (
            <div key={item.id} className="cart_item">
              <img src={item.image} className="cart_image" />

              <div className="cart_info">
                <div className="cart_title">{item.heading}</div>
                <div className="cart_qty">x {item.quantity}</div>
              </div>

              <button
                className="remove_button"
                onClick={() => removeFromCart(item.id)}
              >
                −
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={submitOrder}
          disabled={loading || !cart.length}
          className="send_button"
        >
          {loading ? "Slanje..." : "Pošalji narudžbu"}
        </button>
      </div>
    </div>
  );
}
