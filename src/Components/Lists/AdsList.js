/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";

const AdsList = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get("/api/ads", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setAds(response.data.ads);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ads:", error);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  const handleBlockAd = async (adId) => {
    try {
      await axios.patch(
        `/api/ads/block/${adId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAds(
        ads.map((ad) => (ad._id === adId ? { ...ad, isBlocked: true } : ad))
      );
    } catch (error) {
      console.error("Error blocking ad:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Ads List</h2>
      <ul>
        {ads.map((ad) => (
          <li key={ad._id}>
            {ad.description} - ${ad.price} -{" "}
            {ad.isBlocked ? "Blocked" : "Active"}
            <button onClick={() => handleBlockAd(ad._id)}>Block Ad</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdsList;
