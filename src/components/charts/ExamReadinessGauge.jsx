import { useEffect, useState } from "react";
import { getStudentCumulativeAverage } from "@/service/task";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

// Import the API call

const settings = {
  width: 200,
  height: 100,
  startAngle: -90,
  endAngle: 90
};

export default function ExamReadinessGauge() {
  const [gaugeValue, setGaugeValue] = useState(0);

  // Fetch cumulative average and round it
  useEffect(() => {
    async function fetchCumulativeAverage() {
      try {
        const response = await getStudentCumulativeAverage(); // Fetch the cumulative average
        const roundedValue = Math.round(response.cumulativeAverage / 10) * 10; // Round to nearest 10
        setGaugeValue(roundedValue);
      } catch (error) {
        console.error("Error fetching cumulative average:", error);
      }
    }
    fetchCumulativeAverage();
  }, []);

  // Determine color based on value ranges
  const determineColor = (value) => {
    if (value >= 80) return "#52b202"; // Green for high readiness
    if (value >= 50) return "#ffcc00"; // Yellow for moderate readiness
    return "#ff4d4d"; // Red for low readiness
  };

  return (
    <div style={{ position: "relative", width: settings.width, height: settings.height }}>
      <Gauge
        {...settings}
        value={gaugeValue}
        cornerRadius="50%"
        sx={{
          [`& .${gaugeClasses.valueText}`]: { fontSize: 0 }, // Hide default value text
          [`& .${gaugeClasses.valueArc}`]: { fill: determineColor(gaugeValue) }, // Set dynamic color
          [`& .${gaugeClasses.referenceArc}`]: { fill: "#e0e0e0" } // Light gray reference arc
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "65%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center"
        }}
      >
        <div style={{ fontSize: "32px", fontWeight: "bold", color: "#333" }}>{gaugeValue}%</div>
      </div>
    </div>
  );
}
