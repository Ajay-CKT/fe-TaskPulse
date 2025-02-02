import { useState } from "react";
import { Link } from "react-router-dom";

const UserLayout = ({ children }) => {
  const [isDashboard, setIsDashboard] = useState(false);
  const [isTasks, setIsTasks] = useState(false);
  const [isCreateTask, setIsCreateTask] = useState(false);
  const [isTeams, setIsTeams] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  return (
    <div className="flex flex-col-reverse md:flex md:flex-row">
      <div className="fixed md:relative md:flex md:flex-col md:justify-evenly md:rounded-none md:w-[6%] md:h-[calc(100vh-5rem)] md:border-0 md:border-r-0 md:shadow-sm bottom-0 p-2 border-0 w-full h-16 flex flex-row justify-evenly items-center gap-2 z-100 bg-white rounded-t-md md:rounded-r-md">
        <Link
          to="/dashboard"
          onMouseOver={() => setIsDashboard(true)}
          onMouseOut={() => setIsDashboard(false)}
          className="relative"
        >
          <img
            src="/icons/dashboard.png"
            alt="dashboard-icon"
            className="size-8"
          />
          {isDashboard && (
            <p className="absolute text-xs bottom-[-25px] left-[-12px] font-display-4">
              Dashboard
            </p>
          )}
        </Link>
        <Link
          to="/tasks"
          onMouseOver={() => setIsTasks(true)}
          onMouseOut={() => setIsTasks(false)}
          className="relative"
        >
          <img src="/icons/tasks.png" alt="tasks-icon" className="size-8" />
          {isTasks && (
            <p className="absolute text-xs bottom-[-45px] text-center font-display-4">
              My Tasks
            </p>
          )}
        </Link>
        <Link
          to="/create-task"
          onMouseOver={() => setIsCreateTask(true)}
          onMouseOut={() => setIsCreateTask(false)}
          className="relative"
        >
          <img src="/icons/create.png" alt="create-icon" className="size-8" />
          {isCreateTask && (
            <p className="absolute text-xs bottom-[-45px] text-center font-display-4">
              Create Task
            </p>
          )}
        </Link>
        <Link
          to="/teams"
          onMouseOver={() => setIsTeams(true)}
          onMouseOut={() => setIsTeams(false)}
          className="relative"
        >
          <img src="/icons/teams.svg" alt="teams-icon" className="size-8" />
          {isTeams && (
            <p className="absolute text-xs bottom-[-25px] text-center font-display-4">
              Teams
            </p>
          )}
        </Link>
        <Link
          to="/settings/view-profile"
          onMouseOver={() => setIsSettings(true)}
          onMouseOut={() => setIsSettings(false)}
          className="relative"
        >
          <img
            src="/icons/settings.svg"
            alt="settings-icon"
            className="size-8"
          />
          {isSettings && (
            <p className="absolute text-xs bottom-[-25px] text-center font-display-4">
              Settings
            </p>
          )}
        </Link>
      </div>
      <div className="md:w-full h-[calc(100vh-5rem)] md:overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
