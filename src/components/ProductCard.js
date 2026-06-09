import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function ProductCard({
  products = [],
  cart = [],
  setCart,
  wishlist = [],
  setWishlist
}) {
  const navigate = useNavigate();

  // ❤️ TOGGLE WISHLIST
  const toggleWishlist = (item) => {
    const exists = wishlist.find((p) => p.id === item.id);

    if (exists) {
      // remove
      setWishlist(wishlist.filter((p) => p.id !== item.id));
    } else {
      // add
      setWishlist([...wishlist, item]);
    }
  };

  const addToCart = (item) => {
    const exists = cart.find((p) => p.id === item.id);

    if (!exists) {
      setCart([...cart, item]);
    }

    navigate("/cart");
  };

  return (
    <div className="products">
      {products.map((item) => {
        const isLiked = wishlist.find((p) => p.id === item.id);

        return (
          <div key={item.id} className="card">

            {/* ❤️ HEART ICON (TOP RIGHT) */}
            <div
              style={{
                position: "relative"
              }}
            >

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

              {/* PRODUCT CLICK */}
              <div onClick={() => navigate(`/product/${item.id}`)}>
                <img src={item.image} alt={item.title} />
                <h3>{item.title}</h3>
                
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