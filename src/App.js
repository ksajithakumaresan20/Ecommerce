
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./container/Home";
import Cart from "./container/Cart";
import ProductDetails from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";
import Header from "./components/Header";
import Profile from "./pages/Profile";   
import EditProfile from "./pages/EditProfile";
import React, { useState, useEffect } from "react";

/* =========================
   LAYOUT COMPONENT
========================= */
function Layout({
  cart,
  wishlist,
  setCart,
  setWishlist,
  addToCart
}) {
  const location = useLocation();

  // hide header on login page
  const hideHeader = location.pathname === "/";

  return (
    <>
      {!hideHeader && (
        <Header cart={cart} wishlist={wishlist} />
      )}

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
          path="/product/:id"
          element={
            <ProductDetails addToCart={addToCart} />
          }
        />
        <Route path="/edit-profile" element={<EditProfile />} />

        <Route
  path="/cart"
  element={
    <Cart
      cart={cart}
      setCart={setCart}
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

        {/* 🔥 NEW PROFILE ROUTE */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

/* =========================
   MAIN APP
========================= */
function App() {
 const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
});
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

  
  // ADD TO CART FUNCTION
const addToCart = (product) => {
  const exists = cart.find(
    (item) => item.id === product.id
  );

  if (exists) {
    const updatedCart = cart.map((item) =>
      item.id === product.id
        ? {
            ...item,
            quantity: (item.quantity || 1) + 1,
          }
        : item
    );

    setCart(updatedCart);
  } else {
    setCart([
      ...cart,
      {
        ...product,
        quantity: 1,
      },
    ]);
  }

  alert("Added To Cart");
};

  return (
    <HashRouter>
      <Layout
        cart={cart}
        wishlist={wishlist}
        setCart={setCart}
        setWishlist={setWishlist}
        addToCart={addToCart}
      />
    </HashRouter>
  );
}

export default App;