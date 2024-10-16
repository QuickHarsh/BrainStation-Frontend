import { Cell, Pie, PieChart } from "recharts";

const COLORS = ["#0B54A0", "#FFD200"];

const DonutChart = ({
  data = [
    { name: "Default Correct", value: 50 },
    { name: "Default Incorrect", value: 50 }
  ]
}) => {
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
          backgroundColor: "#F9F2D1",
          borderRadius: "50%",
          width: "110px",
          height: "110px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "26px",
          color: "#000000"
        }}
      >
        {data[0].value > 0 ? `${Math.round((data[0].value / (data[0].value + data[1].value)) * 100)}%` : "50%"}
      </div>
    </div>
  );
};

export default DonutChart;
