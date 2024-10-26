import { useEffect, useRef } from "react";
import { BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip } from "chart.js";

// Register required Chart.js components
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const QuizMarksLatestAttempt = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const data = {
      labels: ["1 Chapter", "2 Chapter", "3 Chapter", "4 Chapter"],
      datasets: [
        {
          label: "Start",
          data: [
            { x: "1 Chapter", y: [0, 50] }, // Start at 0, end at 50
            { x: "2 Chapter", y: [0, 75] }, // Start at 25, end at 75
            { x: "3 Chapter", y: [0, 100] }, // Start at 0, end at 100
            { x: "4 Chapter", y: [0, 100] } // Start at 50, end at 100
          ],
          backgroundColor: "#020B3E"
        },
        {
          label: "End",
          data: [
            { x: "1 Chapter", y: [0, 30] }, // Start at 0, end at 30
            { x: "2 Chapter", y: [0, 60] }, // Start at 0, end at 60
            { x: "3 Chapter", y: [0, 80] }, // Start at 50, end at 80
            { x: "4 Chapter", y: [0, 70] } // Start at 30, end at 70
          ],
          backgroundColor: "#0B54A0"
        }
      ]
    };

    const options = {
      scales: {
        y: {
          min: 0, // Minimum value on the Y-axis
          max: 100, // Maximum value on the Y-axis
          ticks: {
            stepSize: 25, // Y-axis values increment by 25
            callback: function (value) {
              return value; // Display the Y-axis values as they are (0, 25, 50, 75, 100)
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false // Hide the legend
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
        responsive: true
      }
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return <canvas id=" QuizMarksLatestAttempt" ref={chartRef} width="100%" height="100%"></canvas>;
};

export default QuizMarksLatestAttempt;
