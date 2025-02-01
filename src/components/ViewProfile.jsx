import { useSelector } from "react-redux";
import { selectUserProfile } from "../redux/features/user/userProfileSlice";

const ViewProfile = () => {
  const { user } = useSelector(selectUserProfile);

  return user ? (
    <div className=" py-10 px-4 flex flex-col gap-12 md:flex md:flex-col md:justify-center md:items-center">
      <div className="flex flex-row items-center gap-4">
        <p className="text-left">Name</p>
        <p className="outline-none border rounded-lg p-2">{user.name}</p>
      </div>
      <div className="flex flex-row items-center gap-4">
        <p className="text-left">Email</p>
        <p className="outline-none border rounded-lg p-2">{user.email}</p>
      </div>
    </div>
  ) : (
    <>No user found</>
  );
};

export default ViewProfile;

/**
 *     <div className="px-4 py-2 grid grid-rows-2 gap-4">
      <div className="grid grid-cols-3">
        <p className="font-display-3 pr-2  text-lg">Name:</p>
        <p>{user.name}</p>
      </div>

      <div className="grid grid-cols-3">
        <p className="font-display-3 pr-2 text-lg">Email:</p>
        <p>{user.email}</p>
      </div>
    </div>
 */
