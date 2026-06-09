import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./container/Home";
import Cart from "./container/Cart";
import ProductDetails from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";
import Header from "./components/Header";

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (product) => {
    const exists = cart.find(
      (item) => item.id === product.id
    );

    if (exists) {
      alert("Already Added To Cart");
      return;
    }

    setCart([...cart, product]);
    alert("Added To Cart");
  };

  return (
    <HashRouter>
      {/* Header */}
      <Header
        cart={cart}
        wishlist={wishlist}
      />

      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/home"
          element={
            <Home
              cart={cart}
              setCart={setCart}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetails
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
            />
          }
        />

        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;