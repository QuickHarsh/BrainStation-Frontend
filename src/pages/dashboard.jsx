import { useEffect, useState } from "react";
import { Bar, Bubble, Line, Pie } from "react-chartjs-2";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement
} from "chart.js";

// Register necessary chart elements
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const Dashboard = () => {
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [performerType, setPerformerType] = useState("");
  const [lowestChapter1, setLowestChapter1] = useState("");
  const [lowestChapter2, setLowestChapter2] = useState("");
  const [chapterMarks, setChapterMarks] = useState([]);
  const [focusStudyData, setFocusStudyData] = useState([]);
  const [taskPerformanceData, setTaskPerformanceData] = useState([]);
  const [cumulativeAverageData, setCumulativeAverageData] = useState([]); // Cumulative average data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Get studentId passed from URL
  const studentId = new URLSearchParams(location.search).get("studentId");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch completed tasks count
        const countResponse = await axios.get(`http://localhost:3000/api/progress/completed-tasks-count/${studentId}`);
        setCompletedTasksCount(countResponse.data.completedTasksCount);

        // Fetch dynamic performerType and lowest chapters
        const predictionResponse = await axios.post(`http://localhost:3000/api/progress/predict`, {
          Student_id: studentId
        });
        const predictionData = predictionResponse.data.data;
        setPerformerType(predictionData.performer_type);
        setLowestChapter1(predictionData.lowest_two_chapters[0].chapter);
        setLowestChapter2(predictionData.lowest_two_chapters[1].chapter);

        // Fetch chapter performance data
        const studentResponse = await axios.get(`http://localhost:3000/api/progress/student/${studentId}`);
        const studentData = studentResponse.data.data;

        // Set chapter marks
        const marksData = [
          { name: "Introduction OS", marks: studentData.Quiz_IntroductionOS_Marks },
          { name: "Processes & Threads", marks: studentData["Quiz_Processes&Threads_Marks"] },
          { name: "Deadlocks", marks: studentData.Quiz_Deadlocks_Marks },
          { name: "Virtual Memory", marks: studentData.Quiz_VirtualMemory_Marks }
        ];
        setChapterMarks(marksData);

        // Prepare focus vs study time vs average marks data (average marks can be derived from chapter marks)
        const averageMarks =
          (studentData.Quiz_IntroductionOS_Marks +
            studentData["Quiz_Processes&Threads_Marks"] +
            studentData.Quiz_Deadlocks_Marks +
            studentData.Quiz_VirtualMemory_Marks) /
          4;
        setFocusStudyData([{ studyTime: 180, focusLevel: studentData.Focus_Level, averageMarks: averageMarks }]);

        // Mock task completion vs performance data
        setTaskPerformanceData([
          { taskName: "Task 1", completion: 80, performance: 90 },
          { taskName: "Task 2", completion: 60, performance: 70 }
        ]);

        // Calculate cumulative average marks
        let runningTotal = 0;
        const cumulativeAverages = marksData.map((mark, index) => {
          runningTotal += mark.marks;
          return {
            assessment: mark.name,
            cumulativeAverage: (runningTotal / (index + 1)).toFixed(2)
          };
        });
        setCumulativeAverageData(cumulativeAverages);
      } catch (error) {
        setError("Failed to fetch dashboard data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [studentId]);

  // Handle the view tasks button click
  const handleViewTasks = () => {
    const taskUrl = `/task?performerType=${encodeURIComponent(performerType)}&chapter1=${encodeURIComponent(
      lowestChapter1
    )}&chapter2=${encodeURIComponent(lowestChapter2)}&studentId=${encodeURIComponent(studentId)}`;
    navigate(taskUrl);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Data for Chapter Performance (Pie Chart)
  const chapterPerformanceData = {
    labels: chapterMarks.map((chapter) => chapter.name),
    datasets: [
      {
        label: "Chapter Marks",
        data: chapterMarks.map((chapter) => chapter.marks),
        backgroundColor: ["#1f3c88", "#f1c40f", "#1f3c88", "#f1c40f"] // Dark blue and dark yellow
      }
    ]
  };

  // Data for Focus Level vs. Study Time vs. Average Marks (Bubble Chart)
  const focusStudyBubbleData = {
    datasets: [
      {
        label: "Focus vs. Study Time vs. Average Marks",
        data: focusStudyData.map((item) => ({
          x: item.studyTime, // Study time in minutes
          y: item.focusLevel, // Focus level
          r: item.averageMarks / 10 // Bubble size based on average marks (scaled down)
        })),
        backgroundColor: "#1f3c88", // Dark blue for bubbles
        borderColor: "#f1c40f" // Dark yellow for bubble outlines
      }
    ]
  };

  // Data for Task Completion vs. Performance (Bar Chart)
  const taskCompletionPerformanceData = {
    labels: taskPerformanceData.map((item) => item.taskName),
    datasets: [
      {
        label: "Task Completion (%)",
        data: taskPerformanceData.map((item) => item.completion),
        backgroundColor: "#1f3c88" // Dark blue
      },
      {
        label: "Performance (%)",
        data: taskPerformanceData.map((item) => item.performance),
        backgroundColor: "#f1c40f" // Dark yellow
      }
    ]
  };

  // Data for Cumulative Average Marks (Line Chart)
  const cumulativeAverageChartData = {
    labels: cumulativeAverageData.map((item) => item.assessment),
    datasets: [
      {
        label: "Cumulative Average Marks",
        data: cumulativeAverageData.map((item) => item.cumulativeAverage),
        fill: false,
        borderColor: "#1f3c88", // Dark blue line
        backgroundColor: "#f1c40f", // Yellow dots
        tension: 0.1
      }
    ]
  };

  return (
    <div
      className="dashboard-container"
      style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", padding: "20px" }}
    >
      <div
        className="section"
        style={{ backgroundColor: "transparent", color: "#34495e", padding: "20px", borderRadius: "10px" }}
      >
        <h1 className="text-3xl font-bold">Your Current Progress</h1>
        <p>Completed Tasks: {completedTasksCount}</p>
        <button
          onClick={handleViewTasks}
          style={{ backgroundColor: "#f1c40f", color: "#fff", padding: "10px 20px", borderRadius: "5px" }}
        >
          View Current Task
        </button>
      </div>

      {/* Chapter Performance (Pie Chart) */}
      <div
        className="section"
        style={{ backgroundColor: "transparent", color: "#34495e", padding: "20px", borderRadius: "10px" }}
      >
        <h2>Chapter Performance</h2>
        <Pie data={chapterPerformanceData} />
      </div>

      {/* Focus Level vs. Study Time vs. Average Marks (Bubble Chart) */}
      <div
        className="section"
        style={{ backgroundColor: "transparent", color: "#34495e", padding: "20px", borderRadius: "10px" }}
      >
        <h2>Focus Level vs. Study Time vs. Average Marks</h2>
        <Bubble data={focusStudyBubbleData} />
      </div>

      {/* Task Completion vs. Performance (Bar Chart) */}
      <div
        className="section"
        style={{ backgroundColor: "transparent", color: "#34495e", padding: "20px", borderRadius: "10px" }}
      >
        <h2>Task Completion vs. Performance</h2>
        <Bar data={taskCompletionPerformanceData} />
      </div>

      {/* Cumulative Average Marks (Line Chart) */}
      <div
        className="section"
        style={{ backgroundColor: "transparent", color: "#34495e", padding: "20px", borderRadius: "10px" }}
      >
        <h2>Cumulative Average Marks</h2>
        <Line data={cumulativeAverageChartData} />
      </div>
    </div>
  );
};

export default Dashboard;
