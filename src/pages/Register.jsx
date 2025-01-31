import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import {
  selectEmail,
  selectName,
  selectPassword,
  setEmail,
  setName,
  setPassword,
} from "../redux/features/auth/registerSlice";
import authServices from "../services/authServices";

const Register = () => {
  const name = useSelector(selectName);
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    toast.success("Registering...");
    try {
      const response = await authServices.register({ name, email, password });
      if (response.status === 201) {
        toast.success("Registered successfully");
        dispatch(setName(""));
        dispatch(setEmail(""));
        dispatch(setPassword(""));

        setTimeout(() => {
          navigate("/login");
        }, 500);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="p-4 flex flex-col gap-12 md:flex md:flex-col md:justify-center md:items-center md:mx-auto">
      <h1 className="text-2xl text-center font-display-3">Register</h1>
      <form
        onSubmit={handleRegister}
        className="w-full flex flex-col gap-8 md:w-1/2 xl:w-[40%]"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
            className="outline-none border rounded-lg p-2 placeholder:font-display-4 md:text-sm placeholder:text-sm md:placeholder:text-xs"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            className="outline-none border rounded-lg p-2 placeholder:font-display-4 md:text-sm placeholder:text-sm md:placeholder:text-xs"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter a secure password"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            className="outline-none border rounded-lg p-2 placeholder:font-display-4 md:text-sm placeholder:text-sm md:placeholder:text-xs"
          />
        </div>
        <button
          type="submit"
          className="font-display-3 p-2  mx-auto bg-orange-400 rounded-lg cursor-pointer hover:bg-orange-500"
        >
          Get started
        </button>
      </form>
    </div>
  );
};

export default Register;
