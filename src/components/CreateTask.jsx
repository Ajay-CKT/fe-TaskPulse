import { useDispatch, useSelector } from "react-redux";
import {
  selectTitle,
  setDeadline,
  setDescription,
  setPriority,
  setTitle,
} from "../redux/features/tasks/createTaskSlice";
import { selectDescription } from "../redux/features/tasks/createTaskSlice";
import { selectDeadline } from "../redux/features/tasks/createTaskSlice";
import { selectPriority } from "../redux/features/tasks/createTaskSlice";
import { useNavigate } from "react-router-dom";
import userServices from "../services/userServices";
import { toast } from "react-toastify";
import { useState } from "react";
import { setTasks } from "../redux/features/tasks/viewTasksSlice";

const CreateTask = () => {
  const title = useSelector(selectTitle);
  const description = useSelector(selectDescription);
  const deadline = useSelector(selectDeadline);
  const priority = useSelector(selectPriority);
  const [reqMsg, setReqMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (title && description && deadline && priority) {
      try {
        const response = await userServices.createTask({
          title,
          description,
          deadline: new Date(deadline).toISOString(),
          priority,
        });
        if (response.status === 201) {
          toast.success("Task created successfully");
          const updatedTasks = await userServices.viewTasks();
          dispatch(setTasks(updatedTasks.data.tasks));
          dispatch(setTitle(""));
          dispatch(setDescription(""));
          dispatch(setDeadline(""));
          dispatch(setPriority(""));
          setLoading(false);
          setTimeout(() => {
            navigate("/tasks", { replace: true });
          }, 500);
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
      <h1 className="text-2xl text-center font-display-3">Create a Task</h1>
      <form
        onSubmit={handleCreateTask}
        className="w-full flex flex-col gap-8 md:w-1/2 xl:w-[40%]"
      >
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="name">
            Title<sup>*</sup>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Give title name..."
            value={title}
            onChange={(e) => dispatch(setTitle(e.target.value))}
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
          <label htmlFor="email">
            Description<sup>*</sup>
          </label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Describe the task..."
            value={description}
            onChange={(e) => dispatch(setDescription(e.target.value))}
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
            Deadline<sup>*</sup>
          </label>
          <input
            type="datetime-local"
            name="deadline"
            id="deadline"
            placeholder="Set a deadline"
            min={new Date().toISOString().slice(0, 16)}
            value={deadline}
            onChange={(e) => dispatch(setDeadline(e.target.value))}
            className={`outline-none border rounded-lg p-3 placeholdr:font-display-4 text-xs w-full ${
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
              className="absolute right-[-1.5rem] bottom-2.5 size-5"
            />
          )}
        </div>
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="password">
            Priority<sup>*</sup>
          </label>
          <select
            name="priority"
            id="priority"
            value={priority}
            onChange={(e) => dispatch(setPriority(e.target.value))}
            className={`outline-none border rounded-lg p-3 font-display-4 text-xs ${
              reqMsg && "border-red-500"
            }`}
          >
            <option>Set priority level</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
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
          className={`mx-auto font-display-3 p-2 rounded-lg ${
            loading
              ? "cursor-progress bg-orange-300 hover:bg-orange-300 border border-orange-400"
              : "cursor-pointer bg-orange-400 hover:bg-orange-500"
          }`}
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
