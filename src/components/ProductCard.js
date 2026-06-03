import React, { useState } from "react";
import { getsingleproduct } from "../services/ProductService";

function ProductCard({
  products = [],
  cart = [],
  setCart
}) {
  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [showCart, setShowCart] =
    useState(false);

  const showdetails = async (item) => {
    try {
      const data =
        await getsingleproduct(item.id);

      setSelectedProduct(data);

    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (item) => {
    console.log("Cart:", cart);
  console.log("setCart:", setCart);
   
  alert(typeof serCart);

    const exists = cart?.find(
      (product) => product.id === item.id
    );

    if (exists) {
      alert("Already Added");
      return;
    }

    setCart((prevCart) => [...prevCart, item]);

    alert("Added To Cart");
  };

  return (
    <div className="container">

      <div className="products">

        {products?.map((item) => (

          <div
            className="card"
            key={item.id}
          >

            <img
              src={item.image}
              alt={item.name}
              onClick={() =>
                showdetails(item)
              }
            />

            <h3>{item.name}</h3>

            <p className="price">
              ₹{item.price}
            </p>

            {item.inStock ? (

              <p className="text-success">
                ✅ Available
              </p>

            ) : (

               <p className="text-success">
  ✅ Available
</p>
            )}

            <button
              onClick={() =>
                addToCart(item)
              }
            >
              🛒 Add To Cart
            </button>

          </div>

        ))}

      </div>

      {showCart && (

        <div className="cart-box">

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              marginBottom: "15px"
            }}
          >

            <h2>🛒 Cart</h2>

            <button
              className="close-btn"
              onClick={() =>
                setShowCart(false)
              }
            >
              X
            </button>

          </div>

          {cart.length === 0 ? (

            <p>No Items Added</p>

          ) : (

            cart.map((item, index) => (

              <div
                key={index}
                className="cart-item"
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div>
                  <h4>{item.name}</h4>

                  <p className="price">
                    ₹{item.price}
                  </p>
                </div>

              </div>

            ))
          )}

        </div>

      )}

      {selectedProduct && (

        <div className="details-overlay">

          <div className="details-box">

            <button
              className="close-btn"
              onClick={() =>
                setSelectedProduct(null)
              }
            >
              X
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />

            <h2>
              {selectedProduct.name}
            </h2>

            <p className="details-price">
              ₹{selectedProduct.price}
            </p>

            <h4>
              {selectedProduct.category}
            </h4>

            <p>
              {selectedProduct.description}
            </p>

            {selectedProduct.inStock ? (

              <p className="text-success">
                ✅ In Stock
              </p>

            ) : (

              <p className="text-danger">
                ❌ Out Of Stock
              </p>

            )}

            <button
              onClick={() =>
                addToCart(
                  selectedProduct
                )
              }
              disabled={
                !selectedProduct.inStock
              }
            >
              🛒 Add To Cart
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default ProductCard;