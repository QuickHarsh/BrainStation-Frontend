import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ScrollView from "@/components/common/scrollable-view";
import { getCompletedTasks, getCompletedTasksCount, getStudentAlerts } from "@/service/task";
import ChapterPerformence from "../components/charts/ChapterPerformence";
import CurrentProgressGauge from "../components/charts/CurrentProgressGauge";
import MarksComparison from "../components/charts/MarksComparison";
import QuizMarksLatestAttempt from "../components/charts/QuizMarksLatestAttempt";
import TaskActivityChart from "../components/charts/TaskActivityChart";
import MotivationalQuote from "../components/dashboard/MotivationalQuote";

function Analysis() {
  const navigate = useNavigate();
  const location = useLocation();
  const { performerType, strugglingAreas } = location.state || { performerType: "", strugglingAreas: [] };

  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);
  useEffect(() => {
    async function fetchAlertMessage() {
      try {
        const response = await getStudentAlerts();
        setAlertMessage(response.alertMessage);
      } catch (error) {
        console.error("Error fetching alert message:", error);
      }
    }
    fetchAlertMessage();
  }, []);

  useEffect(() => {
    switch (performerType) {
      case "Excellent Performer":
        setProgress(100);
        break;
      case "Medium Performer":
        setProgress(50);
        break;
      case "Low Performer":
        setProgress(25);
        break;
      default:
        setProgress(0);
    }
  }, [performerType]);

  useEffect(() => {
    const fetchCompletedTasksCount = async () => {
      try {
        const response = await getCompletedTasksCount();
        setCompletedTasksCount(response.completedTasksCount);
      } catch (error) {
        console.error("Error fetching completed tasks count:", error);
      }
    };
    fetchCompletedTasksCount();
  }, []);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const response = await getCompletedTasks();
        setCompletedTasks(response.completedTasks || []); // Default to empty array
      } catch (error) {
        console.error("Error fetching completed tasks:", error);
      }
    };
    fetchCompletedTasks();
  }, []);

  const alertStyle = {
    backgroundColor: alertMessage === "Nice work! Keep it up!" ? "#D4EDDA" : "#F8D7DA",
    color: alertMessage === "Nice work! Keep it up!" ? "#155724" : "#721C24",
    border: alertMessage === "Nice work! Keep it up!" ? "1px solid #C3E6CB" : "1px solid #F5C6CB",
    padding: "16px",
    borderRadius: "8px",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "18px"
  };

  const handleCompletedTasksClick = () => navigate("/completed-tasks", { state: {} });
  const handleNavigateToTask = () => navigate("/task", { state: { performerType, strugglingAreas } });

  return (
    <div className="p-4 px-6">
      <h1 className="font-inter font-bold text-2xl p-3">Analysis Dashboard</h1>

      <ScrollView>
        <div className="h-screen flex flex-col lg:flex-row gap-10">
          <div className="lg:w-1/2 w-full flex flex-col gap-6">
            {/* Left Side */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Current Progress & Alert Card */}
              <div className="flex-1 p-6 bg-white border border-gray-200 rounded-lg flex flex-col items-center gap-10">
                <div className="flex flex-col items-center">
                  <h6 className="mb-3 font-bold">Your Current Progress</h6>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CurrentProgressGauge progress={progress} />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h6 className="mb-3 font-bold">Alert</h6>
                  <div style={alertStyle}>{alertMessage || "Loading alert..."}</div>
                </div>
              </div>

              {/* Task Completion Status & Motivational Quote Section */}
              <div className="flex flex-col gap-4 flex-1">
                {/* Task Completion Status Card */}
                <div
                  className="p-4 bg-white border border-gray-200 rounded-lg flex flex-col items-center gap-4"
                  style={{ minWidth: "300px" }}
                >
                  <h2 className="mb-3 font-bold text-lg">Task Completion Status</h2>
                  <p className="text-lg">
                    Completed Tasks = <span className="font-bold">{completedTasksCount}</span>
                  </p>
                  <div className="mt-4 flex flex-col items-center gap-3">
                    <button
                      className="rounded-md bg-blue-600 text-white font-bold py-1.5 px-4 text-lg transition-all w-40"
                      onClick={handleNavigateToTask}
                    >
                      View Task
                    </button>
                    <button
                      className="rounded-md bg-blue-600 text-white font-bold py-1.5 px-4 text-lg transition-all w-40"
                      onClick={handleCompletedTasksClick}
                    >
                      Completed Task
                    </button>
                  </div>
                </div>

                {/* Motivational Quote Card */}
                <div
                  className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col justify-center items-center"
                  style={{ minWidth: "300px" }}
                >
                  <h2 className="mb-3 font-bold text-lg text-center">Motivation</h2>
                  <MotivationalQuote />
                </div>
              </div>
            </div>

            {/* Task Activity Section */}
            <div className="w-full bg-white border border-gray-200 rounded-lg p-8 mt-4">
              <h2 className="text-center font-bold mb-3">Task Activity</h2>
              <TaskActivityChart completedTasks={completedTasks} />
            </div>
          </div>

          {/* Right Side Charts */}
          <div className="lg:w-1/2 w-full h-full flex flex-col gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 p-4">
                  <h2 className="text-center font-bold mb-3">Quiz Marks vs Latest Attempt</h2>
                  <QuizMarksLatestAttempt />
                </div>

                <div className="w-full md:w-1/2 p-4">
                  <h2 className="text-center font-bold">Chapter Performance</h2>
                  <div className="h-72 w-full flex justify-center">
                    <ChapterPerformence />
                  </div>
                </div>
              </div>
            </div>

            {/* Marks Comparison Chart */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-center font-bold mb-2">
                Focus Level, Study Hours & Average Chapter Marks Comparison
              </h2>
              <div className="h-96 w-full">
                <MarksComparison />
              </div>
            </div>
          </div>
        </div>
      </ScrollView>
    </div>
  );
}

export default Analysis;
