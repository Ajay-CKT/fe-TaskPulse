import { createSlice } from "@reduxjs/toolkit";

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: null,
  reducers: {
    setUserProfile: (state, action) => action.payload,
  },
});

export const { setUserProfile } = userProfileSlice.actions;

export const selectUserProfile = (state) => state.userProfile;

export default userProfileSlice.reducer;
