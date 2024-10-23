import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

const settings = {
  width: 200,
  height: 200,
  value: 85 // Set your gauge value here
};

export default function CurrentProgressGauge() {
  // Determine the text and color based on the gauge value
  const getStatus = (value) => {
    if (value <= 50) {
      return {
        label: "Bad",
        grade: "C",
        color: "#ff4444",
        iconColor: "#ff4444"
      };
    } else if (value > 50 && value <= 80) {
      return {
        label: "Good",
        grade: "B",
        color: "#ffcc00",
        iconColor: "#ffcc00"
      };
    } else {
      return {
        label: "Excellent",
        grade: "A",
        color: "#52b202",
        iconColor: "#52b202"
      };
    }
  };

  const status = getStatus(settings.value); // Get the status based on the value

  return (
    <div style={{ position: "relative", width: settings.width, height: settings.height }}>
      {/* Gauge component */}
      <Gauge
        {...settings}
        cornerRadius="50%"
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 0 // Hide default value text
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: status.color // Dynamic color of the arc
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
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center"
        }}
      >
        {/* Icon in the middle */}
        <AccountCircleIcon style={{ fontSize: "30px", color: status.iconColor }} />

        {/* Grade text */}
        <div style={{ fontSize: "32px", fontWeight: "bold" }}>{status.grade}</div>

        {/* Additional text */}
        <div style={{ fontSize: "16px", color: "#02AB31" }}>{status.label}</div>
      </div>
    </div>
  );
}
