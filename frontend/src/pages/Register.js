import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateStep1 = () => {
    if (!form.name.trim()) {
      alert("Please enter your name");
      return false;
    }
    if (!form.email.trim()) {
      alert("Please enter your email");
      return false;
    }
    if (!form.password || form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!form.phone.trim()) {
      alert("Please enter your phone number");
      return false;
    }
    if (!form.address_line1.trim()) {
      alert("Please enter your address");
      return false;
    }
    if (!form.city.trim()) {
      alert("Please enter your city");
      return false;
    }
    if (!form.state.trim()) {
      alert("Please enter your state");
      return false;
    }
    if (!form.pincode.trim()) {
      alert("Please enter your pincode");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
  email: form.email,
  password: form.password,
  options: {
    data: {
      name: form.name,
    },
  },
});
    if (error) {
      setLoading(false);
      alert(error.message);
      return;
    }

    const userCode = "U" + Math.floor(1000 + Math.random() * 9000);

    const { error: userError } = await supabase.from("users").insert([
      {
        id: data.user.id,
        user_code: userCode,
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address_line1,
        role: "user",
      },
    ]);

    if (userError) {
      setLoading(false);
      alert(userError.message);
      return;
    }

    if (form.address_line1.trim()) {
      await supabase.from("addresses").insert([
        {
          user_id: data.user.id,
          full_name: form.name,
          phone: form.phone,
          address_type: "Home",
          address_line1: form.address_line1,
          address_line2: form.address_line2,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          is_default: true,
        },
      ]);
    }

    setLoading(false);
    alert("Registration Successful! Please login.");
    navigate("/");
  };

  return (
    <div className="register-container">
      <form className="register-box" onSubmit={handleRegister}>
        <h1 className="register-heading">Create Account</h1>

        {/* Step Indicator */}
        <div className="step-indicator">
          <div className={`step ${step >= 1 ? "active" : ""}`}>
            <div className="step-circle">{step > 1 ? "✓" : "1"}</div>
            <span>Account</span>
          </div>
          <div className={`step-line ${step >= 2 ? "active" : ""}`}></div>
          <div className={`step ${step >= 2 ? "active" : ""}`}>
            <div className="step-circle">2</div>
            <span>Address</span>
          </div>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="step-content">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="register-input"
              value={form.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="register-input"
              value={form.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password (min 6 characters)"
              className="register-input"
              value={form.password}
              onChange={handleChange}
            />

            <button
              type="button"
              className="register-button"
              onClick={handleNext}
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="step-content">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="register-input"
              value={form.phone}
              onChange={handleChange}
            />

            <textarea
              name="address_line1"
              placeholder="Address Line 1 *"
              className="register-input register-textarea"
              rows="2"
              value={form.address_line1}
              onChange={handleChange}
            />

            <textarea
              name="address_line2"
              placeholder="Address Line 2 (Optional)"
              className="register-input register-textarea"
              rows="2"
              value={form.address_line2}
              onChange={handleChange}
            />

            <div className="input-row">
              <input
                type="text"
                name="city"
                placeholder="City"
                className="register-input"
                value={form.city}
                onChange={handleChange}
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                className="register-input"
                value={form.state}
                onChange={handleChange}
              />
            </div>

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              className="register-input"
              value={form.pincode}
              onChange={handleChange}
            />

            <div className="button-group">
              <button
                type="button"
                className="register-button back-btn"
                onClick={handleBack}
              >
                ← Back
              </button>
              <button
                type="submit"
                className="register-button"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </div>
        )}

        <p className="register-text">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            style={{
              color: "#c60c53",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
