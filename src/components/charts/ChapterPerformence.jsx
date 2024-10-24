//  ChapterPerformence.js
import { useEffect, useRef } from "react";
import { ArcElement, Chart, Legend, Tooltip } from "chart.js";

// Register required Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

const ChapterPerformence = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const data = {
      labels: ["1 Chapter", "2 Chapter", "3 Chapter", "4 Chapter"],
      datasets: [
        {
          label: "Chapters Progress",
          data: [33, 89, 20, 10], // Example data representing progress for each chapter
          backgroundColor: ["#020B3E", "#5971C0", "#0B54A0", "#83C9D2"],
          borderColor: ["#020B3E", "#5971C0", "#0B54A0", "#83C9D2"],
          borderWidth: 1
        }
      ]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top" // Position of the legend
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const value = tooltipItem.raw;
              return `${tooltipItem.label}: ${value}`; // Display label with value in tooltip
            }
          }
        }
      }
    };

    const myChart = new Chart(ctx, {
      type: "pie",
      data: data,
      options: options
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return <canvas id="ChapterPerformence" ref={chartRef} width="100%" height="100%"></canvas>;
};

export default ChapterPerformence;
