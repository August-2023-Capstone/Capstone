import { createClient } from "@supabase/supabase-js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabaseConfig from "../../../../supabase";

const initialState = {
	value: [],
	selectedPlayer: null,
};

const { supabaseUrl, supabaseKey } = supabaseConfig;

const supabase = createClient(supabaseUrl, supabaseKey);


export const fetchUsersData = createAsyncThunk(
    "data/getUsers",
    async () => {
      const { data } = await supabase.from("users").select();
      console.log(data);
      return data;
    }
  );

  export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
      setSelectedUser: (state, action) => {
        state.selectedPlayer = action.payload;
      },
    },
    extraReducers: {
      [fetchUsersData.pending]: (state) => {
        state.loading = true;
      },
      [fetchUsersData.fulfilled]: (state, { payload }) => {
        state.loading = false;
        console.log(payload);
        state.value = payload;
      },
      [fetchUsersData.rejected]: (state) => {
        state.loading = false;
      },
    },
  });

export default usersSlice.reducer;
