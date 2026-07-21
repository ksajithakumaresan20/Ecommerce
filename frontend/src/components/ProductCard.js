import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

function ProductCard({
  products = [],
  wishlist = [],
  setWishlist
}) {
  const navigate = useNavigate();

  // ❤️ WISHLIST TOGGLE
  const toggleWishlist = (item) => {
    const exists = wishlist.find((p) => p.id === item.id);

    if (exists) {
      setWishlist(wishlist.filter((p) => p.id !== item.id));
    } else {
      setWishlist([...wishlist, item]);
    }
  };

  return (
    <div className="products">
      {products.map((item) => {
        const isLiked = wishlist.find((p) => p.id === item.id);
        const rating = Number(item.rating) || 4.2;

        return (
          <div key={item.id} className="card">
            {/* ❤️ HEART ICON */}
            <div style={{ position: "relative" }}>
              <div
                onClick={() => toggleWishlist(item)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  cursor: "pointer",
                  fontSize: "20px"
                }}
              >
                {isLiked ? (
                  <FaHeart color="red" />
                ) : (
                  <FaRegHeart />
                )}
              </div>

              {/* PRODUCT AREA */}
              <div onClick={() => navigate(`/product/${item.id}`)}>
                <img src={item.image} alt={item.title} />

                <h3>{item.title}</h3>

                <div className="rating">
                  <FaStar
                    style={{
                      color: "gold",
                      fontSize: "14px"
                    }}
                  />

                  <span
                    style={{
                      marginLeft: "5px",
                      fontSize: "14px",
                      color: "#111"
                    }}
                  >
                    {rating}
                  </span>
                </div>

                <p>₹{item.price}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductCard;