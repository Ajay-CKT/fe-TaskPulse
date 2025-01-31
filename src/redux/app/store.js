import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/auth/registerSlice";
import loginReducer from "../features/auth/loginSlice";
import userReducer from "../features/auth/userSlice";
import userProfileReducer from "../features/user/userProfileSlice";
import editProfileReducer from "../features/user/editProfileSlice";
import viewTasksReducer from "../features/tasks/viewTasksSlice";
import createTaskReducer from "../features/tasks/createTaskSlice";
import editTaskReducer from "../features/tasks/editTaskSlice";

const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    user: userReducer,
    userProfile: userProfileReducer,
    editProfile: editProfileReducer,
    viewTasks: viewTasksReducer,
    createTask: createTaskReducer,
    editTask: editTaskReducer,
  },
});

export default store;
