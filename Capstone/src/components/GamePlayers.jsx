import React, { useState } from "react";
import supabase from "../../supabase";
import { useEffect } from "react";
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
  console.log(linkedUsersProfiles);

  return (
    <div className="text-white">
      <div className="px-4">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          {gameName} Players
        </h1>
        <div className="flex justify-center">
          <ul className="max-w-4xl">
            {linkedUsersProfiles.map(
              (profile) =>
                profile.id !== loggedInUserId && (
                  <li
                    key={profile.id}
                    className="bg-[#373737] rounded p-4 flex items-center justify-between mb-2"
                  >
                    {/* Display the user's avatar */}
                    <img
                      key={profile.avatar}
                      src={avatarOptions[profile.avatar]}
                      alt="User Avatar"
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-grow ml-6">
                      <p className="text-white text-lg">
                        <span className="text-white">{profile.gamertag}</span>
                        <span className="text-white text-lg ml-4 mr-4">|</span>
                        <span className="text-white">{profile.timezone}</span>
                        <span className="text-white text-lg ml-4 mr-4">|</span>
                        <span className="text-white">{profile.platform}</span>
                      </p>
                    </div>
                    {isFriend(profile.id) ? (
                      <span className="mt-2 px-2 py-1 rounded text-white bg-[#444444]">
                        Already Friends!
                      </span>
                    ) : (
                      <button
                        onClick={() => handleAddFriend(profile.id)}
                        className={`mt-2 ${
                          requestSentMap[profile.id]
                            ? "bg-[#151515]"
                            : "bg-[#151515]"
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
    </div>
  );
};

export default GamePlayers;
