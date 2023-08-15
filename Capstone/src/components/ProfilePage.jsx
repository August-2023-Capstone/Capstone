import React from "react";

import "../App.css";

import FriendsList from "./FriendsList";
import TestFriendsList from "./TestFriendsList";

import ProfileData from "./ProfileData";

import ProfileGameCards from "./ProfileGameCards";
import TestProfileGames from "./TestProfileGames";

const ProfilePage = () => {
  return (
    <div className="profilePage">
      <div>
        <ProfileData />
        <div className="content">
          <div>
            <TestProfileGames />
          </div>
          <div className="friendsList">
            <TestFriendsList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
