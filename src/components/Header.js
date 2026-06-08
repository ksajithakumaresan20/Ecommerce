import React from "react";
import { useNavigate } from "react-router-dom";


export default function Header({ handleLogout, cart }) {

  const navigate = useNavigate();

  return (
    <div className="p-3 bg-info">

      <h3 className="text-white text-center mb-3">
        Toys Shop
      </h3>

      <div className="row justify-content-center">

        <div className="col-sm-12 col-md-9 col-lg-8 d-flex align-items-center gap-3">

          <button
            className="btn btn-success px-4"
            onClick={() => navigate("/home")}
          >
            Home
          </button>

          <input
            className="form-control"
            type="search"
            placeholder="Search toys..."
          />

          <button
            className="btn btn-warning"
            onClick={() => navigate("/cart")}
          >
            🛒 Cart 
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button onClick={() => navigate("/wishlist")}>
  Wishlist
</button>

        </div>

      </div>

    </div>
  );
}