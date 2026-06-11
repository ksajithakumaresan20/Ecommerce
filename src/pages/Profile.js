import React from "react";
import { useNavigate } from "react-router-dom";

import { Icon } from "@iconify/react";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="container mt-4 text-center">

      {/* Back Button */}
     

      {/* Profile Image */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="profile"
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          marginTop: "10px",
        }}
      />

      {/* Name */}
      <h3 className="mt-3">Sajitha</h3>

      {/* Email */}
      <p>Sajitha29@gmail.com</p>

      {/* Buttons Section */}
      <div className="d-flex flex-column align-items-center mt-4">

        {/* Edit Profile Button */}
        <button
          className="btn btn-warning mb-2"
          onClick={() => navigate("/edit-profile")}
        >
          <Icon icon="mdi:pencil" width="18" /> Edit Profile
        </button>

        {/* Add Another Account / Logout */}
        

      </div>

    </div>
  );
}