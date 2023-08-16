/** @format */

import React, { useState, useEffect } from "react";
import supabase from "../../supabase";
// import "../ChatUsers.css";
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

function ChatUsers({
  usersData,
  setUsersData,
  friendIds,
  setFriendIds,
  chatMessages,
  setChatMessages,
}) {
  console.log("chat messages", chatMessages);
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      const { data, error } = await supabase.from("profiles").select("*");
      // console.log("fetch user profiles", data);
      setProfileData(data);
    };
    fetchProfileData();
  }, []);

  // const refreshUserSession = async () => {
  // 	const { error } = await supabase.auth.refreshSession();
  // 	if (error) {
  // 		console.error("Error refreshing session:", error);
  // 	}
  // };

  function filterMessages(user, usersData) {
    setUsersData(user);
    console.log("chatmessages", chatMessages);
    const filteredMessages = chatMessages.filter(
      (message) => message.sender_id === usersData.id
    );
    console.log("filtered messages", filteredMessages);
  }

  return (
    <div className="text-white mx-auto text-center flex flex-col items-center justify-start min-h-screen">
      <h1 className="text-2xl font-semibold mb-4 pt-8 ">Friends</h1>
      <div className="chat-users-container max-h-[500px] overflow-y-auto">
        {profileData &&
          profileData.map(
            (user) =>
              friendIds.includes(user.id) && (
                <div
                  onClick={() => filterMessages(user, usersData)}
                  key={user.id}
                  className={`bg-[#373737] rounded-md p-3 mb-2 shadow-md hover:cursor-pointer hover:bg-gray-400 flex items-center justify-between max-w-screen-md mx-auto`}
                  style={{ width: "400px" }}
                >
                  <div className="user-container flex items-center">
                    <img
                      src={avatarOptions[user.avatar]}
                      alt="User Avatar"
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-grow ml-6">
                      <div className="text-white">
                        <p className="text-lg">{user.gamertag}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  );
}

export default ChatUsers;
