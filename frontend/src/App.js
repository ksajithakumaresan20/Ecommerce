import React, { useState, useEffect } from "react";
import {
  HashRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Login from "./pages/Login";
import Admin from "./components/Admin";
import Home from "./container/Home";
import Cart from "./container/Cart";
import ProductDetails from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import AddProduct from "./components/AddProduct";
import ManageProducts from "./components/ManageProducts";
import AdminOrders from "./pages/AdminOrders";
import Orders from "./pages/Orders";
import AdminOrderDetails from "./pages/AdminOrderDetails";
import Users from "./pages/Users"
import Register from "./pages/Register";
import UserDetails from "./pages/UserDetails";
import { supabase } from "./services/supabase";
import Addresses from "./pages/Addresses";
import AddAddress from "./pages/AddAddress";
import Checkout from "./pages/Checkout";
import OrderDetails from "./pages/OrderDetails";


/* =========================
   LAYOUT COMPONENT
========================= */
function Layout({
  cart,
  wishlist,
  setCart,
  setWishlist,
  addToCart,
}) {
  const location = useLocation();

  const hideHeader = location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!hideHeader && (
        <Header
          cart={cart}
          wishlist={wishlist}
        />
      )}
      <div className={!hideHeader ? "page-content" : ""}></div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/orders" element={<Orders />} />

        <Route
  path="/admin/order/:id"
  element={<AdminOrderDetails />}
/>

       <Route
  path="/register"
  element={<Register />}
/>

<Route
  path="/user-details/:id"
  element={<UserDetails />}
/>

        <Route
          path="/admin"
          element={<Admin />}
        />

        <Route
  path="/checkout"
  element={
    <Checkout
      cart={cart}
      setCart={setCart}
    />
  }
/>

      <Route
  path="/admin/users"
  element={<Users />}
/>
/

        <Route
          path="/admin/orders"
          element={<AdminOrders />}
        />

        <Route
          path="/add-product"
          element={<AddProduct />}
        />

        <Route
          path="/manage-products"
          element={<ManageProducts />}
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
          path="/edit-profile"
          element={<EditProfile />}
        />
<Route path="/order/:id" element={<OrderDetails />} />
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

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
  path="/addresses"
  element={<Addresses />}
/>

<Route
  path="/add-address"
  element={<AddAddress />}
/>

<Route
  path="/edit-address/:id"
  element={<AddAddress />}
/>


        
      </Routes>
    </>
  );
}

/* =========================
   MAIN APP
========================= */
function App() {
  // CART SAVE
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });

  // WISHLIST SAVE
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist =
      localStorage.getItem("wishlist");

    return savedWishlist
      ? JSON.parse(savedWishlist)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

 const addToCart = async (product) => {
  const exists = cart.find((item) => item.id === product.id);

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

  // Save to Supabase cart table
  const currentUser = JSON.parse(localStorage.getItem("user"));

  if (currentUser) {
    const { error } = await supabase.from("cart").insert([
      {
        user_id: currentUser.id,
        product_id: product.id,
        quantity: 1,
      },
    ]);

    if (error) {
      console.log("Cart Insert Error:", error);
    } else {
      console.log("Cart Saved Successfully");
    }
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