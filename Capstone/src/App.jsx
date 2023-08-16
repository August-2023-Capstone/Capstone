/** @format */

import "./App.css";
import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import UsersPage from "./components/UsersPage";
import FriendSearchPage from "./components/FriendSearchPage";
import TestFriendSearchPage from "./components/TestFriendSearchPage";

import ChatMessagePage from "./components/ChatMessagePage";
import ProfilePage from "./components/ProfilePage";
import TestLogIn2 from "./components/TestLogIn2";
import CreateUserForm from "./components/CreateUserForm";
import TestPlatformToggle from "./components/TestPlatformToggle";
import TestProfileGames from "./components/TestProfileGames";
import HomeGameCard from "./components/HomeGameCard";
import TestOtherProfilePage from "./components/TestOtherProfilePage";

// import { useState, useEffect } from "react";

function App() {
  return (
    <Router>
      <div className="bg-[#151515] min-h-screen">
        <Helmet>
          <title>GamerNet</title>
          <link rel="icon" href="/icons/mario2.png" />
        </Helmet>
        <Navbar />
        {/* <TestPlatformToggle />
      <TestLogIn2 />
      <CreateUserForm /> */}
        {/* <TestProfileGames /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/friend_search" element={<FriendSearchPage />} />
          <Route path="/chat" element={<ChatMessagePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
