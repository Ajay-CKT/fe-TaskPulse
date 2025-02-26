import { useDispatch, useSelector } from "react-redux";
import {
  selectDeadline,
  selectDescription,
  selectPriority,
  selectTitle,
  setDeadline,
  setDescription,
  setPriority,
  setTitle,
} from "../redux/features/tasks/createTaskSlice";
import { Link, useNavigate, useParams, useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import userServices from "../services/userServices";
import { useEffect, useState } from "react";
import { setTasks } from "../redux/features/tasks/viewTasksSlice";

const EditTask = () => {
  const { id } = useParams();
  const title = useSelector(selectTitle);
  const description = useSelector(selectDescription);
  const deadline = useSelector(selectDeadline);
  const priority = useSelector(selectPriority);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await userServices.viewTaskById(id);
        if (response.status === 200) {
          const { title, description, priority } = response.data.task;
          dispatch(setTitle(title));
          dispatch(setDescription(description));
          dispatch(setPriority(priority));
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchTask();
  }, [id, dispatch]);

  const handleEditTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await userServices.updateTask(
        {
          title,
          description,
          deadline: new Date(deadline).toISOString(),
          priority,
        },
        id
      );
      if (response.status === 200) {
        toast.success("Task updated successfully");
        const updatedTasks = await userServices.viewTasks();
        dispatch(setTasks(updatedTasks.data.tasks));
        dispatch(setTitle(""));
        dispatch(setDescription(""));
        dispatch(setDeadline(""));
        dispatch(setPriority(""));
        setLoading(false);
        setTimeout(() => {
          revalidate();
          navigate("/tasks", { replace: true });
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <div className="p-4 h-screen flex flex-col gap-12 md:flex md:flex-col md:items-center md:mx-auto">
      <h1 className="text-2xl text-center font-display-3">Edit the Task</h1>
      <form
        onSubmit={handleEditTask}
        className="w-full flex flex-col gap-8 md:w-1/2 xl:w-[40%]"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
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
          <label htmlFor="description">Description</label>
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
          <label htmlFor="deadline">Deadline</label>
          <input
            type="datetime-local"
            name="deadline"
            id="deadline"
            placeholder="Set a deadline"
            min={new Date().toISOString().slice(0, 16)}
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
            <option>Set priority level</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="flex flex-row">
          <button
            type="submit"
            className={`mx-auto font-display-3 p-2 rounded-lg ${
              loading
                ? "cursor-progress bg-orange-300 hover:bg-orange-300 border border-orange-400"
                : "cursor-pointer bg-orange-400 hover:bg-orange-500"
            }`}
          >
            Update changes
          </button>
          <Link to="/tasks">
            <button className="font-display-3 px-4 py-2 w-26 text-center rounded-lg border-b border-b-orange-500 cursor-pointer hover:shadow-md">
              Back
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
