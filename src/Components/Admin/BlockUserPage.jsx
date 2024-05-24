/** @format */

import React, { useEffect, useState } from "react";

const BlockUserPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.statusText}`);
        }
        const data = await response.json();
        setUsers(Array.isArray(data.users) ? data.users : []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users. Please try again later.");
      }
    };
    fetchUsers();
  }, []);

  const handleBlockUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}/block`,
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
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error blocking user:", error);
      setError("Error blocking user.");
    }
  };

  return (
    <div>
      <h2>Block Users</h2>
      {error && <p>{error}</p>}
      <ul>
        {users.length === 0 ? (
          <li>No users available</li>
        ) : (
          users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
              <button onClick={() => handleBlockUser(user.id)}>Block</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default BlockUserPage;
