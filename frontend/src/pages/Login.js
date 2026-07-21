import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // 🔥 get role from users table
      const { data: profile, error: roleError } = await supabase
        .from("users")
        .select("role")
        .eq("email", data.user.email)
        .maybeSingle();

      if (roleError) throw roleError;


// profile check
const role = profile?.role || "user";


// store session
localStorage.setItem("token", data.session.access_token);
localStorage.setItem("user", JSON.stringify(data.user));
localStorage.setItem("role", role);


// redirect based on role
if (role === "admin") {
  navigate("/admin");
} else {
  navigate("/home");
}

    } catch (error) {
      console.log(error);
      alert(error.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form
        className="login-box"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <h1 className="login-heading">Login</h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>

        <p className="login-text">
  Don't have an account?{" "}
  <span
    onClick={() => navigate("/register")}
    style={{
      color: "blue",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Register
  </span>
</p>

        <p className="login-text">Welcome to E-Commerce</p>

      </form>
    </div>
  );
}