import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.password || !form.confirm) {
      setError("All fields are required");
      return;
    }

    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    alert("Registration Successful");

    // redirect to login page
    navigate("/login");
  };

  return (
    <div className="page">

      {/* Logo */}
      <img src={logo} alt="logo" className="logo" />

      <form className="card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p className="sub">Join Car Spare Hub today</p>

        {error && <p className="error">{error}</p>}

        <input
          name="name"
          placeholder="Enter your full name"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Enter your phone number"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Create password"
          onChange={handleChange}
        />

        <input
          name="confirm"
          type="password"
          placeholder="Confirm password"
          onChange={handleChange}
        />

        <button className="btn">Register</button>

        <p className="loginlink">
          Already have an account? <Link to="/login">Login here</Link>
        </p>

      </form>
    </div>
  );
}

export default Register;
