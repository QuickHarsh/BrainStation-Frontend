import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

const defaultSettings = {
  width: 200,
  height: 200
};

export default function CurrentProgressGauge({ progress }) {
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

  const status = getStatus(progress);
  return (
    <div style={{ position: "relative", width: defaultSettings.width, height: defaultSettings.height }}>
      <Gauge
        {...defaultSettings}
        value={progress}
        cornerRadius="50%"
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 0
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: status.color
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled
          }
        })}
      />

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
        <AccountCircleIcon style={{ fontSize: "30px", color: status.iconColor }} />

        <div style={{ fontSize: "32px", fontWeight: "bold" }}>{status.grade}</div>

        <div style={{ fontSize: "16px", color: status.color }}>{status.label}</div>
      </div>
    </div>
  );
}
