import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import Orders from "./Orders";

export default function AdminOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line
  }, []);

async function fetchOrder() {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (*)
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    return;
  }

  setOrder(data);
}

async function updateStatus(newStatus) {
  const { error } = await supabase
    .from("orders")
    .update({ status: newStatus })
    .eq("id", order.id);

    console.log(Orders);

  if (error) {
    console.log(error);
    return;
  }

  setOrder({
    ...order,
    status: newStatus,
  });
}

  if (!order) return <h3>Loading...</h3>;

  return (
    <div
      style={{
        background: "#f4f7fc",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginBottom: "25px",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ← Back
        </button>

        <h2 style={{ margin: 0 }}>📦 Order Details</h2>
      </div>

      {/* Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h6>Total Amount</h6>
          <h3>₹{order.total_amount}</h3>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h6>Total Products</h6>
          <h3>{order.order_items?.length}</h3>
        </div>
      </div>

      {/* Order Info */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "15px",
          marginBottom: "25px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h4>Order Information</h4>

       <p>
  <strong>Order ID:</strong> {order.id}
</p>

<p>
  <strong>Order Date:</strong>{" "}
  {new Date(order.created_at).toLocaleDateString("en-GB")}
</p>

<p>
  <strong>Order Time:</strong>{" "}
  {new Date(order.created_at).toLocaleTimeString("en-IN")}
</p>

<p>
  <strong>Status:</strong>{" "}
  <select
    value={order.status}
    onChange={(e) => updateStatus(e.target.value)}
    style={{
      padding: "8px 12px",
      borderRadius: "8px",
      marginLeft: "10px",
      border: "1px solid #ccc",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    <option value="Pending">Pending</option>
    <option value="Shipped">Shipped</option>
    <option value="Delivered">Delivered</option>
  </select>
</p>
      </div>

      {/* Products */}
      <h3 style={{ marginBottom: "20px" }}>Products</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "20px",
        }}
      >
        {order.order_items?.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h5>{item.product_title}</h5>

            <p>📦 Qty: {item.quantity}</p>

            <p>💰 Price: ₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}