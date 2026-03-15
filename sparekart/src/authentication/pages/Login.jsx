import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
import logo from "../../images/logo.png";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  // ── Admin credentials ──
  const ADMIN_EMAIL = "admin@sparekart.com";
  const ADMIN_PASSWORD = "admin123";

  const validate = () => {
    const e = {};

    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email address";
    }

    if (!form.password.trim()) {
      e.password = "Password is required";
    } else if (form.password.length < 6) {
      e.password = "Password must be at least 6 characters";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!validate()) return;

    // Check for admin login
    if (form.email === ADMIN_EMAIL) {
      if (form.password === ADMIN_PASSWORD) {
        navigate("/admin/dashboard");
        return;
      } else {
        setFormError("Invalid admin password");
        return;
      }
    }

    // Regular user login
    navigate("/home");
  };

  return (
    <div className="login-page">
      <img src={logo} alt="logo" className="top-logo" />

      <form className="login-card" onSubmit={handleSubmit}>
        <div className="circle-icon">➜</div>

        <h2>Welcome Back</h2>
        <p className="subtitle">Login to your account</p>

        {formError && <p className="error">{formError}</p>}

        <label>Email</label>
        <input
          className={errors.email ? "input-error" : ""}
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />
        {errors.email && <p className="field-error">{errors.email}</p>}

        <label>Password</label>
        <input
          type="password"
          className={errors.password ? "input-error" : ""}
          placeholder="Enter your password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />
        {errors.password && <p className="field-error">{errors.password}</p>}

        <div className="forgot">
          <Link to="/forgot">Forgot Password?</Link>
        </div>

        <button className="login-btn">Login</button>

        <p className="register">
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
