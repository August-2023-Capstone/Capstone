/** @format */

import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import UsersPage from "./components/UsersPage";
import FriendSearchPage from "./components/FriendSearchPage";
import ChatMessagePage from "./components/ChatMessagePage";
import TestLogIn2 from "./components/TestLogIn2";
import TestSignOut from "./components/TestSignOut";
import CreateUserForm from "./components/CreateUserForm";
import TestProfile from "./components/TestProfile";
// import { useState, useEffect } from "react";

function App() {
  return (
    <Router>
      <Navbar />
      <TestLogIn2 />
      <TestSignOut />
      <TestProfile />
      <CreateUserForm />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/settings" element={<FriendSearchPage />} />
        <Route path="/chat" element={<ChatMessagePage />} />
      </Routes>
    </Router>
  );
}

export default App;
