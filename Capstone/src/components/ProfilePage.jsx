import React from "react";

import "../App.css";

import FriendsList from "./FriendsList";
import ProfileData from "./ProfileData";

import ProfileGameCards from "./ProfileGameCards";
import TestProfileGames from "./TestProfileGames";

const ProfilePage = () => {
  return (
    <div className="profilePage">
      <div className="flex">
        <div className="w-3/4 pl-8 pr-4">
          <ProfileData />
          <TestProfileGames />
        </div>
        <div className="w-1/4 pl-4 pr-8 flex flex-col justify-center text-center">
          <FriendsList />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
