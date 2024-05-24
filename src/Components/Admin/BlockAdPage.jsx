/** @format */

import React, { useEffect, useState } from "react";

const BlockAdPage = () => {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        const response = await fetch("http://localhost:5000/api/ads", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAds(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching ads:", error);
        setError("Error fetching ads.");
      }
    };
    fetchAds();
  }, []);

  const handleBlockAd = async (adId) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const response = await fetch(
        `http://localhost:5000/api/ads/${adId}/block`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setAds((prevAds) => prevAds.filter((ad) => ad.id !== adId));
    } catch (error) {
      console.error("Error blocking ad:", error);
      setError("Error blocking ad.");
    }
  };

  return (
    <div>
      <h2>Block Ads</h2>
      {error && <p>{error}</p>}
      <ul>
        {ads.length === 0 ? (
          <li>No ads available</li>
        ) : (
          ads.map((ad) => (
            <li key={ad.id}>
              {ad.title}
              <button onClick={() => handleBlockAd(ad.id)}>Block</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default BlockAdPage;
