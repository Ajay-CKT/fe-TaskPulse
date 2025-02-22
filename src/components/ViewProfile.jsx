import { useSelector } from "react-redux";
import { selectUserProfile } from "../redux/features/user/userProfileSlice";

const ViewProfile = () => {
  const user = useSelector(selectUserProfile);
  return user ? (
    <div className="py-10 px-4 flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-md">
        <div className="flex flex-col gap-1">
          <p className="font-display-1">Name</p>
          <p className="border rounded-lg p-3 text-gray-800 font-display-4">
            {user.name}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-display-1">Email</p>
          <p className="border rounded-lg p-3  text-gray-800 font-display-4">
            {user.email}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <p className="text-center text-red-500 font-display-1">No user found</p>
  );
};

export default ViewProfile;
