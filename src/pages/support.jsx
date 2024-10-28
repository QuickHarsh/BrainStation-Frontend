import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import SupportSkeleton from "@/components/skeletons/support";
import PerformerTypeCard from "@/components/support/performer-card";
import { getPredictionsForAllModules } from "@/service/progress";
import { getCompletedTasksCount } from "@/service/task";

function convertToPercentage(score) {
  return Math.min(Math.max(Math.round((score / 100) * 100), 0), 100);
}

function Support() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [parsedUserData, setParsedUserData] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);

  useEffect(() => {
    const fetchData = debounce(async () => {
      try {
        const [predictionsResponse, tasksCountResponse] = await Promise.all([
          getPredictionsForAllModules(),
          getCompletedTasksCount() // Fetch completed tasks count
        ]);

        setParsedUserData(predictionsResponse);
        setCompletedTasksCount(tasksCountResponse.completedTasksCount); // Set completed tasks count
        console.log(predictionsResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, 1000);

    fetchData();

    return () => {
      fetchData.cancel();
    };
  }, [searchParams]);

  if (!parsedUserData) {
    return <SupportSkeleton />;
  }

  const handleModuleClick = (moduleId) => {
    const selected = parsedUserData.modulePredictions.find((module) => module.moduleId === moduleId);
    setSelectedModule(selected);
  };

  const handleNavigate = async () => {
    if (parsedUserData) {
      const taskData = {
        performerType: parsedUserData.performerType,
        strugglingAreas: parsedUserData.lowestTwoChapters.map((chapter) => chapter.chapter)
      };
      navigate("/task", { state: taskData });
    }
  };

  const handleCompletedTasksButtonClick = () => {
    navigate("/completed-tasks", { state: {} });
  };

  const handledashboard = async () => {
    if (parsedUserData) {
      const taskData = {
        performerType: parsedUserData.performerType,
        strugglingAreas: parsedUserData.lowestTwoChapters.map((chapter) => chapter.chapter)
      };
      navigate("/analysis", { state: taskData });
      console.log(taskData);
    }
  };

  return (
    <div className="w-full p-6 space-y-6">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 p-8 rounded-lg  bg-slate-100">
        {/* Left Section */}
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-gray-900">Performance Insights & Study Roadmap</h2>
          <p className="text-lg font-medium text-gray-600 leading-relaxed">
            Empower your learning with tailored insights and actionable steps to reach your full potential.
          </p>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Task Boxes */}
          <div className="flex space-x-8 justify-center">
            <div className="flex flex-col items-center bg-blue-50 p-4 rounded-lg shadow-sm w-32">
              <span className="text-lg font-semibold text-blue-600">Tasks Completed</span>
              <span className="text-4xl font-bold text-blue-900">{completedTasksCount}</span>
            </div>
            <div className="flex flex-col items-center bg-red-50 p-4 rounded-lg shadow-sm w-32">
              <span className="text-lg font-semibold text-red-600">Tasks Remaining</span>
              <span className="text-4xl font-bold text-red-600">5</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex col-span-2 items-center gap-4 w-full mt-2">
          <button
            onClick={handledashboard}
            className="w-[14rem] bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-3 px-10 rounded-full shadow-md transition transform hover:-translate-y-0.5"
          >
            Go To Dashboard
          </button>
          <button
            onClick={handleCompletedTasksButtonClick}
            className="w-[14rem] bg-gradient-to-r  from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white font-semibold py-3 px-8 rounded-full shadow-md transition transform hover:-translate-y-0.5"
          >
            Completed Tasks
          </button>
          <button
            onClick={handleNavigate}
            className="w-[14rem] bg-gradient-to-r from-green-600 to-green-400 hover:from-green-500 hover:to-green-300 text-white font-semibold py-3 px-8 rounded-full shadow-md transition transform hover:-translate-y-0.5"
          >
            Generate Tasks
          </button>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-8 rounded-lg bg-slate-100">
        {/* Left Section: Module List */}
        <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">Module Predictions</h2>
          <div className="overflow-y-auto h-56">
            {parsedUserData.modulePredictions && parsedUserData.modulePredictions.length > 0 ? (
              <div className="space-y-2">
                {parsedUserData.modulePredictions.map((module) => (
                  <button
                    key={module.moduleId}
                    className={`w-full flex items-center justify-between p-4 rounded-md shadow transition-all font-semibold ${
                      selectedModule && selectedModule.moduleId === module.moduleId
                        ? "bg-blue-900 text-white"
                        : "bg-blue-100 text-gray-700 hover:bg-blue-200"
                    }`}
                    onClick={() => handleModuleClick(module.moduleId)}
                  >
                    <span>{module.moduleName}</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No module predictions available.</p>
            )}
          </div>
        </div>

        {/* Right Section: Prediction Score Details */}
        <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
          {selectedModule ? (
            <div>
              <h2 className="text-xl font-extrabold text-blue-900 mb-4">
                {selectedModule.moduleName} - Predicted Score
              </h2>
              {selectedModule.predictedExamScore && !isNaN(selectedModule.predictedExamScore) ? (
                <div className="space-y-4 flex flex-col justify-center h-full">
                  <p className="text-base font-medium text-gray-700">
                    {`Based on your performance, you are likely to score between
              ${convertToPercentage(selectedModule.predictedExamScore) - 5}% - ${
                convertToPercentage(selectedModule.predictedExamScore) + 5
              }% in the next exam.`}
                  </p>

                  {/* Visual Score Range Bar */}
                  <div className="relative h-6 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="absolute h-full bg-gradient-to-r from-green-500 to-green-700"
                      style={{
                        left: `${convertToPercentage(selectedModule.predictedExamScore) - 5}%`,
                        width: "10%"
                      }}
                    ></div>
                  </div>

                  {/* Score Range Indicators */}
                  <div className="flex justify-between text-sm font-semibold text-gray-600">
                    <span>{convertToPercentage(selectedModule.predictedExamScore) - 5}%</span>
                    <span>{convertToPercentage(selectedModule.predictedExamScore) + 5}%</span>
                  </div>

                  {/* About Field */}
                  <div className="flex items-center justify-center gap-2 p-2 mt-4 bg-gray-100 rounded-lg shadow-sm text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                      />
                    </svg>

                    <p className="text-gray-700 font-medium text-lg">
                      About <strong className="text-blue-700">{selectedModule.predictedExamScore}%</strong>
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">No data available for this module yet.</p>
              )}
            </div>
          ) : (
            <p className="text-lg font-semibold text-gray-500">Select a module to view your predicted score.</p>
          )}
        </div>
      </div>

      <div className="p-6 bg-slate-100 rounded-lg shadow-md">
        <h4 className="font-bold text-2xl text-gray-800 mb-6 flex items-center">Struggling Areas</h4>

        {parsedUserData.lowestTwoChapters && parsedUserData.lowestTwoChapters.length > 0 ? (
          <div className="space-y-4">
            {parsedUserData.lowestTwoChapters.map((chapter, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-md flex items-center space-x-4">
                {/* Difficulty Icon */}
                <div className="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-red-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                </div>

                {/* Chapter Info */}
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-700">
                    Struggling with <span className="text-red-600">{chapter.moduleName}</span> in{" "}
                    <span className="text-red-600">{chapter.chapter}</span> Lecture.
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No struggling chapters found.</p>
        )}
      </div>

      <div className="p-6 bg-slate-100 rounded-lg shadow-md">
        <h4 className="font-bold text-2xl text-gray-800 mb-4 flex items-center">Module Performance</h4>

        {/* Highest Performance Module */}
        <div className="p-4 bg-white rounded-lg shadow flex items-center space-x-3 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-yellow-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
          </svg>
          <p className="text-lg font-semibold text-gray-800">
            Highest Performance Module:
            <strong className="text-blue-700"> {parsedUserData.highestScoreModule?.moduleName || "N/A"}</strong>
          </p>
        </div>

        {/* Lowest Performance Module */}
        <div className="p-4 bg-white rounded-lg shadow flex items-center space-x-3  mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-8 text-red-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
            />
          </svg>

          <p className="text-lg font-semibold text-gray-800">
            Lowest Performance Module:
            <strong className="text-red-700"> {parsedUserData.lowestScoreModule?.moduleName || "N/A"}</strong>
          </p>
        </div>
      </div>

      <div className="p-6 bg-slate-100 rounded-lg shadow-md">
        <h4 className="font-bold text-2xl text-gray-800 mb-4 flex items-center">Study Recommendations</h4>

        {parsedUserData.studyRecommendations && parsedUserData.studyRecommendations.length > 0 ? (
          <ul className="space-y-3">
            {/* Remaining Recommendations */}
            {parsedUserData.studyRecommendations.map((rec, index) => (
              <li key={index + 1} className="p-4 bg-white rounded-lg shadow-sm flex items-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 text-blue-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-lg font-medium text-gray-800">{rec}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-left text-lg font-semibold text-gray-600">No recommendations available.</p>
        )}
      </div>

      {/* <div className="p-4 bg-white shadow-md rounded-lg border-l-4 border-blue-400">
        <h4 className="font-bold text-2xl text-black-900 mb-4">Performer Type</h4>
        <p className="text-lg font-bold text-blue-900">
          <strong className="text-red-700">{parsedUserData.performerType}</strong>
        </p>
        <div className="flex space-x-2 mt-4">
          <button
            className={`font-bold py-2 px-4 rounded-md ${
              parsedUserData.performerType === "Excellent Performer"
                ? "bg-blue-900 text-white"
                : "bg-blue-300 text-gray-700"
            }`}
          >
            Excellent
          </button>

          <button
            className={`font-bold py-2 px-4 rounded-md ${
              parsedUserData.performerType === "Medium Performer"
                ? "bg-blue-900 text-white"
                : "bg-blue-300 text-gray-700"
            }`}
          >
            Medium
          </button>

          <button
            className={`font-bold py-2 px-4 rounded-md ${
              parsedUserData.performerType === "Low Performer" ? "bg-blue-900 text-white" : "bg-blue-300 text-gray-700"
            }`}
          >
            Low
          </button>
        </div>
      </div> */}
      <PerformerTypeCard performerType={parsedUserData.performerType} />
    </div>
  );
}

export default Support;
