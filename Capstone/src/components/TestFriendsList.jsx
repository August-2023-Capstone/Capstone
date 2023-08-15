/** @format */

import React, { useState, useEffect } from "react";
import supabase from "../../../supabase";
import AcceptDeclineButtons from "./AcceptDeclineButtons";

const FriendList = () => {
  const [friendIds, setFriendIds] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [friendProfiles, setFriendProfiles] = useState([]);

  useEffect(() => {
    // Fetch the logged-in user's ID
    const fetchLoggedInUserId = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setLoggedInUserId(user.id);
    };

    fetchLoggedInUserId();
  }, []);

  useEffect(() => {
    // Fetch friend IDs where the logged-in user is user_id
    const fetchFriendIds = async () => {
      try {
        const { data: friendData, error: friendError } = await supabase
          .from("friends")
          .select("friend_id")
          .eq("user_id", loggedInUserId)
          .eq("status", true);

        if (friendError) {
          console.error("Error fetching friend IDs:", friendError);
          return;
        }

        setFriendIds(friendData.map((friend) => friend.friend_id));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Fetch friend IDs where the logged-in user is friend_id
    const fetchUserIds = async () => {
      try {
        const { data: userData, error: userError } = await supabase
          .from("friends")
          .select("user_id")
          .eq("friend_id", loggedInUserId);

        if (userError) {
          console.error("Error fetching user IDs:", userError);
          return;
        }

        setFriendIds((prevIds) => [
          ...prevIds,
          ...userData.map((user) => user.user_id),
        ]);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (loggedInUserId) {
      fetchFriendIds();
      fetchUserIds();
    }
  }, [loggedInUserId]);

  useEffect(() => {
    // Fetch profiles of friends using friend IDs
    const fetchFriendProfiles = async () => {
      try {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("id, gamertag")
          .in("id", friendIds);

        if (profileError) {
          console.error("Error fetching friend profiles:", profileError);
          return;
        }

        setFriendProfiles(profileData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (friendIds.length > 0) {
      fetchFriendProfiles();
    }
  }, [friendIds]);

  console.log("hello");

  return (
    <div>
      <h1>Friend List</h1>
      <ul>
        {friendProfiles.map((profile) => (
          <li key={profile.id}>
            {profile.gamertag}
            <AcceptDeclineButtons
              friendId={profile.id}
              loggedInUserId={loggedInUserId}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendList;
