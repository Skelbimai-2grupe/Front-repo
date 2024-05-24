/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo_dark from "../../assets/logo-white.png";
import search_icon_dark from "../../assets/search-b.png";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="navbar">
      <img src={logo_dark} alt="logo" className="logo" />
      <ul>
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/about")}>About</li>
        <li onClick={() => navigate("/")}>Mano Skelbimai</li>
        <li onClick={() => navigate("/myads")}>Pridėti skelbimą</li>
        {user?.role === "admin" && (
          <>
            <li onClick={() => navigate("/block-user")}>
              Uzblokuoti vartotoja
            </li>
            <li onClick={() => navigate("/block-ad")}>Uzblokuoti skelbima</li>
          </>
        )}
      </ul>
      <div className="search-box">
        <input type="text" placeholder="search" />
        <img src={search_icon_dark} alt="search icon" />
      </div>
      {user ? (
        <button className="LogoutBtn" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <>
          <button className="RegisterBtn" onClick={() => navigate("/register")}>
            Register
          </button>
          <button className="LoginBtn" onClick={() => navigate("/login")}>
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default Header;
