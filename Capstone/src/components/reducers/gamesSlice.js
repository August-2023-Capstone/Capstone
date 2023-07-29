/** @format */

import { createClient } from "@supabase/supabase-js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabaseConfig from "../../../../supabase";

const initialState = {
	value: [],
	selectedPlayer: null,
};

const { supabaseUrl, supabaseKey } = supabaseConfig;

const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchUsersGameData = createAsyncThunk(
	"data/getgames",
	async () => {
		const { data } = await supabase.from("games").select();
		console.log(data);
		return data;
	}
);

export const gamesSlice = createSlice({
	name: "games",
	initialState,
	reducers: {
		setSelectedGame: (state, action) => {
			state.selectedPlayer = action.payload;
		},
	},
	extraReducers: {
		[fetchUsersGameData.pending]: (state) => {
			state.loading = true;
		},
		[fetchUsersGameData.fulfilled]: (state, { payload }) => {
			state.loading = false;
			console.log(payload);
			state.value = payload;
		},
		[fetchUsersGameData.rejected]: (state) => {
			state.loading = false;
		},
	},
});

export default gamesSlice.reducer;
