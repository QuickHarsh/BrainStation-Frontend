import { useEffect, useRef } from "react";
import { CategoryScale, Chart, Legend, LineElement, LinearScale, PointElement, Tooltip } from "chart.js";

// Register required Chart.js components
Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const MarksComparison = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // X-axis labels
      datasets: [
        {
          label: "Focus Level", // First line label
          data: [100, 150, 200, 180, 230, 250, 300, 350, 400, 450, 500, 550], // Data for the first line
          fill: false,
          borderColor: "rgba(75, 192, 192, 1)", // Line color
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderWidth: 2,
          tension: 0.4 // Smoothness of the line
        },
        {
          label: "Study Hours", // Second line label
          data: [120, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700], // Data for the second line
          fill: false,
          borderColor: "rgba(255, 99, 132, 1)", // Line color
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderWidth: 2,
          tension: 0.4 // Smoothness of the line
        },
        {
          label: "Average Chapter Marks", // Third line label
          data: [90, 130, 170, 220, 260, 310, 350, 410, 460, 510, 570, 600], // Data for the third line
          fill: false,
          borderColor: "rgba(54, 162, 235, 1)", // Line color
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderWidth: 2,
          tension: 0.4 // Smoothness of the line
        }
      ]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 0, // Minimum y-axis value
          max: 1000, // Maximum y-axis value
          ticks: {
            stepSize: 250, // Y-axis increments by 250
            callback: function (value) {
              return value; // Display y-axis values as 0, 250, 500, 750, 1000
            }
          }
        }
      },
      plugins: {
        legend: {
          position: "top" // Position of the legend
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `${tooltipItem.raw}`; // Show the exact data value in the tooltip
            }
          }
        }
      }
    };

    const myChart = new Chart(ctx, {
      type: "line",
      data: data,
      options: options
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div className="w-full h-full">
      <canvas id="MarksComparison" ref={chartRef}></canvas>
    </div>
  );
};

export default MarksComparison;
