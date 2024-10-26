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
      <button
        className="bg-transparent text-blue-400 font-bold py-1 px-4 rounded-full ml-4 mt-4 flex items-center border border-blue-400 hover:bg-blue-100"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
      <h1 className="font-inter font-extrabold text-2xl p-3 text-center">Analysis Dashboard</h1>

      <ScrollView>
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap lg:flex-nowrap gap-4">
            <div className="flex-1 p-6 bg-gray-200 border border-gray-300 rounded-lg shadow-lg">
              <h2 className="font-bold text-center text-xl mb-3">Student Status</h2>
              <div className="flex justify-center">
                <CurrentProgressGauge progress={progress} />
              </div>
              <h6 className="font-bold text-center mt-4 mb-3">Alert</h6>
              <div style={alertStyle}>{alertMessage || "Loading alert..."}</div>
            </div>

            <div className="flex-1 p-6 bg-gray-200 border border-gray-300 rounded-lg shadow-lg">
              <h2 className="font-bold text-center text-xl mb-3">Task Completion Status</h2>

              <p className="text-lg text-center">
                Completed Tasks: <span className="font-bold">{completedTasksCount}</span>
              </p>

              <div className="mt-4 flex items-center justify-center gap-4">
                <button
                  className="rounded-md bg-blue-600 text-white font-bold py-1.5 px-6 text-lg transition-all w-32 text-center"
                  onClick={handleNavigateToTask}
                >
                  View Task
                </button>
                <button
                  className="rounded-md bg-blue-600 text-white font-bold py-1.5 px-6 text-lg transition-all w-32 text-center"
                  onClick={handleCompletedTasksClick}
                >
                  Completed Task
                </button>
              </div>

              <h6 className="font-bold text-center text-xl mt-6 mb-3">Motivation</h6>
              <MotivationalQuote />
            </div>

            <div className="flex-1 p-6 bg-gray-200 border border-gray-300 rounded-lg shadow-lg">
              <h6 className="font-bold text-center text-xl mb-3">Chapter Performance</h6>
              <div className="h-64 w-full flex justify-center">
                {" "}
                <ChapterPerformence />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap lg:flex-nowrap gap-4">
            <div className="flex-1 p-8 bg-gray-200 border border-gray-300 rounded-lg shadow-lg">
              <h2 className="text-center font-bold text-xl mb-3">Task Activity</h2>
              <TaskActivityChart completedTasks={completedTasks} />
            </div>

            <div className="flex-1 p-8 bg-gray-200 border border-gray-300 rounded-lg shadow-lg">
              <h2 className="text-center font-bold text-xl mb-2">
                Focus Level, Study Hours & Average Chapter Marks Comparison
              </h2>
              <div className="h-96 w-full">
                <MarksComparison />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap lg:flex-nowrap gap-4">
            <div className="lg:w-1/2 w-full p-4 bg-gray-200 border border-gray-300 rounded-lg shadow-lg">
              <h6 className="font-bold text-center text-xl mb-3">Quiz Marks vs Latest Attempt</h6>
              <QuizMarksLatestAttempt />
            </div>

            <div className="lg:w-1/2 w-full p-4 bg-gray-200 border border-gray-300 rounded-lg shadow-lg"></div>
          </div>
        </div>
      </ScrollView>
    </div>
  );
}

export default Analysis;
