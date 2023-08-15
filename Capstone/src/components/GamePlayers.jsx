import React, { useState } from "react";
import supabase from "../../supabase";
import { useEffect } from "react";

const GamePlayers = ({
  linkedUsersProfiles,
  gameName,
  friendIds,
  loggedInUserId,
}) => {
  console.log(linkedUsersProfiles);
  console.log(friendIds);
  console.log(loggedInUserId);

  const isFriend = (profileId) => friendIds.includes(profileId);

  const [requestSentMap, setRequestSentMap] = useState({});

  useEffect(() => {
    const initialRequestSentMap = {};
    linkedUsersProfiles.forEach((profile) => {
      initialRequestSentMap[profile.id] = false;
    });
    setRequestSentMap(initialRequestSentMap);
  }, [linkedUsersProfiles]);

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
        setRequestSentMap((prevMap) => ({
          ...prevMap,
          [friendId]: true,
        }));
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
          {linkedUsersProfiles.map(
            (profile) =>
              // Exclude the profile of the logged-in user
              profile.id !== loggedInUserId && (
                <li
                  key={profile.id}
                  className="bg-[#444444] text-white rounded p-4"
                >
                  <p>
                    Gamertag: {profile.gamertag} | Timezone: {profile.timezone}{" "}
                    | Platform: {profile.platform}
                  </p>
                  {/* Render the button or status based on friend status */}
                  {isFriend(profile.id) ? (
                    <span className="ml-2 text-green-500">
                      Already a friend
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAddFriend(profile.id)}
                      className={`ml-2 ${
                        requestSentMap[profile.id]
                          ? "bg-gray-500"
                          : "bg-blue-500"
                      } text-white px-2 py-1 rounded`}
                      disabled={requestSentMap[profile.id]}
                    >
                      {requestSentMap[profile.id]
                        ? "Friend Request Sent"
                        : "Add Friend"}
                    </button>
                  )}
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export default GamePlayers;
