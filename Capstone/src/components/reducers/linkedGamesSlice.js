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

export const fetchlinkedGameData = createAsyncThunk(
  "data/getlinkedgames",
  async () => {
    const { data } = await supabase.from("linkedGames").select();
    console.log(data);
    return data;
  }
);

export const linkedGamesSlice = createSlice({
  name: "linkedGames",
  initialState,
  reducers: {
    setSelectedGame: (state, action) => {
      state.selectedPlayer = action.payload;
    },
  },
  extraReducers: {
    [fetchlinkedGameData.pending]: (state) => {
      state.loading = true;
    },
    [fetchlinkedGameData.fulfilled]: (state, { payload }) => {
      state.loading = false;
      console.log(payload);
      state.value = payload;
    },
    [fetchlinkedGameData.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default linkedGamesSlice.reducer;
