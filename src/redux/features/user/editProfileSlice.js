import { createSlice } from "@reduxjs/toolkit";

export const editProfileSlice = createSlice({
  name: "editProfile",
  initialState: {
    name: "",
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setName } = editProfileSlice.actions;

export const selectName = (state) => state.editProfile.name;

export default editProfileSlice.reducer;
