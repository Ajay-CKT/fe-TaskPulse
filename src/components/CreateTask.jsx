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

const CreateTask = () => {
  const title = useSelector(selectTitle);
  const description = useSelector(selectDescription);
  const deadline = useSelector(selectDeadline);
  const priority = useSelector(selectPriority);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await userServices.createTask({
        title,
        description,
        deadline,
        priority,
      });
      if (response.status === 201) {
        toast.success("Task created successfully");
        dispatch(setTitle(""));
        dispatch(setDescription(""));
        dispatch(setDeadline(""));
        dispatch(setPriority(""));
        setTimeout(() => {
          navigate("/tasks", { replace: true });
        }, 500);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="p-4 flex flex-col gap-12 md:flex md:flex-col md:justify-center md:items-center md:mx-auto">
      <h1 className="text-2xl text-center font-display-3">Create a Task</h1>
      <form
        onSubmit={handleCreateTask}
        className="w-full flex flex-col gap-8 md:w-1/2 xl:w-[40%]"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Give title name..."
            value={title}
            onChange={(e) => dispatch(setTitle(e.target.value))}
            className="outline-none border rounded-lg p-2 placeholder:font-display-4 md:text-sm placeholder:text-sm md:placeholder:text-xs"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Describe the task..."
            value={description}
            onChange={(e) => dispatch(setDescription(e.target.value))}
            className="outline-none border rounded-lg p-2 placeholder:font-display-4 md:text-sm placeholder:text-sm md:placeholder:text-xs"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Deadline</label>
          <input
            type="datetime-local"
            name="deadline"
            id="deadline"
            placeholder="Set a deadline"
            min={new Date().toISOString()}
            value={deadline}
            onChange={(e) => dispatch(setDeadline(e.target.value))}
            className="outline-none border rounded-lg p-3 placeholdr:font-display-4 text-xs w-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Priority</label>
          <select
            name="priority"
            id="priority"
            value={priority}
            onChange={(e) => dispatch(setPriority(e.target.value))}
            className="outline-none border rounded-lg p-3 font-display-4 text-xs"
          >
            <option value="medium">Set priority level</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <button
          type="submit"
          className="mx-auto font-display-3 p-2 bg-orange-400 rounded-lg"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
