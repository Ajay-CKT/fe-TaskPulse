import { Link, Outlet, useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  selectUserProfile,
  setUserProfile,
} from "../redux/features/user/userProfileSlice";
import { useEffect } from "react";

const SettingsLayout = () => {
  const userProfile = useLoaderData();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserProfile(userProfile.user));
  }, [dispatch, userProfile]);

  return (
    <div className="p-2">
      <div className="flex flex-row justify-evenly py-4">
        <Link to="/settings/view-profile">
          <button className="p-2 text-center rounded-lg border-b border-b-orange-500 cursor-pointer shadow-md">
            View Profile
          </button>
        </Link>
        <Link to={`/settings/edit-profile/${userProfile.user._id}`}>
          <button className="p-2 text-center rounded-lg border-b border-b-orange-500 cursor-pointer shadow-md">
            Edit Profile
          </button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default SettingsLayout;
