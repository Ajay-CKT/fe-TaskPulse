import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import authServices from "../services/authServices";
import { clearUser } from "../redux/features/auth/userSlice";
import Spinner from "./Spinner";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();

  const logoutUser = async () => {
    try {
      const response = await authServices.logout();
      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(clearUser());
        setTimeout(() => {
          revalidate();
          navigate("/", { replace: true });
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Logout failed");
    }
  };

  useEffect(() => {
    logoutUser();
  }, []);

  return <Spinner />;
};

export default Logout;
