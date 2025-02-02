import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useRevalidator } from "react-router";
import { toast } from "react-toastify";
import {
  selectEmail,
  selectPassword,
  setEmail,
  setPassword,
} from "../redux/features/auth/loginSlice";
import authServices from "../services/authServices";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const [reqMsg, setReqMsg] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      toast.success("Logging in...");
      try {
        const response = await authServices.login({ email, password });
        if (response.status === 200) {
          toast.success("Logged in successfully");
          dispatch(setEmail(""));
          dispatch(setPassword(""));
          setTimeout(() => {
            revalidate();
            navigate("/dashboard", { replace: true });
          }, 1000);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      setReqMsg(true);
    }
  };
  return (
    <div className="p-4 flex flex-col gap-12 md:flex md:flex-col md:justify-center md:items-center md:mx-auto">
      <h1 className="text-2xl text-center font-display-3">Login</h1>
      <form
        onSubmit={handleLogin}
        className="w-full flex flex-col gap-8 md:w-1/2 xl:w-[40%]"
      >
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="email">
            Email<sup>*</sup>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            className={`outline-none border rounded-lg p-2 placeholder:font-display-4 md:text-sm placeholder:text-sm md:placeholder:text-xs ${
              reqMsg && "border-red-500"
            }`}
          />
          {reqMsg && (
            <p className="text-xs font-display-4 text-red-500 absolute bottom-[-1rem]">
              Required field cannot be empty
            </p>
          )}
          {reqMsg && (
            <img
              src="/icons/error.png"
              alt=""
              className="absolute right-4 bottom-2.5 size-5"
            />
          )}
        </div>
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="password">
            Password<sup>*</sup>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter a secure password"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            className={`outline-none border rounded-lg p-2 placeholder:font-display-4 md:text-sm placeholder:text-sm md:placeholder:text-xs ${
              reqMsg && "border-red-500"
            }`}
          />
          {reqMsg && (
            <p className="text-xs font-display-4 text-red-500 absolute bottom-[-1rem]">
              Required field cannot be empty
            </p>
          )}
          {reqMsg && (
            <img
              src="/icons/error.png"
              alt=""
              className="absolute right-4 bottom-2.5 size-5"
            />
          )}
        </div>
        <button
          type="submit"
          className="font-display-3 text-sm p-2 mx-auto bg-orange-400 rounded-md cursor-pointer hover:bg-orange-500"
        >
          Continue
        </button>
        <Link to="/forgot-password">
          <p className="text-sm hover:underline cursor-pointer text-blue-400 text-left">
            forgot password.?
          </p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
