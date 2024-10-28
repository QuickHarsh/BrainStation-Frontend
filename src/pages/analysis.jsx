import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ScrollView from "@/components/common/scrollable-view";
import AnalysisSkeleton from "@/components/skeletons/alalysis";
import { getCompletedTasks, getCompletedTasksCount, getOldPerformanceTypes, getStudentAlerts } from "@/service/task";
import ChapterPerformence from "../components/charts/ChapterPerformence";
import CurrentProgressGauge from "../components/charts/CurrentProgressGauge";
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
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Performertype:", performerType);
    if (performerType) {
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
    } else {
      console.warn("performerType is missing, setting progress to 0");
      setProgress(0); // Default to 0 if performerType is missing
    }
  }, [performerType]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [alertResponse, tasksCountResponse, completedTasksResponse, performanceResponse] = await Promise.all([
          getStudentAlerts(),
          getCompletedTasksCount(),
          getCompletedTasks(),
          getOldPerformanceTypes()
        ]);

        // Update states based on responses
        setAlertMessage(alertResponse.alertMessage);
        setCompletedTasksCount(tasksCountResponse.completedTasksCount);
        setCompletedTasks(completedTasksResponse.completedTasks || []);
        setPerformanceData(performanceResponse.performerTypes);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Only set loading to false once all data is fetched
      }
    };

    fetchData();
  }, []);

  const handleCompletedTasksClick = () => navigate("/completed-tasks", { state: {} });
  const handleNavigateToTask = () => navigate("/task", { state: { performerType, strugglingAreas } });

  if (loading) {
    return <AnalysisSkeleton />;
  }

  return (
    <div className="p-4 px-6">
      <ScrollView initialMaxHeight="7.5rem">
        <>
          <h1 className="font-bold mb-4 text-3xl text-blue-900 p-2 bg-blue-50 rounded-lg shadow-sm tracking-wide text-center">
            Analysis Dashboard
          </h1>
          <div className="flex flex-col gap-6 pb-2">
            {/* Top Row */}
            <div className="flex flex-wrap lg:flex-nowrap gap-6">
              {/* Student Status */}
              <div className="flex-1 p-6 bg-blue-50 border border-gray-200 rounded-xl shadow-lg">
                <h2 className="font-bold text-center text-xl text-blue-800 mb-4">Student Status</h2>

                {/* Progress Gauge */}
                <div className="flex justify-center">
                  <CurrentProgressGauge progress={progress} />
                </div>

                {/* Alert Box */}
                <div className="mt-6 p-4 bg-red-100 rounded-lg shadow-inner flex flex-col">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 text-red-700 mr-2"
                    >
                      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                    <h6 className="font-semibold text-xl text-red-700">Alert</h6>
                  </div>
                  <p className="text-gray-800 text-lg font-medium">{alertMessage || "Loading alert..."}</p>
                </div>
              </div>

              {/* Task Completion Status */}
              <div className="flex-1 p-8 bg-green-50 border border-gray-200 rounded-xl shadow-md">
                {/* Header */}
                <h2 className="font-bold text-center text-2xl text-green-700 mb-6">Task Completion Status</h2>

                {/* Completed Tasks Count */}
                <div className="text-center">
                  <p className="text-xl font-semibold text-gray-800">
                    <span className="block text-4xl font-extrabold text-green-800 mb-1">{completedTasksCount}</span>
                    <span className="text-lg text-gray-700">Completed Tasks</span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex items-center justify-center gap-4">
                  <button
                    className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold py-2 w-40 rounded-lg shadow-md transition transform hover:scale-105"
                    onClick={handleNavigateToTask}
                  >
                    View Tasks
                  </button>
                  <button
                    className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold py-2 w-40 rounded-lg shadow-md transition transform hover:scale-105"
                    onClick={handleCompletedTasksClick}
                  >
                    Completed
                  </button>
                </div>

                {/* Motivation Section */}
                <div className="mt-4 flex items-center justify-center ">
                  <div className="text-center w-full">
                    <h6 className="font-semibold text-lg text-green-700 mb-2">Motivation</h6>
                    <MotivationalQuote />
                  </div>
                </div>
              </div>

              {/* Chapter Performance */}
              <div className="flex-1 p-8 bg-indigo-50 border border-indigo-200 rounded-xl shadow-md">
                {/* Header */}
                <h6 className="font-extrabold text-center text-2xl text-indigo-800 mb-6 tracking-wide">
                  Chapter Performance
                </h6>

                {/* Chapter Performance Chart */}
                <div className="flex items-center justify-center h-72 w-full bg-white border border-indigo-100 rounded-lg shadow-inner p-4">
                  <ChapterPerformence />
                </div>
              </div>
            </div>

            {/* Middle Row */}
            <div className="flex flex-wrap lg:flex-nowrap gap-6">
              {/* Task Activity */}
              <div className="flex-1 p-8 bg-purple-50 border border-gray-200 rounded-xl shadow-lg">
                <h2 className="text-center font-bold text-xl text-purple-800 mb-4">Task Activity</h2>
                <TaskActivityChart completedTasks={completedTasks} />
              </div>

              {/* Performance Type */}
              <div className="lg:w-1/2 w-full p-6 bg-yellow-50 border border-gray-200 rounded-xl shadow-lg">
                <h6 className="font-bold text-center text-xl text-yellow-700 mb-4">Performance Type</h6>
                {performanceData && performanceData.length > 0 ? (
                  <QuizMarksLatestAttempt performanceData={performanceData} />
                ) : (
                  <p className="text-center text-gray-600">No performance data found</p>
                )}
              </div>
            </div>
          </div>
        </>
      </ScrollView>
    </div>
  );
}

export default Analysis;
