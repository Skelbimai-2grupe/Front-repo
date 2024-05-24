/** @format */

import React, { useEffect, useState } from "react";

const BlockUserPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Ensure the fetched data is an array
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]); // Set users to an empty array in case of error
      }
    };
    fetchUsers();
  }, []);

  const handleBlockUser = async (userId) => {
    try {
      await fetch(`http://localhost:5000/api/users/${userId}/block`, {
        method: "POST",
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  return (
    <div>
      <h2>Block Users</h2>
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
