/** @format */

import React, { useEffect, useState } from "react";

const BlockAdPage = () => {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/ads/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAds(data.ads);
        } else {
          console.error("Failed to fetch ads", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
        setError(error.message);
      }
    };

    fetchAds();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

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
        },
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
    <div className="adsContainer ">
      <div>
        <h1>Ads List</h1>
      </div>
      <ul className="ads ">
        {ads.map((ad) => (
          <li key={ad._id}>
            <button onClick={() => handleBlockAd(ad.id)}>Block</button>;
            <img src={ad.image} alt={ad.description} />
            <p>Price: {ad.price}</p>
            <p>Description: {ad.description}</p>
            <p>Category: {ad.category_id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default BlockAdPage;
