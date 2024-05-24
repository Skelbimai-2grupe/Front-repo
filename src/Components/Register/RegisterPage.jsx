/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register");
      }
      const data = await response.json();
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2>Register Form</h2>
      {error && <p>{error}</p>}
      <div>
        <form className={styles.registerForm} onClick={handleRegister}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button className={styles.registerBtn} type="submit">
            Create
          </button>
        </form>
      </div>
      <button type="button" onClick={handleBackToLogin}>
        Back to Login
      </button>
      <button type="button" onClick={handleBackToHome}>
        Home
      </button>
    </div>
  );
}

export default RegisterPage;
