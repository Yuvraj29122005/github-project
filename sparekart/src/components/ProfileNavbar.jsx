import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import "./layout.css";
import "./profileNavbar.css";

function ProfileNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

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

      {/* RIGHT SECTION WITH LOGOUT */}
      <div className="nav-right">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileNavbar;
