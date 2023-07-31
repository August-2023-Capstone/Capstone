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

export const fetchMessageData = createAsyncThunk(
	"data/getMessages",
	async () => {
		const { data } = await supabase.from("chatmessages").select();
		console.log(data);
		return data;
	}
);

export const ChatMessageSlice = createSlice({
	name: "chatmessages",
	initialState,
	reducers: {
		setSelectedFriend: (state, action) => {
			state.selectedPlayer = action.payload;
		},
	},
	extraReducers: {
		[fetchMessageData.pending]: (state) => {
			state.loading = true;
		},
		[fetchMessageData.fulfilled]: (state, { payload }) => {
			state.loading = false;
			console.log(payload);
			state.value = payload;
		},
		[fetchMessageData.rejected]: (state) => {
			state.loading = false;
		},
	},
});

export default ChatMessageSlice.reducer;
