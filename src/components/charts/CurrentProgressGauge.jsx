import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

// Define the default settings for the gauge
const defaultSettings = {
  width: 200,
  height: 200
};

export default function CurrentProgressGauge({ progress }) {
  // Determine the text and color based on the progress value
  const getStatus = (value) => {
    if (value <= 50) {
      return {
        label: "Law",
        grade: "C",
        color: "#ff4444",
        iconColor: "#ff4444"
      };
    } else if (value > 50 && value <= 80) {
      return {
        label: "Medium",
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

  const status = getStatus(progress); // Get the status based on the progress value

  return (
    <div style={{ position: "relative", width: defaultSettings.width, height: defaultSettings.height }}>
      {/* Gauge component */}
      <Gauge
        {...defaultSettings}
        value={progress} // Dynamically set the value based on progress prop
        cornerRadius="50%"
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 0 // Hide default value text
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: status.color // Dynamic color of the arc based on progress
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
        <div style={{ fontSize: "16px", color: status.color }}>{status.label}</div>
      </div>
    </div>
  );
}
