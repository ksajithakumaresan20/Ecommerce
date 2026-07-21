import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setOrders(data);
  }

  return (
    <div className="container mt-4">

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: "#0d6efd",
            color: "#fff",
            border: "none",
            padding: "8px 15px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ← Back
        </button>

        <h2 style={{ margin: 0 }}>All Orders</h2>
      </div>

      {orders.map((order) => (
        <div key={order.id} className="card p-3 mb-3">
          <h5>Order ID</h5>

          <p
            style={{
              color: "blue",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() =>
              navigate(`/admin/order/${order.id}`)
            }
          >
            {order.id}
          </p>

         <p style={{ margin: "5px 0" }}>
  <strong>📅 Order Date:</strong>{" "}
  {new Date(order.created_at).toLocaleDateString("en-GB")}
</p>

<p style={{ margin: "5px 0 15px 0" }}>
  <strong>🕒 Order Time:</strong>{" "}
  {new Date(order.created_at).toLocaleTimeString("en-IN")}
</p>

           
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              style={{
                width: "150px",
                backgroundColor: "#ff9800",
                color: "#fff",
                border: "none",
                padding: "10px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() =>
                navigate(`/admin/order/${order.id}`)
              }
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}