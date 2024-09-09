import { Cell, Pie, PieChart } from "recharts";

const DonutChart = ({ emotionDistribution }) => {
  // Convert emotion_distribution into data format for the PieChart
  const data = Object.entries(emotionDistribution).map(([name, value]) => ({
    name,
    value
  }));

  // Define colors for each emotion (customize as per your requirements)
  const COLORS = {
    Happy: "#FFD200",
    Angry: "#FF5733"
    // You can add more emotion colors here
  };

  // Find the emotion with the highest percentage
  const dominantEmotion = data.reduce((prev, current) => (prev.value > current.value ? prev : current));

  return (
    <div style={{ position: "relative", width: "200px", height: "200px" }}>
      {/* PieChart Container */}
      <div style={{ transform: "rotate(87deg)", transformOrigin: "center" }}>
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            cx={100}
            cy={100}
            innerRadius={80}
            outerRadius={90}
            cornerRadius={8}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[entry.name] || "#8884d8"} // Default color if not specified
              />
            ))}
          </Pie>
        </PieChart>
      </div>

      {/* Centered Label with Dominant Emotion */}
      <div
        style={{
          position: "absolute",
          top: "53%",
          left: "48%",
          transform: "translate(-50%, -50%)",
          backgroundColor: COLORS[dominantEmotion.name], // Color based on dominant emotion
          borderRadius: "50%",
          width: "110px",
          height: "110px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "14px", // Adjust font size as needed
          color: "#000000", // Text color
          textAlign: "center", // Center text if multi-line
          padding: "10px"
        }}
      >
        {dominantEmotion.name} {/* Display the dominant emotion */}
      </div>
    </div>
  );
};

export default DonutChart;
