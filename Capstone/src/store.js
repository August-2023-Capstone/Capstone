/** @format */

import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../src/components/reducers/usersSlice";
export const store = configureStore({
	// reducers go here yall
	reducer: {
		users: usersReducer,
	},
});
