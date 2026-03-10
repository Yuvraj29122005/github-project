import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import userImg from "../images/user.png";
import "./layout.css";

function Navbar() {

  const navigate = useNavigate();

  return (
    <div className="navbar">

      {/* LEFT LOGO */}
      <div className="nav-left">
        <Link to="/home">
          <img src={logo} alt="logo" className="nav-logo" />
        </Link>
      </div>

      {/* CENTER TITLE */}
      <div className="nav-center">
        <Link to="/home" className="brand-link">
          <span className="spare-text">Spare</span>
          <span className="kart-text">Kart</span>
        </Link>
      </div>

      {/* RIGHT SECTION */}
      <div className="nav-right">

        {/* CART */}
        <span
          className="cart"
          onClick={() => navigate("/cart")}
        >
          🛒
        </span>

        {/* PROFILE */}
        <div
          className="profile-mini"
          onClick={() => navigate("/profile")}
        >
          <img src={userImg} alt="user" className="mini-img"/>
          <span>Hi Yuvraj!</span>
        </div>

      </div>

    </div>
  );
}

export default Navbar;
