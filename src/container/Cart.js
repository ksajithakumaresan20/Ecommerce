import React from "react";
import { useNavigate } from "react-router-dom";

export default function Cart({ cart }) {

  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>

      <h1>Cart Page 🛒</h1>

      {cart.length === 0 ? (
        <h3>Your Cart is Empty</h3>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                width: "250px",
                background: "#fff",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "contain",
                }}
              />

              <h3>{item.title}</h3>

              <p>₹{item.price}</p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate("/home")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Back To Home
      </button>

    </div>
  );
}