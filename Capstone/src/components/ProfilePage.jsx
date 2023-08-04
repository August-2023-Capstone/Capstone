import React from "react";

import "../App.css";

import FriendsList from "./FriendsList";
import ProfileData from "./ProfileData";

import ProfileGameCards from "./ProfileGameCards";

const ProfilePage = () => {
  return (
    <div className="profilePage">
      <div>
        <ProfileData />
        <div className="content">
          <div>
            <ProfileGameCards />
          </div>
          <div className="friendsList">
            <FriendsList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
