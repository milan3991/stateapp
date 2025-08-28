import { useState, useEffect } from "react";
import StateItem from "./components/StateItems";
import "./style.counter.css";

const State = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders");
      if (!res.ok) throw new Error(`HTTP greška: ${res.status}`);
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Greška pri učitavanju:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
    const intervalId = setInterval(fetchOrders, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, ...status } : order
        )
      );

      await fetch(`http://localhost:5000/api/orders/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(status),
      });
    } catch (err) {
      console.error("Greška:", err);
    }
  };

  const handlePripremaClick = (order) => {
    updateStatus(order.id, { inPreparation: true, ready: false, completed: false });
  };

  const handleSpremnoClick = (orderId) => {
    updateStatus(orderId, { inPreparation: true, ready: true, completed: false });
  };

  const handlePreuzetoClick = (orderId) => {
    updateStatus(orderId, { inPreparation: false, ready: false, completed: true });
  };

  return (
    <div className="state-wrapper">
      <div className="state-content">
        <div className="state-list-items">
          {orders
            .filter((order) => !order.completed)
            .map((order) => (
              <div key={order.id} className="state-item-wrapper">
                <div className="variants-wrapper">
                  {order.items.map((item, index) => (
                    <StateItem
                      key={index}
                      id={order.id}
                      image={item.image}
                      heading={item.heading}
                      quantity={item.quantity}
                      hideButton={true}
                    />
                  ))}
                </div>

                <div className="action-button-wrapper">
                  {!order.inPreparation && (
                    <button
                      onClick={() => handlePripremaClick(order)}
                      className="action-button"
                    >
                      Priprema
                    </button>
                  )}

                  {order.inPreparation && !order.completed && (
                    <>
                      <button
                        onClick={() => handleSpremnoClick(order.id)}
                        className="action-button ready"
                      >
                        {order.ready ? "✅ Spremno" : "Spremno"}
                      </button>
                      <button
                        onClick={() => handlePreuzetoClick(order.id)}
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
