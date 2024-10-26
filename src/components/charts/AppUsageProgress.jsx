import { useEffect, useRef } from "react";
import { BarElement, CategoryScale, Chart, LinearScale } from "chart.js";

// Register required Chart.js components
Chart.register(BarElement, CategoryScale, LinearScale);

const AppUsageProgress = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const data = {
      labels: ["First Week", "Current Week"],
      datasets: [
        {
          label: "Task Completion",
          data: [
            { x: "First Week", y: [0, 50] }, // Start from 10, end at 50
            { x: "Current Week", y: [0, 80] } // Start from 30, end at 80
          ],
          backgroundColor: "#0B54A0",
          borderWidth: 1
        }
      ]
    };

    const options = {
      scales: {
        y: {
          min: 0, // Minimum value on the Y-axis
          max: 100, // Maximum value on the Y-axis
          ticks: {
            stepSize: 25, // Y-axis values should increment by 25
            callback: function (value) {
              return value; // Display the Y-axis values as they are (0, 25, 50, 75, 100)
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
        plugins: {
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                const value = tooltipItem.raw;
                return `Range: ${value[0]} - ${value[1]}`;
              }
            }
          }
        }
      }
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return <canvas id="AppUsageProgress" ref={chartRef} width="400" height="400"></canvas>;
};

export default AppUsageProgress;
