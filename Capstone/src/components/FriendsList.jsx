/** @format */

import React, { useState, useEffect } from "react";
import supabase from "../../supabase";
import AcceptDeclineButtons from "./AcceptDeclineButtons";
import Avatar1 from "../assets/Avatars/Avatar1.png";
import Avatar2 from "../assets/Avatars/Avatar2.png";
import Avatar3 from "../assets/Avatars/Avatar3.png";
import Avatar4 from "../assets/Avatars/Avatar4.png";
import Avatar5 from "../assets/Avatars/Avatar5.png";
import Avatar6 from "../assets/Avatars/Avatar6.png";
import Avatar7 from "../assets/Avatars/Avatar7.png";
import Avatar8 from "../assets/Avatars/Avatar8.png";
import Avatar9 from "../assets/Avatars/Avatar9.png";
import Avatar10 from "../assets/Avatars/Avatar10.png";
import Avatar11 from "../assets/Avatars/Avatar11.png";
import Avatar12 from "../assets/Avatars/Avatar12.png";

const avatarOptions = {
  Avatar1,
  Avatar2,
  Avatar3,
  Avatar4,
  Avatar5,
  Avatar6,
  Avatar7,
  Avatar8,
  Avatar9,
  Avatar10,
  Avatar11,
  Avatar12,
};

const FriendsList = () => {
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
    const fetchFriendAndUserIds = async () => {
      try {
        const { data: friendData, error: friendError } = await supabase
          .from("friends")
          .select("friend_id")
          .eq("user_id", loggedInUserId);

        if (friendError) {
          console.error("Error fetching friend IDs:", friendError);
          return;
        }

        const { data: userData, error: userError } = await supabase
          .from("friends")
          .select("user_id")
          .eq("friend_id", loggedInUserId);

        if (userError) {
          console.error("Error fetching user IDs:", userError);
          return;
        }

        const combinedIds = [
          ...friendData.map((friend) => friend.friend_id),
          ...userData.map((user) => user.user_id),
        ];

        setFriendIds(combinedIds);

        // Code to run after both fetch operations are complete
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (loggedInUserId) {
      fetchFriendAndUserIds();
    }
  }, [loggedInUserId]);

  useEffect(() => {
    // Fetch profiles of friends using friend IDs
    const fetchFriendProfiles = async () => {
      try {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select()
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

  const handleDeleteFriend = async (friendId) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Delete the friend relationship from the friends table
      const { error: deleteError } = await supabase
        .from("friends")
        .delete()
        .eq("user_id", user.id)
        .eq("friend_id", friendId);

      if (deleteError) {
        console.error("Error deleting friend:", deleteError);
      } else {
        // After successfully deleting, update the friend profiles list
        setFriendProfiles((prevProfiles) =>
          prevProfiles.filter((profile) => profile.id !== friendId)
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="text-white">
      <h1 className="text-2xl text-center font-semibold mb-2">Friends</h1>
      <div>
        {friendProfiles.length === 0 ? (
          <p className="text-white text-xl">Your friend list is empty!</p>
        ) : (
          friendProfiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-[#373737] rounded-md p-2 md:p-3 mb-2 shadow-md flex flex-col md:flex-row items-center justify-between max-w-screen-md mx-auto"
            >
              <img
                key={profile.avatar}
                src={avatarOptions[profile.avatar]}
                alt="User Avatar"
                className="w-12 h-12 md:w-16 md:h-16 rounded-full mb-2 md:mb-0"
              />
              <div className="flex-grow ml-0 md:ml-6 mt-2 md:mt-0">
                <div className="text-white">
                  <p className="text-white text-lg">{profile.gamertag}</p>
                </div>
                <div className="text-white">
                  <p className="text-white text-md">{profile.timezone}</p>
                </div>
                <div className="text-white">
                  <p className="text-white text-md">{profile.platform}</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center mt-2 md:mt-0">
                <AcceptDeclineButtons
                  friendId={profile.id}
                  loggedInUserId={loggedInUserId}
                />
                <button
                  onClick={() => handleDeleteFriend(profile.id)}
                  className="ml-0 md:ml-2 px-1 py-1 bg-red-800 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FriendsList;
