/** @format */

import { createClient } from "@supabase/supabase-js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabaseConfig from "../../supabase";

const initialState = {
  value: [],
  selectedPlayer: null,
};

const { supabaseUrl, supabaseKey } = supabaseConfig;

const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchFriendsData = createAsyncThunk(
  "data/getFriends",
  async () => {
    const { data } = await supabase.from("friends").select();
    console.log(data);
    return data;
  }
);

export const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setSelectedFriend: (state, action) => {
      state.selectedPlayer = action.payload;
    },
  },
  extraReducers: {
    [fetchFriendsData.pending]: (state) => {
      state.loading = true;
    },
    [fetchFriendsData.fulfilled]: (state, { payload }) => {
      state.loading = false;
      console.log(payload);
      state.value = payload;
    },
    [fetchFriendsData.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default friendsSlice.reducer;
