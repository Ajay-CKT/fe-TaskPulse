import { useState } from "react";
import instance from "../services/instance";
import { Link } from "react-router-dom";
import userServices from "../services/userServices";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleLink = async (e) => {
    e.preventDefault();
    try {
      const response = await userServices.forgotPassword({ email });
      toast.success("Verification link sent");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="p-4 flex flex-col gap-12 md:flex md:flex-col md:justify-center md:items-center md:mx-auto">
      <h1 className="text-2xl text-center font-display-3">Forgot Password?</h1>
      <form className="w-full flex flex-col gap-8 md:w-1/2 xl:w-[40%]">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="w-1/4">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(() => e.target.value)}
            className="outline-none border rounded-lg p-2 placeholder:font-display-4 md:text-sm placeholder:text-sm md:placeholder:text-xs"
            placeholder="enter your email"
          />
        </div>
        <button
          onClick={handleLink}
          className=" font-display-3 p-2  mx-auto bg-orange-400 rounded-lg cursor-pointer hover:bg-orange-500"
        >
          Send code
        </button>
        <div className="flex flex-col items-center space-y-2 text-sm">
          <div className="flex items-center space-x-5">
            <p className="text-sm">Existing User..?</p>
            <Link to="/login" className="hover:underline hover:text-blue-700">
              login
            </Link>
          </div>
          <div className="flex items-center space-x-5">
            <p className="text-sm">Dont have an account..?</p>
            <Link
              to="/register"
              className="hover:underline hover:text-blue-700"
            >
              register
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
