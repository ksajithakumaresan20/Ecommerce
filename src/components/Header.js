import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

import {
  FaUserCircle,
  FaHeart,
  FaGift,
  FaBoxOpen,
  FaSignOutAlt
} from "react-icons/fa";

export default function Header({ cart }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setShowMenu(false); // menu close after click
  };

  return (
    <div className="p-3 bg-info" style={{ overflow: "visible" }}>
      
      <div className="header-container"></div>
      <div className="header-buttons"></div>
      {/* HEADER ROW */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "15px"
        }}
      >

        {/* LOGO */}
        <h3
          style={{
            color: "white",
            margin: 0,
            cursor: "pointer",
            fontWeight: "bold"
          }}
          onClick={() => handleNavigate("/home")}
        >
          Toys Shop
        </h3>

        {/* SEARCH */}
        <input
          className="form-control"
          type="search"
          placeholder="Search toys..."
          style={{ width: "300px" }}
        />

        {/* RIGHT BUTTONS */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

          {/* HOME */}
          <button
            className="btn btn-success"
            onClick={() => handleNavigate("/home")}
          >
            <Icon icon="material-symbols:home" width={20} />
          </button>

          {/* CART */}
          <button
            className="btn btn-warning"
            onClick={() => handleNavigate("/cart")}
          >
            <Icon icon="mdi:cart-outline" width={20} /> ({cart?.length || 0})
          </button>

          {/* PROFILE ICON */}
          <div style={{ position: "relative" }}>
            <FaUserCircle
              size={40}
              color="white"
              style={{ cursor: "pointer" }}
              onClick={() => setShowMenu(!showMenu)}
            />

            {/* DROPDOWN MENU */}
            {showMenu && (
              <div
                style={{
                  position: "absolute",
                  top: "50px",
                  right: 0,
                  width: "200px",
                  background: "white",
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                  zIndex: 99999,
                  padding: "10px"
                }}
              >

                <div
                  style={{ cursor: "pointer", padding: "5px" }}
                  onClick={() => handleNavigate("/profile")}
                >
                  <FaUserCircle size={16} /> My Profile
                </div>

                <div
                  style={{ cursor: "pointer", padding: "5px" }}
                  onClick={() => handleNavigate("/orders")}
                >
                  <FaBoxOpen size={16} /> Orders
                </div>

                <div
                  style={{ cursor: "pointer", padding: "5px" }}
                  onClick={() => handleNavigate("/wishlist")}
                >
                  <FaHeart size={16} /> Wishlist
                </div>

                <div
                  style={{ cursor: "pointer", padding: "5px" }}
                  onClick={() => handleNavigate("/giftcards")}
                >
                  <FaGift size={16} /> Gift Cards
                </div>

                <hr />

                <div
                  style={{ cursor: "pointer", padding: "5px", color: "red" }}
                  onClick={() => {
                    localStorage.removeItem("token");
                    handleNavigate("/");
                  }}
                >
                  <FaSignOutAlt size={16} /> Logout
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}