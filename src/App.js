import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./container/Login";
import Home from "./container/Home";
import Cart from "./components/Cart";

function App() {

  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={
            <Home
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart cart={cart} />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;