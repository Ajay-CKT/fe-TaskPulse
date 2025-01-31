import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/auth/userSlice";
import LandingPage from "./LandingPage";
import UserLayout from "../layouts/UserLayout";
import { Outlet } from "react-router-dom";

const Home = () => {
  const user = useSelector(selectUser);
  return !user ? (
    <LandingPage />
  ) : (
    <UserLayout>
      <Outlet />
    </UserLayout>
  );
};

export default Home;
