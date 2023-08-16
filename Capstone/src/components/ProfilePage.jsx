import React from "react";

import "../App.css";

import FriendsList from "./FriendsList";
import ProfileData from "./ProfileData";

import ProfileGameCards from "./ProfileGameCards";
import TestProfileGames from "./TestProfileGames";

const ProfilePage = () => {
  return (
    <div className="profilePage">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-3/4 pl-4 pr-4 text-center md:text-left">
          <ProfileData />
          <TestProfileGames />
        </div>
        <div className="w-full md:w-1/4 pl-4 pr-4 mt-4 md:mt-0 text-center md:text-left">
          <FriendsList />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
