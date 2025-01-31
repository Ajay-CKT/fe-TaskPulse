import userServices from "../services/userServices";

const userLoader = async () => {
  try {
    const response = await userServices.viewProfile();
    return response.data;
  } catch (error) {
    return null;
  }
};

export default userLoader;
