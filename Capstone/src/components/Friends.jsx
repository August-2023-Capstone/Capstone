/** @format */

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import supabaseConfig from "../../supabase";

function Friends() {
  const [friends, setFriends] = useState([]);
  const { supabaseUrl, supabaseKey } = supabaseConfig;

  const supabase = createClient(supabaseUrl, supabaseKey);
  useEffect(() => {
    const fetchUserFriendData = async () => {
      const { data, error } = await supabase.from("friends").select();
      console.log(data);
      console.log(error);

      if (error) {
        // Handle the error if needed
        console.error("Error fetching Friends Data:", error);
      } else {
        setFriends(data);
      }
    };

    fetchUserFriendData();
  }, []);

  if (friends.length === 0) {
    return <div>No Friends data found get some Friends.</div>;
  }

  return (
    <div>
      <h1>Friends:</h1>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            <p>userID: {friend.userId}</p>
            <p>friendsUID: {friend.friendUserId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Friends;
