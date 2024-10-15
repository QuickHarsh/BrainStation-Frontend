import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

// Sample data for the charts
const progressData = [
  { name: "Progress", value: 50 },
  { name: "Remaining", value: 50 }
];
const taskCompletionData = [
  { name: "First Week", uv: 40 },
  { name: "Current Week", uv: 60 }
];
const quizMarksData = [
  { name: "Mon", uv: 2 },
  { name: "Tue", uv: 3 },
  { name: "Wed", uv: 5 },
  { name: "Thu", uv: 4 },
  { name: "Fri", uv: 5 },
  { name: "Sat", uv: 4 },
  { name: "Sun", uv: 3 }
];
const focusStudyComparisonData = [
  { name: "Week 1", focusLevel: 50, studyHours: 5, avgMarks: 60 },
  { name: "Week 2", focusLevel: 60, studyHours: 50, avgMarks: 70 },
  { name: "Week 3", focusLevel: 70, studyHours: 60, avgMarks: 50 },
  { name: "Week 4", focusLevel: 80, studyHours: 70, avgMarks: 90 }
];
const chapterFocusStudyData = [
  { name: "Chapter 1", focusLevel: 60, studyHours: 30 },
  { name: "Chapter 2", focusLevel: 70, studyHours: 40 },
  { name: "Chapter 3", focusLevel: 80, studyHours: 50 },
  { name: "Chapter 4", focusLevel: 90, studyHours: 60 }
];
const chapterPerformanceData = [
  { name: "Chapter 1", value: 25 },
  { name: "Chapter 2", value: 25 },
  { name: "Chapter 3", value: 25 },
  { name: "Chapter 4", value: 25 }
];
const timeSpentData = [
  { name: "Chapter 1", value: 30 },
  { name: "Chapter 2", value: 20 },
  { name: "Chapter 3", value: 25 },
  { name: "Chapter 4", value: 25 }
];

const COLORS = ["#003366", "#FFCC00"]; // Dark blue and dark yellow colors

const Analysis = () => {
  return (
    <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
      {/* Your Current Progress */}
      <div
        style={{
          gridColumn: "span 1",
          textAlign: "center",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "8px"
        }}
      >
        <h3>Your Current Progress</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={progressData} dataKey="value" outerRadius={70} fill={COLORS[0]}>
              {progressData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <p>50%</p>
      </div>

      {/* Task Completion Status */}
      <div
        style={{
          gridColumn: "span 1",
          textAlign: "center",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "8px"
        }}
      >
        <h3>Task Completion Status: 4</h3>
        <button
          style={{
            backgroundColor: COLORS[1],
            color: "white",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          View
        </button>
        <p>Pending: 4 | Completed: 2</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={taskCompletionData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="uv" fill={COLORS[0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quiz Marks Comparison */}
      <div
        style={{
          gridColumn: "span 1",
          textAlign: "center",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "8px"
        }}
      >
        <h3>Quiz Marks Comparison</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={quizMarksData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="uv" fill={COLORS[0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Focus Level, Study Hours & Average Chapter Marks Comparison */}
      <div
        style={{
          gridColumn: "span 2",
          textAlign: "center",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "8px"
        }}
      >
        <h3>Focus Level, Study Hours & Average Chapter Marks Comparison</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={focusStudyComparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="focusLevel" stroke={COLORS[0]} />
            <Line type="monotone" dataKey="studyHours" stroke={COLORS[1]} />
            <Line type="monotone" dataKey="avgMarks" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chapter-wise Focus Level & Study Hours */}
      <div
        style={{
          gridColumn: "span 1",
          textAlign: "center",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "8px"
        }}
      >
        <h3>Chapter-wise Focus Level & Study Hours</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chapterFocusStudyData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="focusLevel" fill={COLORS[0]} />
            <Bar dataKey="studyHours" fill={COLORS[1]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chapter Performance */}
      <div
        style={{
          gridColumn: "span 1",
          textAlign: "center",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "8px"
        }}
      >
        <h3>Chapter Performance</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={chapterPerformanceData} dataKey="value" outerRadius={70} fill={COLORS[0]} label>
              {chapterPerformanceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Time Spent on Each Chapter (Quiz) */}
      <div
        style={{
          gridColumn: "span 1",
          textAlign: "center",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "8px"
        }}
      >
        <h3>Time Spent on Each Chapter (Quiz)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={timeSpentData} dataKey="value" outerRadius={70} fill={COLORS[1]} label>
              {timeSpentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analysis;
