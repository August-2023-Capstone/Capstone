import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../reducers/profileSlice";

const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});

export default store;
