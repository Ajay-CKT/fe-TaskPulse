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
  const data = [
    { id: 0, value: statusCounts.active, label: "Active" },
    { id: 1, value: statusCounts.pending, label: "Pending" },
    { id: 2, value: statusCounts.completed, label: "Completed" },
  ];

  return (
    <PieChart
      series={[
        {
          data,
          cornerRadius: 5,
          highlightScope: { fade: "global", highlight: "item" },
          faded: {
            color: "gray",
            innerRadius: 30,
            cornerRadius: 5,
            additionalRadius: -30,
          },
        },
      ]}
      height={300}
    />
  );
};

export default ProgressChart;
