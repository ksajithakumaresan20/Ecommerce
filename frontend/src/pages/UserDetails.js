import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Get User
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

      if (userError) {
        console.log(userError);
      } else {
        setUser(userData);
      }

      // Get Cart Products
      const { data: cartData, error: cartError } = await supabase
        .from("cart")
        .select(`
          quantity,
          products (
            id,
            title,
            price
          )
        `)
        .eq("user_id", id);

      if (cartError) {
        console.log(cartError);
      } else {
        setCartItems(cartData);
      }
    }

    fetchData();
  }, [id]);

  if (!user) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="container mt-5">
      <button
        className="btn btn-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {/* User Details */}
      <div className="card shadow p-4">
        <h2>User Details</h2>
        <hr />

        <p><b>User Code:</b> {user.user_code}</p>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Phone:</b> {user.phone || "-"}</p>
        <p><b>Address:</b> {user.address || "-"}</p>
        <p><b>Role:</b> {user.role}</p>
      </div>

      {/* Products Added */}
      <div className="card shadow p-4 mt-4">
        <h3>Products Added</h3>

        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>

          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.products?.id}</td>
                  <td>{item.products?.title}</td>
                  <td>₹{item.products?.price}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No Products Added
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}