import React from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "15px",
          padding: "8px 12px",
          cursor: "pointer",
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

            

              <p style={{ marginTop: "10px" }}>
                Total: ₹{item.price * (item.quantity || 1)}
              </p>
            </div>
          ))}

         <button
  onClick={() => navigate("/checkout")}
  style={{
    backgroundColor: "#0d6efd",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
  }}
>
  Go To Checkout
</button>
        </>
      )}
    </div>
  );
}

export default Cart;