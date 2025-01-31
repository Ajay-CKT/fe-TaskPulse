import { Link } from "react-router-dom";

const UserLayout = ({ children }) => {
  return (
    <div className="flex flex-col-reverse">
      <div className="fixed bg-white bottom-0 p-2 border border-dashed rounded-t-xl w-full h-20 flex flex-row justify-evenly items-center gap-2 z-100">
        <Link to="/dashboard">
          <img src="/icons/dashboard.png" className="size-10" alt="" />
        </Link>
        <Link to="/tasks">
          <img src="/icons/tasks.png" alt="" className="size-10" />
        </Link>
        <Link to="/create-task">
          <img src="/icons/create.png" className="size-10" alt="" />
        </Link>
        <Link to="/teams">
          <img src="/icons/teams.svg" className="size-10" alt="" />
        </Link>
        <Link to="/settings">
          <img src="/icons/settings.svg" className="size-10" alt="" />
        </Link>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default UserLayout;
