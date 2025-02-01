import { useDispatch } from "react-redux";
import { setTasks } from "../redux/features/tasks/viewTasksSlice";
import { Outlet, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import Task from "./Task";

const Tasks = () => {
  const tasks = useLoaderData();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTasks(tasks));
  }, [dispatch, tasks]);

  const [priorityFilter, setPriorityFilter] = useState({
    active: "all",
    pending: "all",
    completed: "all",
  });

  const [selectedTab, setSelectedTab] = useState("active");

  const filterTasks = (status) =>
    tasks.tasks.filter(
      (task) =>
        task.status === status &&
        (priorityFilter[status] === "all" ||
          task.priority === priorityFilter[status])
    );

  const activeTasks = filterTasks("active");
  const pendingTasks = filterTasks("pending");
  const completedTasks = filterTasks("completed");

  return (
    <div className="p-4">
      <Outlet />
      <div className="flex md:hidden mb-4">
        {["active", "pending", "completed"].map((tab) => (
          <button
            key={tab}
            className={`flex-1 p-2 text-center border-b-2 transition-all 
              ${
                selectedTab === tab
                  ? "border-blue-500 font-bold"
                  : "border-gray-300"
              }
            `}
            onClick={() => setSelectedTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="md:hidden">
        {selectedTab === "active" && (
          <TaskColumn
            title="Active Tasks"
            tasks={activeTasks}
            color="blue"
            status="active"
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
          />
        )}
        {selectedTab === "pending" && (
          <TaskColumn
            title="Pending Tasks"
            tasks={pendingTasks}
            color="red"
            status="pending"
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
          />
        )}
        {selectedTab === "completed" && (
          <TaskColumn
            title="Completed Tasks"
            tasks={completedTasks}
            color="green"
            status="completed"
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
          />
        )}
      </div>
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        <TaskColumn
          title="Active Tasks"
          tasks={activeTasks}
          color="blue"
          status="active"
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />
        <TaskColumn
          title="Pending Tasks"
          tasks={pendingTasks}
          color="red"
          status="pending"
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />
        <TaskColumn
          title="Completed Tasks"
          tasks={completedTasks}
          color="green"
          status="completed"
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />
      </div>
    </div>
  );
};

// Task Column Component
const TaskColumn = ({
  title,
  tasks,
  color,
  status,
  priorityFilter,
  setPriorityFilter,
}) => (
  <div className="p-4 mb-20 rounded-md shadow-md">
    <div className="flex justify-between items-center mb-2">
      <h2 className={`text-${color}-500 font-bold`}>{title}</h2>
      <select
        className="p-2 rounded-md border-b border-b-orange-400 text-sm"
        value={priorityFilter[status]}
        onChange={(e) =>
          setPriorityFilter({ ...priorityFilter, [status]: e.target.value })
        }
      >
        <option value="all" className="">
          All
        </option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
    {tasks.length > 0 ? (
      tasks.map((task) => (
        <div key={task._id} className="p-2 rounded-md mb-2">
          <Task task={task} />
        </div>
      ))
    ) : (
      <p className="text-gray-400 font-display-4 test-sm text-center">
        No tasks available
      </p>
    )}
  </div>
);

export default Tasks;
