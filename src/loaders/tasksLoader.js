import userServices from "../services/userServices";

const tasksLoader = async () => {
  try {
    const response = await userServices.viewTasks();
    return response.data;
  } catch (error) {
    return null;
  }
};

export default tasksLoader;
