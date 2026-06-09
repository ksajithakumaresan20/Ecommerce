import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Icon} from "@iconify/react";


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

  return (
    <div className="p-3 bg-info">
      <h3 className="text-white text-center mb-3">
        Toys Shop
      </h3>

      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-9 col-lg-8 d-flex align-items-center gap-3">

          {/* Home Button */}
          <button
            className="btn btn-success px-4"
            onClick={() => navigate("/home")}
          >

            <Icon icon="material-symbols:home" width={20}/>
          </button>

          {/* Search */}
          <input
            className="form-control"
            type="search"
            placeholder="Search toys..."
            style={{ width: "250px" }}
          />

          {/* Cart */}
          <button
            className="btn btn-warning"
            onClick={() => navigate("/cart")}
          >
            <Icon  icon="mdi:cart-outline" width={20}/>
             ({cart?.length || 0})
          </button>

          {/* Profile Dropdown */}
          <div className="profile-menu">

            <div
              className="profile-trigger"
              onClick={() => setShowMenu(!showMenu)}
            >
              <FaUserCircle size={40} color="white" />
            </div>

            {showMenu && (
              <div className="dropdown-menu-custom">

                <div onClick={() => navigate("/profile")}>
                  <FaUserCircle
                    color="#ffffff"
                    size={18}
                    className="me-2"
                  />
                 My Profile
                </div>

                <div onClick={() => navigate("/orders")}>
                  <FaBoxOpen
                    color="#fd7e14"
                    size={18}
                    className="me-2"
                  />
                  Orders
                </div>

                <div onClick={() => navigate("/wishlist")}>
                  <FaHeart
                    color="#dc3545"
                    size={18}
                    className="me-2"
                  />
                  Wishlist
                </div>

                <div onClick={() => navigate("/giftcards")}>
                  <FaGift
                    color="#198754"
                    size={18}
                    className="me-2"
                  />
                  Gift Cards
                </div>

                <div
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                >
                  <FaSignOutAlt
                    color="#6c757d"
                    size={18}
                    className="me-2"
                  />
                  Logout
                </div>

              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}