/** @format */

import "./App.css";
import ChatMessage from "./components/ChatMessage";
import Friends from "./components/Friends";
import Games from "./components/Games";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import LinkedGames from "./components/linkedGames";

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
		</>
	);
}

export default App;
