import React from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    alert("✅ Order Placed Successfully!");

    // Cart clear
    setCart([]);

    
  };

  return (
    <div style={{ padding: "20px" }}>
      
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "15px",
          padding: "8px 12px",
          cursor: "pointer"
        }}
      >
        ⬅ Back
      </button>

      <h2>My Cart 🛒</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
           <div key={item.id} style={{ marginBottom: "20px" }}>
  <img src={item.image} width="100" alt={item.title} />

  <h3>{item.title}</h3>

  <p>₹{item.price}</p>

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginTop: "10px"
    }}
  >
    <button
      onClick={() => {
        const updatedCart = cart
          .map((p) =>
            p.id === item.id
              ? {
                  ...p,
                  quantity: (p.quantity || 1) - 1,
                }
              : p
          )
          .filter((p) => (p.quantity || 0) > 0);

        setCart(updatedCart);
      }}
    >
      -
    </button>

    <span>{item.quantity || 1}</span>

    <button
      onClick={() => {
        const updatedCart = cart.map((p) =>
          p.id === item.id
            ? {
                ...p,
                quantity: (p.quantity || 1) + 1,
              }
            : p
        );

        setCart(updatedCart);
      }}
    >
      +
    </button>
  </div>

  <p style={{ marginTop: "10px" }}>
    Total: ₹{item.price * (item.quantity || 1)}
  </p>
</div>
          ))}

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            style={{
              backgroundColor: "green",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              marginTop: "20px"
            }}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;