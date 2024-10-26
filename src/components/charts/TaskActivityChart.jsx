import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

function aggregateTasksByDate(completedTasks) {
  const taskCountByDate = {};

  completedTasks.forEach((task) => {
    const date = new Date(task.completedAt).toLocaleDateString();
    if (taskCountByDate[date]) {
      taskCountByDate[date]++;
    } else {
      taskCountByDate[date] = 1;
    }
  });

  return Object.keys(taskCountByDate).map((date) => ({
    date,
    count: taskCountByDate[date]
  }));
}

export default function TaskActivityChart({ completedTasks = [] }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    if (completedTasks.length > 0) {
      const aggregatedData = aggregateTasksByDate(completedTasks);
      const dates = aggregatedData.map((item) => item.date);
      const counts = aggregatedData.map((item) => item.count);

      setChartData({
        labels: dates,
        datasets: [
          {
            label: "Tasks Completed",
            data: counts,
            borderColor: "#4e73df",
            backgroundColor: "rgba(78, 115, 223, 0.2)",
            fill: true,
            tension: 0.4
          }
        ]
      });
    }
  }, [completedTasks]);

  return (
    <div style={{ width: "100%", height: "300px" }}>
      {completedTasks.length > 0 ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: true }
            },
            scales: {
              x: { title: { display: true, text: "Date" } },
              y: { title: { display: true, text: "Tasks Completed" } }
            }
          }}
        />
      ) : (
        <p>Loading task activity data...</p>
      )}
    </div>
  );
}
