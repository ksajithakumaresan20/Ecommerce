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

  return (
    <HashRouter>

      {/* ✅ HEADER ALWAYS VISIBLE */}
      <Header cart={cart} wishlist={wishlist} />

      <Routes>

        <Route path="/" element={<Login />} />

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
          path="/cart"
          element={<Cart cart={cart} />}
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

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

      </Routes>

    </HashRouter>
  );
}

export default App;