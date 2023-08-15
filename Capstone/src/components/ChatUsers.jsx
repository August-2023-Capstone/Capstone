/** @format */

import React, { useState, useEffect } from "react";
import supabase from "../../supabase";
import "../ChatUsers.css";

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

  const refreshUserSession = async () => {
    const { error } = await supabase.auth.refreshSession();
    if (error) {
      console.error("Error refreshing session:", error);
    }
  };

  function filterMessages(user, usersData) {
    setUsersData(user);
    console.log("chatmessages", chatMessages);
    const filteredMessages = chatMessages.filter(
      (message) => message.sender_id === usersData.id
    );
    console.log("filtered messages", filteredMessages);
  }

  return (
    <div className="chat-users-container">
      {profileData.map(
        (user) =>
          friendIds.includes(user.id) && (
            <div
              onClick={() => filterMessages(user, usersData)}
              key={user.id}
              className={`chat-user hover:cursor-pointer`}
            >
              <div className="user-container">
                <div className="user-avatar">Avatar</div>
                <div className="user-name">{user.gamertag}</div>
              </div>
            </div>
          )
      )}
    </div>
  );
}

export default ChatUsers;
