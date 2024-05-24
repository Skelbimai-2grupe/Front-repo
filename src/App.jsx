/** @format */

import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RegisterPage from "./Components/Register/RegisterPage";
import LoginPage from "./Components/Login/LoginPage";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Body from "./Components/Body/Body";
import BlockUserPage from "./Components/Admin/BlockUserPage"; // Adjust the path if necessary
import BlockAdPage from "./Components/Admin/BlockAdPage"; // Adjust the path if necessary

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/block-user"
          element={
            user?.role === "admin" ? (
              <BlockUserPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/block-ad"
          element={
            user?.role === "admin" ? <BlockAdPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="*"
          element={
            <>
              <Body />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
