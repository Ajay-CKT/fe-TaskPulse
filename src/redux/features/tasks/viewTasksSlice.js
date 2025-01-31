import { createSlice } from "@reduxjs/toolkit";

const viewTasksSlice = createSlice({
  name: "viewTasks",
  initialState: [],
  reducers: {
    setTasks(state, action) {
      state = action.payload;
    },
    updateExpiredTasks: (state) => {
      return state.map((task) =>
        task.status === "active" && new Date(task.deadline) < new Date()
          ? { ...task, status: "pending" }
          : task
      );
    },
  },
});

export const { setTasks, updateExpiredTasks } = viewTasksSlice.actions;

export default viewTasksSlice.reducer;
