import { useEffect, useRef, useState } from "react";
import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { getLecturePerformance } from "@/service/task";

Chart.register(ArcElement, Tooltip, Legend);

const abbreviateLectureName = (name) => {
  const abbreviations = {
    "Data Science": "DS",
    "Machine Learning": "ML",
    "Artificial Intelligence": "AI",
    "Introduction to Programming": "ITP",
    "Computer Vision": "CV"
  };

  if (abbreviations[name]) return abbreviations[name];
  if (name.length > 30) {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("");
  }
  return name;
};

const ChapterPerformence = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLecturePerformance();
        const { lecturePerformance } = response || {};

        console.log("Lecture Performance Data:", lecturePerformance);

        if (!lecturePerformance) {
          console.error("Lecture performance data is missing.");
          return;
        }

        const labels = lecturePerformance.map((item) => abbreviateLectureName(item.lectureTitle));
        const scores = lecturePerformance.map((item) => item.score);

        setChartData({
          labels,
          datasets: [
            {
              label: "Lecture Performance",
              data: scores,
              backgroundColor: ["#020B3E", "#5971C0", "#0B54A0", "#83C9D2"],
              borderColor: ["#020B3E", "#5971C0", "#0B54A0", "#83C9D2"],
              borderWidth: 1
            }
          ]
        });
      } catch (error) {
        console.error("Error fetching lecture performance data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      const myChart = new Chart(ctx, {
        type: "pie",
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top"
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`
              }
            }
          }
        }
      });

      return () => {
        myChart.destroy();
      };
    }
  }, [chartData]);

  return <canvas id="ChapterPerformence" ref={chartRef} width="100%" height="100%"></canvas>;
};

export default ChapterPerformence;
