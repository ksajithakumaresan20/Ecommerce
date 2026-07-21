import React from "react";
import { useNavigate } from "react-router-dom";

function Wishlist({ wishlist, setWishlist }) {
  const navigate = useNavigate();

  const removeItem = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
  };

  return (
    <div style={{ padding: "20px" }}>
      
      {/* Back Button */}
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

      <h2>My Wishlist ❤️</h2>

      {wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        wishlist.map((item) => (
          <div key={item.id} style={{ marginBottom: "20px" }}>
            <img src={item.image} width="100" alt={item.title} />
            <h3>{item.title}</h3>
            <p>₹{item.price}</p>

            <button onClick={() => removeItem(item.id)}>
              Remove ❌
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Wishlist;