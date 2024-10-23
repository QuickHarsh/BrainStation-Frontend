import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

const settings = {
  width: 200,
  height: 100, // Reduce height for half-gauge
  value: 60, // Set your gauge value here
  startAngle: -90, // Start from -90 degrees (left side)
  endAngle: 90 // End at 90 degrees (right side)
};

export default function ExamReadinessGauge() {
  return (
    <div style={{ position: "relative", width: settings.width, height: settings.height }}>
      {/* Half Gauge component */}
      <Gauge
        {...settings}
        cornerRadius="50%"
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 0 // Hide default value text from the Gauge
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: "#52b202" // Dynamic color of the arc
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled // Color of the reference arc
          }
        })}
      />

      {/* Custom content in the middle */}
      <div
        style={{
          position: "absolute",
          top: "65%", // Adjust for half gauge
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center"
        }}
      >
        {/* Display the value in the middle */}
        <div style={{ fontSize: "32px", fontWeight: "bold", color: "#333" }}>{settings.value}%</div>
      </div>
    </div>
  );
}
