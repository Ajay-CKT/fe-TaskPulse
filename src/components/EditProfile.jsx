import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectName, setName } from "../redux/features/user/editProfileSlice";
import userServices from "../services/userServices";
import { useParams, useRevalidator } from "react-router-dom";
const EditProfile = () => {
  const name = useSelector(selectName);
  const { id } = useParams();
  const { revalidate } = useRevalidator();

  const dispatch = useDispatch();
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await userServices.editProfile({ name }, id);
      if (response.status === 200) {
        toast.success("Updated profile successfully");
        dispatch(setName(""));
        setTimeout(() => {
          revalidate();
        }, 500);
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };
  return (
    <div className="p-4 flex flex-col gap-12 md:flex md:flex-col md:justify-center md:items-center md:mx-auto">
      <h1 className="text-2xl text-center font-display-3">Update Profile!</h1>
      <form
        onSubmit={handleEdit}
        className="w-full flex flex-col gap-8 md:w-1/2 xl:w-[40%]"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
            className="outline-none border rounded-lg p-2 placeholder:font-display-4 md:text-sm placeholder:text-sm md:placeholder:text-xs"
          />
        </div>
        <button
          type="submit"
          className="font-display-3 p-2  mx-auto bg-orange-400 rounded-lg cursor-pointer hover:bg-orange-500"
        >
          Update changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
