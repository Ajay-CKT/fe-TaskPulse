import React, { useState } from "react";
import userServices from "../services/userServices";
import { toast } from "react-toastify";
import { Link, useRevalidator } from "react-router-dom";

const Task = ({ task }) => {
  const { revalidate } = useRevalidator();
  const [msg, setMsg] = useState(false);

  const getPriorityImage = (priority) => {
    switch (priority) {
      case "high":
        return "/priority/high.png";
      case "medium":
        return "/priority/medium.png";
      case "low":
        return "/priority/low.png";
      default:
        return "/priority/medium.png";
    }
  };

  const handleComplete = async (id) => {
    try {
      const response = await userServices.taskCompleted(id);
      if (response.status === 200) {
        toast.success("Task completed");
        revalidate();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await userServices.deleteTask(id);
      if (response.status === 200) {
        toast.success("Task deleted");
        revalidate();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="relative p-4 flex flex-col gap-2 rounded-md shadow bg-slate-100">
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <div className="flex items-center">
        <img
          src={getPriorityImage(task.priority)}
          alt={task.priority}
          className="w-6 h-6 mr-2"
        />
        <span className="text-xs text-gray-500 capitalize">
          {task.priority} priority
        </span>
      </div>
      <p className="text-xs text-gray-500">
        <span className="font-display-3 font-semibold">Deadline:</span>
        {new Date(task.deadline).toLocaleString()}
      </p>
      {(task.status === "active" || task.status === "pending") && (
        <div className="flex flex-row justify-evenly">
          <div className="flex flex-row gap-2 font-display-3 pt-4">
            <button
              onClick={() => handleComplete(task._id)}
              className="px-2 py-1 w-20 text-sm rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-md ml-auto cursor-pointer"
            >
              complete
            </button>
            <Link to={`/tasks/update-task/${task._id}`}>
              <button className="px-2 py-1 w-18 text-center rounded-md border-b border-b-orange-500 cursor-pointer hover:shadow-md">
                Edit
              </button>
            </Link>
          </div>
        </div>
      )}
      {(task.status === "active" || task.status === "pending") && (
        <button
          onClick={() => handleDeleteTask(task._id)}
          onMouseOver={() => setMsg(true)}
          onMouseOut={() => setMsg(false)}
          className="absolute w-4 text-xs right-0 top-0 bg-red-500 hover:bg-red-600 rounded-tr-md text-center flex justify-center items-center cursor-pointer "
        >
          X{msg && <p className="absolute top-5 pt-2 font-display-3">Delete task</p>}
        </button>
      )}
    </div>
  );
};

export default Task;

//
// onClick={() => handleEditTask(task._id)}

/**  const handleEditTask = async (id) => {
    try {
      const response = await userServices.updateTask(id);
      if (response.status === 200) {
        toast.success("Task updated");
        revalidate();
        console.log("revalidated");
      }
    } catch (error) {
      toast.error(error);
    }
  }; */
