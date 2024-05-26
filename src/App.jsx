import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./Components/Register/RegisterPage";
import LoginPage from "./Components/Login/LoginPage";

//proxy srv port 5000

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import AdList from "./Components/AdList/AdList";
import CreateAd from "./Components/AdAdd/CreateAdd";
import CreateCategory from "./Components/CategoryAdd/CreateCategory";
import MyAds from "./Components/MyAds/MyAds";

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
      <Routes>
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/createAd" element={<CreateAd />} />
        <Route path="/createCategory" element={<CreateCategory />} />
        <Route
          path="*"
          element={
            <>
              <Header user={user} />
              <AdList />
              <Footer />
              <MyAds />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
