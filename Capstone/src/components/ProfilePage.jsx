import React from "react";

import "../App.css";

import Carousel from "./Carousel";
import FriendsList from "./FriendsList";

const ProfilePage = () => {
  return (
    <div className="profilePage">
      <div className="navbar">
        {/* Navbar content */}
        <h1>Daniels navbar will go here</h1>
      </div>
      <div className="content">
        <div className="gameCarousel">
          <Carousel />
        </div>
        <div className="friendsList">
          <FriendsList />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
