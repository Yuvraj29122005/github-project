import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../images/logo.png";

function Login(){

  const navigate = useNavigate();

  const [form,setForm] = useState({
    email:"",
    password:""
  });

  const [error,setError] = useState("");

  const handleSubmit=(e)=>{
    e.preventDefault();

    if(form.email==="" || form.password===""){
      setError("Please fill all fields");
      return;
    }

    setError("");
    navigate("/home");
  };

  return(
    <div className="login-page">

      <img src={logo} alt="logo" className="top-logo"/>

      <form className="login-card" onSubmit={handleSubmit}>

        <div className="circle-icon">➜</div>

        <h2>Welcome Back</h2>
        <p className="subtitle">Login to your account</p>

        {error && <p className="error">{error}</p>}

        <label>Email</label>
        <input
          placeholder="Enter your email"
          value={form.email}
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={(e)=>setForm({...form,password:e.target.value})}
        />

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
