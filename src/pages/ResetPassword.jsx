import { useState } from "react";
import { toast } from "react-toastify";
import userServices from "../services/userServices";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await userServices.resetPassword({ password }, token);
      if (response.status === 200) {
        toast.success("Password reset successfully");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="p-4 flex flex-col gap-12 md:flex md:flex-col md:justify-center md:items-center md:mx-auto">
      <h1 className="text-2xl text-center font-display-3">Reset Password!</h1>
      <form className="w-full flex flex-col gap-8 md:w-1/2 xl:w-[40%]">
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="w-1/4">
            New Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(() => e.target.value)}
            className="outline-none border rounded-lg p-2 placeholder:font-display-4 md:text-sm placeholder:text-sm md:placeholder:text-xs"
            placeholder="enter your email"
          />
        </div>
        <button
          onClick={handleReset}
          className=" font-display-3 p-2  mx-auto bg-orange-400 rounded-lg cursor-pointer hover:bg-orange-500"
        >
          Send code
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
