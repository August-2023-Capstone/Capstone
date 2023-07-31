/** @format */

import "./App.css";
import ChatMessage from "./components/ChatMessage";
import CreateUserForm from "./components/CreateUserForm";
import Friends from "./components/Friends";
import Games from "./components/Games";
import MaxsTestComponent from "./components/MaxsTestComponent";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import LinkedGames from "./components/linkedGames";
import Carousel from "./components/Carousel";
// import { useState, useEffect } from "react";

function App() {
  return (
    <>
      <Navbar />
      <Users />
      <Friends />
      <Games />
      <LinkedGames />
      <ChatMessage />
      <MaxsTestComponent />
      <CreateUserForm />
      <Carousel />
    </>
  );
}

export default App;
