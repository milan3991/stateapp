import { useState, useRef } from "react";

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

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.heading === product.heading);
      if (existing) {
        return prev.map((p) =>
          p.heading === product.heading
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  const isSubmitting = useRef(false);

 const submitOrder = async () => {
  // ⛔ HARD BLOCK (štiti od StrictMode duplog poziva)
  if (isSubmitting.current) return;
  if (cart.length === 0) return;

  isSubmitting.current = true;
  setLoading(true);

  try {
    const response = await fetch("http://localhost:5000/api/orders", {
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
    isSubmitting.current = false; // ⬅️ tek NA KRAJU
  }
};

  return (
    <div className="p-6 max-w-4xl mx-auto grid grid-cols-2 gap-6">
      {/* PRODUCTS */}
      <div>
        <h2 className="text-xl font-bold mb-4">Proizvodi</h2>
        <div className="grid grid-cols-2 gap-4">
          {PRODUCTS.map((p) => (
            <button
              key={p.id}
              onClick={() => addToCart(p)}
              className="border rounded-2xl p-4 shadow hover:shadow-lg transition"
            >
              <img src={p.image} className="mb-2 rounded-xl" />
              <div className="font-semibold">{p.heading}</div>
            </button>
          ))}
        </div>
      </div>

      {/* CART */}
      <div>
        <h2 className="text-xl font-bold mb-4">Narudžba</h2>
        <div className="border rounded-2xl p-4 min-h-[200px]">
          {!cart.length && <div className="text-gray-400">Prazno</div>}
          {cart.map((item, i) => (
            <div key={i} className="flex justify-between mb-2">
              <span>{item.heading}</span>
              <span>x {item.quantity}</span>
            </div>
          ))}
        </div>

        <button
          onClick={submitOrder}
          disabled={loading || !cart.length}
          className="mt-4 w-full bg-black text-white py-3 rounded-2xl disabled:opacity-50"
        >
          {loading ? "Slanje..." : "Pošalji narudžbu"}
        </button>
      </div>
    </div>
  );
}
