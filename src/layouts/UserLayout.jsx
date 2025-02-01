import { useState } from "react";
import { Link } from "react-router-dom";

const UserLayout = ({ children }) => {
  return (
    <div className="flex flex-col-reverse md:flex md:flex-row">
      <div className="fixed md:relative md:flex md:flex-col md:justify-evenly md:h-[calc(100vh-5rem)] md:rounded-none md:w-[6%] md:border-0 md:border-r bg-gray-100 bottom-0 p-2 border-0 border-t rounded-t-xl w-full h-16 flex flex-row justify-evenly items-center gap-2 z-100">
        <Link to="/dashboard">
          <img
            src="/icons/dashboard.png"
            alt="dashboard-icon"
            className="size-8"
          />
        </Link>
        <Link to="/tasks">
          <img src="/icons/tasks.png" alt="tasks-icon" className="size-8" />
        </Link>
        <Link to="/create-task">
          <img src="/icons/create.png" alt="create-icon" className="size-8" />
        </Link>
        <Link to="/teams">
          <img src="/icons/teams.svg" alt="teams-icon" className="size-8" />
        </Link>
        <Link to="/settings/view-profile">
          <img
            src="/icons/settings.svg"
            alt="settings-icon"
            className="size-8"
          />
        </Link>
      </div>
      <div className="md:w-full">{children}</div>
    </div>
  );
};

export default UserLayout;
