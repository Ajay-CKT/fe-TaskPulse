import { useSelector } from "react-redux";
import { selectUserProfile } from "../redux/features/user/userProfileSlice";

const ViewProfile = () => {
  const { user } = useSelector(selectUserProfile);

  return user ? (
    <div className="px-4 py-2 grid grid-rows-2 gap-4">
      <div className="grid grid-cols-3">
        <p className="font-display-3 pr-2  text-lg">Name:</p>
        <p>{user.name}</p>
      </div>

      <div className="grid grid-cols-3">
        <p className="font-display-3 pr-2 text-lg">Email:</p>
        <p>{user.email}</p>
      </div>
    </div>
  ) : (
    <>No user found</>
  );
};

export default ViewProfile;
