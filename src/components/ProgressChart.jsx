import { PieChart } from "@mui/x-charts";

const ProgressChart = ({ tasks }) => {
  if (!tasks || !tasks.tasks || tasks.tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks available</p>;
  }
  const statusCounts = tasks.tasks.reduce(
    (acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    },
    { active: 0, pending: 0, completed: 0 }
  );

  return (
    <>
      <div className="visible md:hidden">
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: statusCounts.active },
                { id: 1, value: statusCounts.pending },
                { id: 2, value: statusCounts.completed },
              ],
              cornerRadius: 5,
              highlightScope: { fade: "global", highlight: "item" },
              faded: {
                color: "gray",
                innerRadius: 30,
                cornerRadius: 5,
                additionalRadius: -30,
              },
              arcLabel: (item) => `${item.value}%`,
              arcLabelMinAngle: 35,
              arcLabelRadius: "60%",
            },
          ]}
          height={300}
        />
      </div>
      <div className="hidden md:flex">
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: statusCounts.active, label: "Active" },
                { id: 1, value: statusCounts.pending, label: "Pending" },
                { id: 2, value: statusCounts.completed, label: "Completed" },
              ],
              cornerRadius: 5,
              highlightScope: { fade: "global", highlight: "item" },
              faded: {
                color: "gray",
                innerRadius: 30,
                cornerRadius: 5,
                additionalRadius: -30,
              },
              arcLabel: (item) => `${item.value}%`,
              arcLabelMinAngle: 35,
              arcLabelRadius: "60%",
            },
          ]}
          height={300}
        />
      </div>
    </>
  );
};

export default ProgressChart;
