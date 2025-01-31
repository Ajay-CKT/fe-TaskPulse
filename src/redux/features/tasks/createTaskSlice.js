import { createSlice } from "@reduxjs/toolkit";

export const createTaskSlice = createSlice({
  name: "createTask",
  initialState: {
    title: "",
    description: "",
    deadline: "",
    priority: "",
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setDeadline: (state, action) => {
      state.deadline = action.payload;
    },
    setPriority: (state, action) => {
      state.priority = action.payload;
    },
  },
});

export const { setTitle, setDescription, setDeadline, setPriority } =
  createTaskSlice.actions;

export const selectTitle = (state) => state.createTask.title;
export const selectDescription = (state) => state.createTask.description;
export const selectDeadline = (state) => state.createTask.deadline;
export const selectPriority = (state) => state.createTask.priority;

export default createTaskSlice.reducer;
