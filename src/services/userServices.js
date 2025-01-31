import instance from "./instance";

const userServices = {
  viewProfile: async () => {
    return await instance.get("/user/view-profile");
  },
  editProfile: async (data, id) => {
    return await instance.put(`/user/edit-profile/${id}`, data);
  },
  viewTasks: async () => {
    return await instance.get("/user/view-tasks");
  },
  viewTaskById: async (id) => {
    return await instance.get(`/user/view-task/${id}`);
  },
  taskCompleted: async (id) => {
    return await instance.put(`/user/complete-task/${id}`);
  },
  createTask: async (data) => {
    return await instance.post("/user/create-task", data);
  },
  updateTask: async (data, id) => {
    return await instance.put(`/user/update-task/${id}`, data);
  },
  deleteTask: async (id) => {
    return await instance.delete(`/user/delete-task/${id}`);
  },
  forgotPassword: async (data) => {
    return await instance.post("/user/forgot-password", data);
  },
  resetPassword: async (data, token) => {
    return await instance.put(`/user/reset-password/${token}`, data);
  },
};
export default userServices;
