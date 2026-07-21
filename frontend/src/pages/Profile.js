import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container mt-4">

      {/* Back Button */}
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {/* Profile Card */}
      <div className="card shadow border-0 text-center p-4">

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="profile"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            margin: "0 auto",
          }}
        />

        <h3 className="mt-3">
          {user?.name || "Sajitha"}
        </h3>

        <p>{user?.email}</p>

      </div>

      {/* Menu */}
      <div className="list-group mt-4 shadow-sm">

        <button
          className="list-group-item list-group-item-action"
          onClick={() => navigate("/edit-profile")}
        >
          <Icon icon="mdi:pencil" width="22" className="me-2" />
          Edit Profile
        </button>

        <button
          className="list-group-item list-group-item-action"
          onClick={() => navigate("/orders")}
        >
          <Icon icon="mdi:package-variant-closed" width="22" className="me-2" />
          My Orders
        </button>

        <button
          className="list-group-item list-group-item-action"
          onClick={() => navigate("/addresses")}
        >
          <Icon icon="mdi:map-marker" width="22" className="me-2" />
          My Addresses
        </button>

      </div>

    </div>
  );
}