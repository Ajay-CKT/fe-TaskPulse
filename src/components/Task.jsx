import React, { useState } from "react";
import userServices from "../services/userServices";
import { toast } from "react-toastify";
import { Link, useRevalidator } from "react-router-dom";

const Task = ({ task }) => {
  const { revalidate } = useRevalidator();
  const [msg, setMsg] = useState(false);
  const [shareScreen, setShareScreen] = useState(false);
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const response = await userServices.taskCompleted({ selectedFile }, id);
      if (response.status === 200) {
        toast.success("Task completed");
        setLoading(false);
        revalidate();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleShare = async (id) => {
    try {
      const response = await userServices.taskShared({ email }, id);
      if (response.status === 200) {
        setShareScreen(false);
        toast.success("Task Shared");
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type !== "application/pdf") {
        alert("Only PDF files are allowed!");
        e.target.value = "";
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    }
  };

  return (
    <div className="relative py-8 px-6 flex flex-col gap-2 rounded-md shadow bg-slate-100">
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
        <span className="font-display-3 font-semibold">Deadline: </span>
        {new Date(task.deadline).toLocaleString()}
      </p>
      <p className="text-xs text-gray-500">
        <span className="font-display-3 font-semibold">Assigned by: </span>
        {task.assignedBy}
      </p>
      {task.completedBy && (
        <p className="text-xs text-gray-500">
          <span className="font-display-3 font-semibold">Completed by: </span>
          {task.completedBy}
        </p>
      )}
      {task.pdfUrl && (
        <a
          href={task.pdfUrl}
          target="_blank"
          className="text-xs text-blue-600 hover:underline"
        >
          view [pdf]
        </a>
      )}
      {(task.status === "active" || task.status === "pending") && (
        <div className="flex flex-row justify-evenly">
          <div className="flex flex-row flex-wrap justify-between items-center gap-2 font-display-3 pt-4">
            <Link to={`/tasks/update-task/${task._id}`}>
              <button className="px-2 py-1 w-18 text-center text-sm font-display-4 rounded-md border-b border-b-orange-500 cursor-pointer hover:shadow-md">
                Edit
              </button>
            </Link>
            <div
              onClick={() => setShareScreen(true)}
              className="relative px-2 py-1 w-18 text-center text-sm font-display-4 rounded-md border-b border-b-orange-500 cursor-pointer hover:shadow-md"
            >
              Share
            </div>
            {shareScreen && (
              <div className="fixed z-400 inset-0 flex items-center justify-center bg-black/50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full md:max-w-md sm:max-w-sm flex flex-col justify-center items-center gap-4">
                  <input
                    type="email"
                    placeholder="enter the email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded-md w-1/2 p-2 placeholder:text-xs placeholder:font-display-4 placeholder:text-center outline-none text-xs text-center"
                  />
                  <div className="flex flex-row gap-4">
                    <button
                      onClick={() => handleShare(task._id)}
                      className="px-2 py-1 w-18 text-center text-sm font-display-4 rounded-md border-b border-b-orange-500 cursor-pointer hover:shadow-md"
                    >
                      share
                    </button>
                    <button
                      onClick={() => setShareScreen(false)}
                      className="px-2 py-1 w-18 text-center text-sm font-display-4 rounded-md bg-red-500 cursor-pointer hover:shadow-md"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
            <button
              onClick={() => {
                setIsOpen(true);
              }}
              className="px-2 py-1 w-20 text-sm font-display-4 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-md ml-auto cursor-pointer"
            >
              Submit
            </button>
            {isOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-400">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full md:max-w-md sm:max-w-sm space-y-10">
                  <div className="flex flex-col">
                    <input
                      type="file"
                      name="file"
                      id="file"
                      accept="application/pdf"
                      className="outline-none border rounded-lg p-2 md:text-sm placeholder:text-sm md:placeholder:text-xs"
                      onChange={handleFileChange}
                    />
                    <p className="font-display-4 italic text-xs indent-1.5">
                      only pdf file required *
                    </p>
                  </div>
                  <div className="flex flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => handleComplete(task._id)}
                      className={`px-2 py-1 w-20 text-sm font-display-4 rounded-md hover:shadow-md ml-auto
                        ${
                          loading
                            ? "cursor-progress bg-blue-300 hover:bg-blue-300 border border-blue-500"
                            : "cursor-pointer bg-blue-500 hover:bg-blue-600"
                        }
                      `}
                    >
                      Complete
                    </button>
                    <button
                      className="px-2 py-1 w-18 text-center text-sm font-display-4 rounded-md bg-red-500 cursor-pointer hover:shadow-md"
                      onClick={() => setIsOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {(task.status === "active" || task.status === "pending") && (
        <button
          onClick={() => handleDeleteTask(task._id)}
          onMouseOver={() => setMsg(true)}
          onMouseOut={() => setMsg(false)}
          className="absolute w-4 text-xs right-0 top-0 bg-red-500 hover:bg-red-600 rounded-tr-md text-center flex justify-center items-center cursor-pointer"
        >
          X
          {msg && (
            <p className="absolute top-5 pt-2 font-display-3">Delete task</p>
          )}
        </button>
      )}
    </div>
  );
};

export default Task;
