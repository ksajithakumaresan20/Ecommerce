import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/AddressCard.css";

export default function AddressCard({ address, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="card shadow-sm border-0 address-card">
      <div className="card-body">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">{address.full_name}</h5>

          <div>
            <span
              className={`badge me-2 ${
                address.address_type === "Home"
                  ? "bg-success"
                  : address.address_type === "Work"
                  ? "bg-primary"
                  : "bg-secondary"
              }`}
            >
              {address.address_type}
            </span>

            {address.is_default && (
              <span className="badge bg-warning text-dark">
                Default
              </span>
            )}
          </div>
        </div>

        {/* Phone */}
        <p className="mb-2">
          <strong>📞 Phone:</strong> {address.phone}
        </p>

        {/* Address */}
        <p className="mb-1">
          {address.address_line1}
        </p>

        {address.address_line2 && (
          <p className="mb-1">
            {address.address_line2}
          </p>
        )}

        <p className="mb-3">
          {address.city}, {address.state} - {address.pincode}
        </p>

        <hr />

        {/* Buttons */}
        <div className="d-flex justify-content-end">

          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => navigate(`/edit-address/${address.id}`)}
          >
            ✏ Edit
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(address.id)}
          >
            🗑 Delete
          </button>

        </div>

      </div>
    </div>
  );
}