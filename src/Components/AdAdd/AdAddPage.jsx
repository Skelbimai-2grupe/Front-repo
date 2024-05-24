/** @format */

import React, { useState } from "react";
import styles from "./AdAddPage.module.css";

const AdAdder = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !price || !category || !image) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/api/ads/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create ad");
      }

      alert("Ad created successfully!");

      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImage(null);
      setError("");
    } catch (error) {
      setError("An error occurred while creating the ad.");
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <h2>Create your ad</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Create Ad</button>
      </form>
    </div>
  );
};

export default AdAdder;
