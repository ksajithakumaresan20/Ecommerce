import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPlusCircle,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminSidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2>Toys Shop</h2>

      <div className="menu-item" onClick={() => navigate("/admin")}>
        <FaTachometerAlt /> Dashboard
      </div>

      <div className="menu-item" onClick={() => navigate("/admin/add-product")}>
        <FaPlusCircle /> Add Product
      </div>

      <div className="menu-item" onClick={() => navigate("/admin/manage-products")}>
        <FaBoxOpen /> Manage Products
      </div>

      <div className="menu-item" onClick={() => navigate("/admin/orders")}>
        <FaShoppingCart /> Orders
      </div>

      <div className="menu-item" onClick={() => navigate("/admin/customers")}>
        <FaUsers /> Customers
      </div>

      <div className="menu-item" onClick={() => navigate("/admin/settings")}>
        <FaCog /> Settings
      </div>

      <div className="menu-item" onClick={() => navigate("/")}>
        <FaSignOutAlt /> Logout
      </div>
    </div>
  );
}