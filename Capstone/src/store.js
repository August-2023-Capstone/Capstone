/** @format */

import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../src/components/reducers/usersSlice";
import friendsReducer from "./components/reducers/friendsSlice";
import gamesReducer from "./components/reducers/gamesSlice";
import linkedGamesReducer from "./components/reducers/linkedGamesSlice";
import ChatMessageReducer from "./components/reducers/ChatMessageSlice";

export const store = configureStore({
	// reducers go here yall
	reducer: {
		users: usersReducer,
		friends: friendsReducer,
		games: gamesReducer,
		linkedGames: linkedGamesReducer,
		ChatMessages: ChatMessageReducer,
	},
});
