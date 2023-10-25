import React, { useState, useEffect } from "react";
import supabase from "../../supabase";
import "../App.css";

import FriendsList from "./FriendsList";
import ProfileData from "./ProfileData";

import ProfileGameCards from "./ProfileGameCards";
import TestProfileGames from "./TestProfileGames";

const TestOtherProfilePage = () => {
  const [friendIds, setFriendIds] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [friendProfiles, setFriendProfiles] = useState([]);
  const [profileGames, setProfileGames] = useState([]);

  const [profileData, setProfileData] = useState([]);

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
          .eq("user_id", loggedInUserId);

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

  useEffect(() => {
    const fetchProfileGames = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("linked_games")
        .select(
          `
          games (
            id,
            name,
            genre,
            art,
            platform
          )
          `
        )
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        // The 'games' property within each object contains an array of game data
        const gamesData = data.map((item) => item.games);
        setProfileGames(gamesData);
      }
    };

    fetchProfileGames();
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", user.id);

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setProfileData(data);
        if (data.length > 0 && data[0].gamertag === null) {
          setShowCreateUserForm(true);
        }
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="profilePage">
      <div>
        <ProfileData profileData={profileData} />
        <div className="content">
          <div>
            <TestProfileGames profileGames={profileGames} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestOtherProfilePage;
