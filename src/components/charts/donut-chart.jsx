import { Cell, Pie, PieChart } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 400 }
];

const COLORS = ["#FFD200", "#0B54A0"];

const DonutChart = () => {
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
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>

      {/* Centered Label */}
      <div
        style={{
          position: "absolute",
          top: "53%",
          left: "48%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#F9F2D1", // Background color similar to the image
          borderRadius: "50%",
          width: "110px", // Adjust size as needed
          height: "110px", // Adjust size as needed
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "26px",
          color: "#000000" // Text color
        }}
      >
        50%
      </div>
    </div>
  );
};

export default DonutChart;
