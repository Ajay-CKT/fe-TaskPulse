import { useLoaderData } from "react-router-dom";
import ProgressChart from "../components/ProgressChart";

const Dashboard = () => {
  const tasks = useLoaderData();
  return (
    <div className="p-4 h-[100vh-80vh] shadow-md rounded-xl m-4">
      <h2 className="text-xl font-display-3">Dashboard</h2>
      <ProgressChart tasks={tasks} />
    </div>
  );
};

export default Dashboard;
