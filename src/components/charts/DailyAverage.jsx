import { useEffect, useRef } from "react";
import { BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip } from "chart.js";

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
            { x: "MON", y: [0, 50] },
            { x: "TUE", y: [0, 100] },
            { x: "WED", y: [0, 150] },
            { x: "THU", y: [0, 75] },
            { x: "FRI", y: [0, 125] },
            { x: "SAT", y: [0, 30] },
            { x: "SUN", y: [0, 60] }
          ],
          backgroundColor: "#0B54A0"
        }
      ]
    };

    const options = {
      scales: {
        y: {
          min: 0,
          max: 150,
          ticks: {
            stepSize: 50,
            display: true
          }
        },
        x: {
          title: {
            display: true,
            text: "Days of the Week"
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const value = tooltipItem.raw;
              return `Range: ${value[0]} - ${value[1]}`;
            },
            title: function () {
              return "";
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
