//  DailyAverage.js
import { useEffect, useRef } from "react";
import { BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip } from "chart.js";

// Register required Chart.js components
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DailyAverage = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const data = {
      labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
      datasets: [
        {
          label: "Daily Average",
          data: [
            { x: "MON", y: [0, 50] }, // Start at 0, end at 50
            { x: "TUE", y: [0, 100] }, // Start at 0, end at 100
            { x: "WED", y: [0, 150] }, // Start at 50, end at 150
            { x: "THU", y: [0, 75] }, // Start at 0, end at 75
            { x: "FRI", y: [0, 125] }, // Start at 25, end at 125
            { x: "SAT", y: [0, 30] }, // Start at 0, end at 30
            { x: "SUN", y: [0, 60] } // Start at 0, end at 60
          ],
          backgroundColor: "#0B54A0"
        }
      ]
    };

    const options = {
      scales: {
        y: {
          min: 0, // Minimum value on the Y-axis
          max: 150, // Maximum value on the Y-axis
          ticks: {
            stepSize: 50, // Y-axis values increment by 50
            display: true // Display Y-axis labels
          }
        },
        x: {
          title: {
            display: true,
            text: "Days of the Week" // X-axis title
          }
        }
      },
      plugins: {
        legend: {
          display: false // Show the legend
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const value = tooltipItem.raw;
              return `Range: ${value[0]} - ${value[1]}`; // Custom tooltip display
            },
            title: function () {
              return ""; // Prevent showing a title in the tooltip
            }
          }
        }
      }
    };

    const myChart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        ...options,
        responsive: true,
        maintainAspectRatio: false
      }
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div className="w-full h-full">
      <canvas id=" DailyAverage" ref={chartRef}></canvas>
    </div>
  );
};

export default DailyAverage;
