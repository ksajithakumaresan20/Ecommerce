import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../services/supabase";
import "../Styles/OrderDetails.css";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  fetchOrder();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [id]);
  async function fetchOrder() {
    setLoading(true);

    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (*),
        addresses (
          full_name,
          phone,
          address_line1,
          address_line2,
          city,
          state,
          pincode
        )
      `)
      .eq("id", id)
      .single();

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }
    console.log("Order Data:", data);
    setOrder(data);
    setLoading(false);
  }

  async function cancelOrder() {
    const ok = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!ok) return;

    const { error } = await supabase
      .from("orders")
      .update({
        status: "Cancelled",
      })
      .eq("id", id);

    if (error) {
      alert("Unable to cancel order");
      return;
    }

    alert("Order Cancelled Successfully");

    fetchOrder();
  }

  if (loading) {
    return (
      <div className="loading">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="loading">
        Order Not Found
      </div>
    );
  }

  const timeline = [
    "Processing",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  const currentStep = timeline.indexOf(order.status);

    return (
    <div className="order-details-page">

      <div className="top-bar">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h2>Order Details</h2>
      </div>

      <div className="status-card">
        <h3>{order.status}</h3>
        <p>
          Ordered on{" "}
          {new Date(order.created_at).toLocaleString()}
        </p>
      </div>

      <div className="main-grid">

        {/* LEFT */}

        <div className="left-section">

          {/* Products */}

          <div className="card-box">

            <h3>Products</h3>

            {order.order_items?.map((item) => (

              <div
                key={item.id}
                className="product-row"
              >

                <img
  src={item.product_image}
  alt={item.product_title}
  className="order-product-image"
  style={{ cursor: "pointer" }}
  onClick={() => navigate(`/product/${item.product_id}`)}
/>

                <div className="product-info">

                  <h4>{item.product_title}</h4>

                  <p>
                    Quantity : {item.quantity}
                  </p>

                  <p>
                    Price : ₹{item.price}
                  </p>

                </div>

              </div>

            ))}

          </div>

          {/* Tracking */}

          <div className="card-box">

            <h3>Order Tracking</h3>

            <div className="timeline">

              {timeline.map((step, index) => (

                <div
                  key={step}
                  className="timeline-item"
                >

                  <div
                    className={
                      index <= currentStep
                        ? "circle active"
                        : "circle"
                    }
                  >
                    ✓
                  </div>

                  <div className="timeline-content">

                    <h5>{step}</h5>

                    {index !== timeline.length - 1 && (
                      <div
                        className={
                          index < currentStep
                            ? "line active"
                            : "line"
                        }
                      />
                    )}

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="right-section">

          {/* Address */}

          <div className="card-box">

            <h3>Delivery Address</h3>

            <p>
              <strong>
                {order.addresses?.full_name}
              </strong>
            </p>

            <p>{order.addresses?.phone}</p>

            <p>{order.addresses?.address_line1}</p>

            {order.addresses?.address_line2 && (
              <p>{order.addresses.address_line2}</p>
            )}

            <p>
              {order.addresses?.city},
              {" "}
              {order.addresses?.state}
            </p>

            <p>{order.addresses?.pincode}</p>

          </div>

          {/* Summary */}

          <div className="card-box">

            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Items Total</span>
              <span>₹{order.total_amount}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>FREE</span>
            </div>

            <div className="summary-row">
              <span>GST</span>
              <span>₹0</span>
            </div>

            <hr />

            <div className="summary-row total">
              <span>Grand Total</span>
              <span>₹{order.total_amount}</span>
            </div>

          </div>

          {/* Cancel */}

          {order.status !== "Delivered" &&
            order.status !== "Cancelled" && (

            <button
              className="cancel-btn"
              onClick={cancelOrder}
            >
              Cancel Order
            </button>

          )}

        </div>

      </div>

    </div>
  );
}