import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";
import "../Styles/Admin.css";

export default function Admin() {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Panel</h2>

        <ul>
          <li onClick={() => navigate("/home")}>
            <FaHome /> Home
          </li>

          <li>
            <FaTachometerAlt /> Dashboard
          </li>

          <li onClick={() => navigate("/manage-products")}>
            <FaBoxOpen /> Products
          </li>

          <li onClick={() => navigate("/admin/orders")}>
            <FaShoppingCart /> Orders
          </li>

          <li onClick={() => navigate("/admin/users")}>
            <FaUsers /> Users
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Dashboard</h1>

        <div className="cards">

          <div
            className="card-box"
            onClick={() => navigate("/manage-products")}
          >
            <h4>Products</h4>
            <h2>20</h2>
          </div>

          <div
            className="card-box"
            onClick={() => navigate("/admin/orders")}
          >
            <h4>Orders</h4>
            <h2>18</h2>
          </div>

          <div
            className="card-box"
            onClick={() => navigate("/admin/users")}
          >
            <h4>Users</h4>
            <h2>85</h2>
          </div>

          <div className="card-box">
            <h4>Revenue</h4>
            <h2>₹25,000</h2>
          </div>

        </div>

        <div className="quick-actions">
          <button
            onClick={() => navigate("/add-product")}
          >
            Add Product
          </button>

          <button
            onClick={() => navigate("/manage-products")}
          >
            Manage Products
          </button>
        </div>
      </div>
    </div>
  );
}