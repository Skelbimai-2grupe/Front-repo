import React, { useEffect, useState } from "react";
import AdCard from "../Card/AdCard";
import { Container, Title, Divider } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import styles from "../AdList/AdList.module.css";

const MyAds = () => {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAds = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!token || !user) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/ads/:id`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAds(data.ads);
        } else {
          console.error("Failed to fetch ads", response.statusText);
          setError(response.statusText);
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
        setError(error.message);
      }
    };

    fetchAds();
  }, [navigate]);

  return (
    <Container fluid>
      <Title align="center" mb="lg">
        All ads
      </Title>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.adsList}>
        {ads.map((ad) => (
          <div key={ad._id}>
            <AdCard ad={ad} />
          </div>
        ))}
      </div>
      <Divider />
    </Container>
  );
};

export default MyAds;
