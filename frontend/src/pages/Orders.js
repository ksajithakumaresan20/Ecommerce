import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";
import "../Styles/Orders.css";
import ReviewModal from "../components/ReviewModal";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [reviews, setReviews] = useState([]);

  const [showReview, setShowReview] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
    fetchReviews();
  }, []);

  async function fetchOrders() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

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
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setOrders(data || []);
  }

  async function fetchReviews() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    const { data, error } = await supabase
      .from("reviews")
      .select("product_id")
      .eq("user_id", user.id);

    if (error) {
      console.log(error);
      return;
    }

    setReviews(data || []);
  }

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((o) => o.status === filter);

  return (
  <div className="orders-page">

  <div className="orders-header">
    <button
      className="back-btn"
      onClick={() => navigate(-1)}
    >
      ←
    </button>

    <h2>My Orders</h2>
  </div>

  <div className="filter-bar">
    {[
      "All",
      "Processing",
      "Packed",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ].map((status) => (
      <button
        key={status}
        className={filter === status ? "active" : ""}
        onClick={() => setFilter(status)}
      >
        {status}
      </button>
    ))}
  </div>

  {filteredOrders.length === 0 ? (
    <div className="empty">
      No Orders Found
    </div>
  ) : (
    filteredOrders.map((order) => (
      <div className="order-card" key={order.id}>

        <div className="order-id">
          <h5>Order ID</h5>
          <p>{order.id.slice(0, 8)}</p>
        </div>

        <div>
          <h5>Date</h5>
          <p>{new Date(order.created_at).toLocaleDateString()}</p>
        </div>

        <div>
          <h5>Total</h5>
          <p>₹{order.total_amount}</p>
        </div>

        <div>
          <h5>Status</h5>

          <span
            className={`status ${order.status
              .toLowerCase()
              .replace(/\s/g, "-")}`}
          >
            {order.status}
          </span>
        </div>

        <div className="items">

          {order.order_items?.map((item) => {

            const reviewed = reviews.some(
              (review) => review.product_id === item.product_id
            );

            return (

              <div className="item-row" key={item.id}>

                <img
                  src={item.product_image}
                  alt={item.product_title}
                />

                <div className="item-details">

                  <h6>{item.product_title}</h6>

                  <p>Qty : {item.quantity}</p>

                  <p>₹{item.price}</p>

                  {order.status === "Delivered" &&
                    (reviewed ? (
                      <button
                        className="reviewed-btn"
                        disabled
                      >
                        ✅ Reviewed
                      </button>
                    ) : (
                      <button
                        className="review-btn"
                        onClick={() => {
                          setSelectedOrder(order);
                          setSelectedProduct(item);
                          setShowReview(true);
                        }}
                      >
                        ⭐ Write Review
                      </button>
                    ))}

                </div>

              </div>

            );

          })}

                  </div>

        <div className="actions">
          <button
            className="view-btn"
            onClick={() => navigate(`/order/${order.id}`)}
          >
            View Details
          </button>
        </div>

      </div>
    ))
  )}

  <ReviewModal
    show={showReview}
    onClose={() => setShowReview(false)}
    order={selectedOrder}
    product={selectedProduct}
    onSuccess={() => {
      fetchOrders();
      fetchReviews();
    }}
  />

</div>
  );
}