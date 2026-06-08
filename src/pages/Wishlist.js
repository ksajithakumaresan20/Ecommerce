import React from "react";

function Wishlist({ wishlist, setWishlist }) {

  const removeItem = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
  };

  return (
    <div>
      <h2>My Wishlist ❤️</h2>

      {wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        wishlist.map((item) => (
          <div key={item.id} style={{ marginBottom: "20px" }}>
            <img src={item.image} width="100" />
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