/** @format */

import React, { useEffect, useState } from "react";

const BlockAdPage = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/ads");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Ensure the fetched data is an array
        setAds(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching ads:", error);
        setAds([]); // Set ads to an empty array in case of error
      }
    };
    fetchAds();
  }, []);

  const handleBlockAd = async (adId) => {
    try {
      await fetch(`http://localhost:5000/api/ads/${adId}/block`, {
        method: "POST",
      });
      setAds((prevAds) => prevAds.filter((ad) => ad.id !== adId));
    } catch (error) {
      console.error("Error blocking ad:", error);
    }
  };

  return (
    <div>
      <h2>Block Ads</h2>
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
