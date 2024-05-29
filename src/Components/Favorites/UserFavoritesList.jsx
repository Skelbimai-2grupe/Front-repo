import React, { useEffect, useState } from "react";
import AdCard from "../Card/AdCard";
import { Container, Title, Divider, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import classes from "./UserFavoritesList.module.css";
import styles from "./UserFavoritesList.module.css";

const UserFavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserFavorites = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user ? user._id : null;
      console.log("Token:", token);
      console.log("User id:", userId);

      try {
        const response = await fetch(
          `http://localhost:5000/api/favorites/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setFavorites(data.favorites);
        } else {
          console.error("Failed to fetch user favorites", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user favorites:", error);
        setError(error.message);
      }
    };
    fetchUserFavorites();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredFavorites = favorites.filter((favorite) =>
    favorite.ad_id.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  return (
    <Container fluid>
      <a className={classes.link} href="" onClick={() => navigate("/")}>
        Home
      </a>
      <Title align="center" mb="lg">
        My favorites
      </Title>
      <TextInput
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className={styles.search}
      />
      <div className={styles.adsList}>
        {filteredFavorites.length > 0 ? (
          filteredFavorites.map((favorite) => (
            <div key={favorite._id}>
              <AdCard ad={favorite.ad_id} />
            </div>
          ))
        ) : (
          <p>No favorites found</p>
        )}
      </div>
      <Divider className={styles.divider} mt="md" />
    </Container>
  );
};

export default UserFavoritesList;
