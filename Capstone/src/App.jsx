/** @format */

import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import UsersPage from "./components/UsersPage";
import FriendSearchPage from "./components/FriendSearchPage";
import ChatMessagePage from "./components/ChatMessagePage";
import ProfilePage from "./components/ProfilePage";
// import { useState, useEffect } from "react";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<FriendSearchPage />} />
        <Route path="/chat" element={<ChatMessagePage />} />
      </Routes>
    </Router>
  );
}

export default App;
