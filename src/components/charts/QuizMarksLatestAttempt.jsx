import { Bar } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";

// Register the components with ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function QuizMarksLatestAttempt({ performanceData }) {
  // Check if performanceData is available and has data
  if (!performanceData || performanceData.length === 0) {
    return <p>No data available for performance types.</p>; // Display this message when no data is available
  }

  // Generate labels like "Initial", "Mid", and "Latest"
  const labels = performanceData.map((data, index) => {
    if (index === 0) {
      return "Initial"; // First entry
    } else if (index === performanceData.length - 1) {
      return "Latest"; // Last entry
    }
    return `Mid ${index}`; // Intermediate entries
  });

  const dataValues = performanceData.map((data) => {
    // Check for performerType and map to values
    switch (data.performerType.toLowerCase()) {
      case "low performer": // Match "Low Performer" correctly
        return 1;
      case "medium":
        return 2;
      case "excellent":
      case "high":
        return 3;
      default:
        return 0;
    }
  });

  const chartData = {
    labels, // Use "Initial", "Mid", and "Latest" as labels
    datasets: [
      {
        label: "Performance Type",
        data: dataValues, // 1 = Low, 2 = Medium, 3 = Excellent
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"] // Colors for bars
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top"
      },
      title: {
        display: true,
        text: "Performance Type Progress (Initial to Latest)"
      }
    },
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          stepSize: 1,
          callback: function (value) {
            switch (value) {
              case 1:
                return "Low";
              case 2:
                return "Medium";
              case 3:
                return "Excellent";
              default:
                return "";
            }
          }
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
}

export default QuizMarksLatestAttempt;
