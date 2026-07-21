import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  FaUserCircle,
  FaHeart,
  FaGift,
  FaBoxOpen,
  FaSignOutAlt,
  FaUserShield,
} from "react-icons/fa";

export default function Header({ cart }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const ADMIN_USERS = [
    "saji@2005gmail.com",
    "sajitha",
  ];

  const isAdmin = ADMIN_USERS.includes(
    user?.email?.trim().toLowerCase()
  );

  const handleNavigate = (path) => {
    navigate(path);
    setShowMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div
      className="fixed-header"
      style={{
        background: "#2874f0",
        padding: "12px 20px",
        overflow: "visible",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "15px",
        }}
      >
        {/* LOGO */}
        <h3
          style={{
            color: "white",
            margin: 0,
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={() => handleNavigate("/home")}
        >
          Toys Shop
        </h3>

        {/* SEARCH */}
        <input
          type="search"
          placeholder="Search toys..."
          className="form-control"
          style={{ width: "300px" }}
        />

        {/* RIGHT SIDE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {isAdmin && (
            <button
              className="btn btn-light"
              onClick={() => handleNavigate("/admin")}
            >
              <FaUserShield size={20} />
            </button>
          )}

          {/* CART */}
          <button
            className="btn btn-warning"
            onClick={() => handleNavigate("/cart")}
          >
            <Icon icon="mdi:cart-outline" width={20} /> (
            {cart?.length || 0})
          </button>

          {/* PROFILE */}
          <div style={{ position: "relative" }}>
            <FaUserCircle
              size={40}
              color="white"
              style={{ cursor: "pointer" }}
              onClick={() => setShowMenu(!showMenu)}
            />

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
                  padding: "10px",
                }}
              >
                <div
                  style={{ cursor: "pointer", padding: "8px" }}
                  onClick={() => handleNavigate("/profile")}
                >
                  <FaUserCircle size={16} /> My Profile
                </div>

                <div
                  style={{ cursor: "pointer", padding: "8px" }}
                  onClick={() => handleNavigate("/orders")}
                >
                  <FaBoxOpen size={16} /> Orders
                </div>

                <div
                  style={{ cursor: "pointer", padding: "8px" }}
                  onClick={() => handleNavigate("/wishlist")}
                >
                  <FaHeart size={16} /> Wishlist
                </div>

                <div
                  style={{ cursor: "pointer", padding: "8px" }}
                  onClick={() => handleNavigate("/giftcards")}
                >
                  <FaGift size={16} /> Gift Cards
                </div>

                <hr />

                <div
                  style={{
                    cursor: "pointer",
                    padding: "8px",
                    color: "red",
                  }}
                  onClick={handleLogout}
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