/** @format */

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import supabaseConfig from "../../../supabase";

function Users() {
  const [users, setUsers] = useState([]);
  const { supabaseUrl, supabaseKey } = supabaseConfig;

  const supabase = createClient(supabaseUrl, supabaseKey);
  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.from("users").select();
      console.log(data);
      console.log(error);

      if (error) {
        // Handle the error if needed
        console.error("Error fetching User data:", error);
      } else {
        setUsers(data);
      }
    };

    fetchUserData();
  }, []);

  // Show a loading message or spinner while the data is being fetched
  if (users.length === 0) {
    return <div>No users in database...</div>;
  }

  return (
    <div>
      <h1>Users:</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
            <p>Platform: {user.platform}</p>
            <p>Gamertag: {user.gamertag}</p>
            <p>Timezone: {user.timezone}</p>
            <p>Created At: {user.created_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
