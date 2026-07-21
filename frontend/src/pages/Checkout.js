import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import "../components/Checkout.css";

export default function Checkout({ cart, setCart }) {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);

  // Inline new address form
  const [showNewForm, setShowNewForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    full_name: "",
    phone: "",
    address_type: "Home",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    fetchAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAddresses = async () => {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", user.id)
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: false });

    if (!error && data) {
      setAddresses(data);
      const defaultAddr = data.find((a) => a.is_default);
      if (defaultAddr) {
        setSelectedAddress(defaultAddr.id);
      }
    }

    setLoading(false);
  };

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveNewAddress = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    if (
      !newAddress.full_name.trim() ||
      !newAddress.phone.trim() ||
      !newAddress.address_line1.trim() ||
      !newAddress.city.trim() ||
      !newAddress.state.trim() ||
      !newAddress.pincode.trim()
    ) {
      alert("Please fill all required fields");
      return;
    }

    const isFirst = addresses.length === 0;

    const { data, error } = await supabase
      .from("addresses")
      .insert([
        {
          user_id: user.id,
          full_name: newAddress.full_name,
          phone: newAddress.phone,
          address_type: newAddress.address_type,
          address_line1: newAddress.address_line1,
          address_line2: newAddress.address_line2,
          city: newAddress.city,
          state: newAddress.state,
          pincode: newAddress.pincode,
          is_default: isFirst ? true : false,
        },
      ])
      .select()
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    await fetchAddresses();
    setSelectedAddress(data.id);
    setShowNewForm(false);
    setNewAddress({
      full_name: "",
      phone: "",
      address_type: "Home",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      pincode: "",
    });
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    setOrdering(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("Please login first");
        setOrdering(false);
        return;
      }

      const addr = addresses.find((a) => a.id === selectedAddress);
      console.log("selectedAddress:", selectedAddress);
      console.log("addr:", addr);

   
      const orderPayload = {
        user_id: user.id,
        total_amount: totalAmount,
        status: "Pending",
      };

      if (addr) {
        orderPayload.address_id = selectedAddress;
        //orderPayload.address_snapshot = addressSnapshot;
      }

      let { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([orderPayload])
        .select()
        .single();

      if (orderError) {
        delete orderPayload.address_id;
        delete orderPayload.address_snapshot;
        ({ data: orderData, error: orderError } = await supabase
          .from("orders")
          .insert([orderPayload])
          .select()
          .single());
      }

      if (orderError) throw orderError;
const orderItems = cart.map((item) => ({
  order_id: orderData.id,
  product_id: item.id,
  product_title: item.title,
  product_image: item.image,   // ✅ Add this line
  quantity: item.quantity || 1,
  price: item.price,
}));
      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      setCart([]);
      alert("Order Placed Successfully!");
      navigate("/orders");
    } catch (error) {
      console.error(error);
      alert("Order failed! Please try again.");
    } finally {
      setOrdering(false);
    }
  };

  if (cart.length === 0 && !loading) {
    return (
      <div className="container py-5 text-center">
        <h3>Your cart is empty</h3>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/home")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <button
        className="btn btn-outline-primary mb-3"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h2 className="mb-4 fw-bold">Checkout</h2>

      {/* Progress Steps */}
      <div className="checkout-progress mb-4">
        <div className="progress-step completed">
          <div className="progress-circle">✓</div>
          <span>Cart</span>
        </div>
        <div className="progress-line active"></div>
        <div className="progress-step active">
          <div className="progress-circle">2</div>
          <span>Address</span>
        </div>
        <div className="progress-line"></div>
        <div className="progress-step">
          <div className="progress-circle">3</div>
          <span>Payment</span>
        </div>
      </div>

      <div className="row">
        {/* LEFT - Address Selection */}
        <div className="col-lg-8">
          <div className="card shadow-sm mb-4 border-0">
            <div className="checkout-card-header">
              <h5 className="mb-0">Delivery Address</h5>
            </div>

            <div className="card-body">
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary"></div>
                </div>
              ) : (
                <>
                  {/* Address List */}
                  {addresses.length > 0 && (
                    <div className="address-list">
                      {addresses.map((addr) => (
                        <div
                          key={addr.id}
                          className={`address-option ${
                            selectedAddress === addr.id ? "selected" : ""
                          }`}
                          onClick={() => setSelectedAddress(addr.id)}
                        >
                          <div className="address-option-left">
                            <input
                              type="radio"
                              name="address"
                              checked={selectedAddress === addr.id}
                              onChange={() => setSelectedAddress(addr.id)}
                              className="address-radio"
                            />
                          </div>

                          <div className="address-option-right">
                            <div className="d-flex align-items-center mb-1">
                              <strong>{addr.full_name}</strong>
                              <span
                                className={`badge ms-2 ${
                                  addr.address_type === "Home"
                                    ? "bg-success"
                                    : addr.address_type === "Work"
                                    ? "bg-primary"
                                    : "bg-secondary"
                                }`}
                              >
                                {addr.address_type}
                              </span>
                              {addr.is_default && (
                                <span className="badge bg-warning text-dark ms-2">
                                  Default
                                </span>
                              )}
                            </div>

                            <p className="mb-1 text-muted small">
                              {addr.phone}
                            </p>

                            <p className="mb-0 small">
                              {addr.address_line1}
                              {addr.address_line2 &&
                                `, ${addr.address_line2}`}
                              , {addr.city}, {addr.state} - {addr.pincode}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add New Address Button / Form */}
                  {showNewForm ? (
                    <div className="new-address-form mt-3">
                      <h6 className="fw-bold mb-3">New Address</h6>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <input
                            type="text"
                            name="full_name"
                            className="form-control"
                            placeholder="Full Name *"
                            value={newAddress.full_name}
                            onChange={handleNewAddressChange}
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <input
                            type="text"
                            name="phone"
                            className="form-control"
                            placeholder="Phone *"
                            value={newAddress.phone}
                            onChange={handleNewAddressChange}
                          />
                        </div>

                        <div className="col-md-4 mb-3">
                          <select
                            name="address_type"
                            className="form-select"
                            value={newAddress.address_type}
                            onChange={handleNewAddressChange}
                          >
                            <option>Home</option>
                            <option>Work</option>
                            <option>Other</option>
                          </select>
                        </div>

                        <div className="col-md-8 mb-3">
                          <input
                            type="text"
                            name="pincode"
                            className="form-control"
                            placeholder="Pincode *"
                            value={newAddress.pincode}
                            onChange={handleNewAddressChange}
                          />
                        </div>

                        <div className="col-12 mb-3">
                          <textarea
                            name="address_line1"
                            className="form-control"
                            rows="2"
                            placeholder="Address Line 1 *"
                            value={newAddress.address_line1}
                            onChange={handleNewAddressChange}
                          />
                        </div>

                        <div className="col-12 mb-3">
                          <textarea
                            name="address_line2"
                            className="form-control"
                            rows="2"
                            placeholder="Address Line 2 (Optional)"
                            value={newAddress.address_line2}
                            onChange={handleNewAddressChange}
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <input
                            type="text"
                            name="city"
                            className="form-control"
                            placeholder="City *"
                            value={newAddress.city}
                            onChange={handleNewAddressChange}
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <input
                            type="text"
                            name="state"
                            className="form-control"
                            placeholder="State *"
                            value={newAddress.state}
                            onChange={handleNewAddressChange}
                          />
                        </div>
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-primary"
                          onClick={handleSaveNewAddress}
                        >
                          Save Address
                        </button>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => setShowNewForm(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="btn btn-outline-success mt-3 add-address-btn"
                      onClick={() => setShowNewForm(true)}
                    >
                      + Add New Address
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT - Order Summary */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 order-summary-card">
            <div className="checkout-card-header summary-header">
              <h5 className="mb-0">Order Summary</h5>
            </div>

            <div className="card-body">
              <div className="summary-items">
                {cart.map((item) => (
                  <div key={item.id} className="summary-item">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="summary-img"
                      />
                      <div>
                        <strong className="small">{item.title}</strong>
                        <br />
                        <span className="text-muted small">
                          Qty: {item.quantity || 1}
                        </span>
                      </div>
                    </div>
                    <strong className="small">
                      ₹{item.price * (item.quantity || 1)}
                    </strong>
                  </div>
                ))}
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Delivery</span>
                <span className="text-success fw-bold">FREE</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-3">
                <h5 className="fw-bold">Total</h5>
                <h5 className="fw-bold text-primary">₹{totalAmount}</h5>
              </div>

              <div className="payment-section">
                <h6 className="mb-2">Payment Method</h6>
                <div className="payment-option">
                  <input
                    className="form-check-input"
                    type="radio"
                    checked
                    readOnly
                  />
                  <label className="form-check-label">
                    Cash on Delivery
                  </label>
                </div>
              </div>

              <button
                className="btn btn-success w-100 mt-4 place-order-btn"
                onClick={handlePlaceOrder}
                disabled={ordering || !selectedAddress}
              >
                {ordering ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Placing Order...
                  </>
                ) : (
                  `Place Order - ₹${totalAmount}`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
