import { useEffect, useRef, useState } from "react";
import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { getLecturePerformance } from "@/service/task";

// Register required Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

// Helper function to abbreviate long lecture names
const abbreviateLectureName = (name) => {
  // Define abbreviations for common terms
  const abbreviations = {
    "Data Science": "DS",
    "Machine Learning": "ML",
    "Artificial Intelligence": "AI",
    "Introduction to Programming": "ITP",
    "Computer Vision": "CV",
    // Add more as needed
  };

  // Check if the name is in abbreviations, else shorten to initials if it's over 30 characters
  if (abbreviations[name]) return abbreviations[name];
  if (name.length > 30) {
    return name
      .split(" ")
      .map((word) => word[0]) // Take the first letter of each word
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

        // Map API data to chart format, using abbreviations for labels
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
