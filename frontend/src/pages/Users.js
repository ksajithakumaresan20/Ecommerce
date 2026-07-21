import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const { data, error } = await supabase
      .from("users")
      .select("id, user_code, name, email, phone, role");

    if (error) {
      console.log(error);
      return;
    }

    setUsers(data);
  }

  return (
    <div className="container mt-5">

      {/* Header */}
      <div className="d-flex align-items-center mb-4">
        <button
          className="btn btn-primary me-3"
          onClick={() => navigate("/admin")}
        >
          ← Back
        </button>

        <h2 className="m-0">Users</h2>
      </div>

      {/* Users Table */}
      <table className="table table-bordered table-hover shadow">
        <thead className="table-dark">
          <tr>
            <th>User Code</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.user_code}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone || "-"}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => navigate(`/user-details/${user.id}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No Users Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}