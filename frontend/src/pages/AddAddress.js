import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../services/supabase";
import "../Styles/AddAddress.css";

export default function AddAddress() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address_type: "Home",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
    is_default: false,
  });

  useEffect(() => {
  if (id) {
    fetchAddress();
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [id]);

  const fetchAddress = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("id", id)
      .single();

    if (!error && data) {
      setForm({
        full_name: data.full_name,
        phone: data.phone,
        address_type: data.address_type,
        address_line1: data.address_line1,
        address_line2: data.address_line2,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        is_default: data.is_default,
      });
    }

    setLoading(false);
  };
  const saveAddress = async () => {
  if (
    !form.full_name ||
    !form.phone ||
    !form.address_line1 ||
    !form.city ||
    !form.state ||
    !form.pincode
  ) {
    alert("Please fill all required fields");
    return;
  }

  setLoading(true);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    navigate("/login");
    return;
  }

  if (form.is_default) {
    await supabase
      .from("addresses")
      .update({ is_default: false })
      .eq("user_id", user.id);
  }

  const payload = {
    user_id: user.id,
    full_name: form.full_name,
    phone: form.phone,
    address_type: form.address_type,
    address_line1: form.address_line1,
    address_line2: form.address_line2,
    city: form.city,
    state: form.state,
    pincode: form.pincode,
    is_default: form.is_default,
  };

  let error;

  if (id) {
    ({ error } = await supabase
      .from("addresses")
      .update(payload)
      .eq("id", id));
  } else {
    ({ error } = await supabase
      .from("addresses")
      .insert([payload]));
  }

  setLoading(false);

  if (error) {
    alert(error.message);
    return;
  }

  alert(id ? "Address Updated Successfully!" : "Address Added Successfully!");
  navigate("/addresses");
};

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="container py-4">

      <div className="card shadow border-0">

        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            {id ? "Edit Address" : "Add New Address"}
          </h4>
        </div>

        <div className="card-body">

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
            </div>
          ) : (

            <form>

              <div className="row">

                <div className="col-md-6 mb-3">
                  <label className="form-label">Full Name</label>

                  <input
                    type="text"
                    className="form-control"
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Phone</label>

                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Address Type</label>

                  <select
                    className="form-select"
                    name="address_type"
                    value={form.address_type}
                    onChange={handleChange}
                  >
                    <option>Home</option>
                    <option>Work</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Pincode</label>

                  <input
                    type="text"
                    className="form-control"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 mb-3">
                  <label className="form-label">Address Line 1</label>

                  <textarea
                    className="form-control"
                    rows="2"
                    name="address_line1"
                    value={form.address_line1}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 mb-3">
                  <label className="form-label">Address Line 2</label>

                  <textarea
                    className="form-control"
                    rows="2"
                    name="address_line2"
                    value={form.address_line2}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">City</label>

                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">State</label>

                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 mb-4">

                  <div className="form-check">

                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="default"
                      name="is_default"
                      checked={form.is_default}
                      onChange={handleChange}
                    />

                    <label
                      className="form-check-label"
                      htmlFor="default"
                    >
                      Set as Default Address
                    </label>

                  </div>

                </div>

                {/* 👇 Save button logic Part 2-la varum */}
                <div className="col-12 d-flex justify-content-end">

                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={() => navigate("/addresses")}
                  >
                    Cancel
                  </button>

                 <button
  type="button"
  className="btn btn-primary"
  onClick={saveAddress}
  disabled={loading}
>
  {loading
    ? "Saving..."
    : id
    ? "Update Address"
    : "Save Address"}
</button>

                </div>

              </div>

            </form>

          )}

        </div>

      </div>

    </div>
  );
}