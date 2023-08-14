import React from "react";
import supabase from "../../../supabase";
import { useState, useEffect } from "react";

const GamePlayers = ({ linkedUsersProfiles, gameName }) => {
  console.log(linkedUsersProfiles);

  const handleAddFriend = async (friendId) => {
    try {
      // Get the logged-in user's ID
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Insert a row into the friends table
      const { error: insertError } = await supabase.from("friends").upsert([
        {
          user_id: user.id,
          friend_id: friendId,
          status: false,
        },
      ]);

      if (insertError) {
        console.error("Error inserting friend:", insertError);
      } else {
        console.log("Friend added successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="text-white">
      <div className="max-w-xl mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          {gameName} Players
        </h1>
        <ul className="grid grid-cols-1 gap-4">
          {linkedUsersProfiles.map((profile) => (
            <li
              key={profile.id}
              className="bg-[#444444] text-white rounded p-4"
            >
              <p>
                Gamertag: {profile.gamertag} | Timezone: {profile.timezone} |
                Platform: {profile.platform}
              </p>
              <button
                onClick={() => handleAddFriend(profile.id)} // Pass the profile ID as friend_id
                className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
              >
                Add Friend
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GamePlayers;
