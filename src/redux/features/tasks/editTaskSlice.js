import { createSlice } from "@reduxjs/toolkit";

const editTaskSlice = createSlice({
  name: "editTask",
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
  editTaskSlice.actions;

export const selectTitle = (state) => state.editTask.title;
export const selectDescription = (state) => state.editTask.description;
export const selectDeadline = (state) => state.editTask.deadline;
export const selectPriority = (state) => state.editTask.priority;

export default editTaskSlice.reducer;
