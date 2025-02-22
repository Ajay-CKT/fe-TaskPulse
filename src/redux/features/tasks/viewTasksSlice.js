import { createSlice } from "@reduxjs/toolkit";

const viewTasksSlice = createSlice({
  name: "viewTasks",
  initialState: [],
  reducers: {
    setTasks(state, action) {
      return action.payload;
    },
  },
});

export const { setTasks } = viewTasksSlice.actions;

export default viewTasksSlice.reducer;
