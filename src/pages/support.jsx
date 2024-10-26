import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPredictionsForAllModules } from "@/service/progress";

function cleanDescription(description) {
  const unwantedWords = ["Sure!", "!", "'"];
  let cleanedDescription = description;
  unwantedWords.forEach((word) => {
    cleanedDescription = cleanedDescription.replace(word, "");
  });
  return cleanedDescription.trim();
}

function convertToPercentage(score) {
  return Math.min(Math.max(Math.round((score / 100) * 100), 0), 100);
}

function Support() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [parsedUserData, setParsedUserData] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPredictionsForAllModules();
        setParsedUserData(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching prediction data:", error);
      }
    };
    fetchData();
  }, [searchParams]);

  if (!parsedUserData) {
    return <p>Loading...</p>;
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
    <main className="flex h-screen flex-col items-center justify-between p-10 bg-white">
      <div className="w-full md:w-3/4 bg-white shadow-lg rounded-lg p-6 space-y-6">
        <div className="flex justify-between items-start bg-blue-200 p-4 rounded-md border-b-4 border-yellow-500 shadow-lg">
          <div>
            <h2 className="text-4xl font-extrabold text-blue-900">Welcome back!</h2>
            <p className="text-2xl font-bold text-blue-700">
              Remember, consistency is key. Stay focused, and keep improving your results. Your next goal is within
              reach!
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="flex space-x-6">
              <div className="text-center">
                {/*   <span className="block text-3xl font-bold text-blue-900">Task completed</span>
                <span className="block text-5xl font-extrabold text-blue-900">20</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-bold text-blue-900">Task remaining</span>
                <span className="block text-5xl font-extrabold text-red-700">5</span>*/}
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleCompletedTasksButtonClick}
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-5 rounded-md text-xl"
              >
                Completed Tasks
              </button>
              <button
                onClick={handleNavigate}
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-5 rounded-md text-xl"
              >
                Generate Tasks
              </button>
            </div>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-md mt-2 text-xl"
              onClick={handledashboard}
            >
              Go To Dashboard
            </button>
          </div>
        </div>

        {/* Module Predictions */}
        <div className="p-6 bg-white shadow-md rounded-lg border-l-4 border-blue-400">
          <h4 className="text-3xl font-bold text-black mb-6">Module Predictions</h4>
          {parsedUserData.modulePredictions && parsedUserData.modulePredictions.length > 0 ? (
            <div className="flex flex-wrap space-x-2">
              {parsedUserData.modulePredictions.map((module) => (
                <button
                  key={module.moduleId}
                  className={`font-bold py-3 px-4 rounded-md m-2 ${
                    selectedModule && selectedModule.moduleId === module.moduleId
                      ? "bg-blue-900 text-white"
                      : "bg-blue-300 text-gray-700"
                  }`}
                  onClick={() => handleModuleClick(module.moduleId)}
                >
                  {module.moduleName}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-lg text-gray-700">No module predictions available.</p>
          )}
        </div>

        {/* Selected Module Details */}
        {selectedModule && (
          <div className="p-6 bg-white shadow-md rounded-lg">
            <p className="text-2xl font-semibold text-blue-900">
              {selectedModule.predictedExamScore && !isNaN(selectedModule.predictedExamScore) ? (
                <>
                  Based on your quiz scores so far, if the next exam covers these chapters, you likely to score between{" "}
                  <strong className="text-red-600 font-medium">
                    {convertToPercentage(selectedModule.predictedExamScore) - 5}% -{" "}
                    {convertToPercentage(selectedModule.predictedExamScore)}%
                  </strong>
                  .
                </>
              ) : (
                "You haven't completed any lectures in this module."
              )}
            </p>
          </div>
        )}

        {/* Struggling Areas */}
        <div className="p-6 bg-white shadow-md rounded-lg border-l-4 border-red-400">
          <h4 className="text-3xl font-bold text-black mb-6">Struggling Areas</h4>
          {parsedUserData.lowestTwoChapters && parsedUserData.lowestTwoChapters.length > 0 ? (
            <div>
              {parsedUserData.lowestTwoChapters.map((chapter, index) => (
                <div key={index} className="mb-6">
                  <p className="text-2xl font-semibold text-blue-900">
                    You are showing difficulty in{" "}
                    <strong className="text-red-600 font-medium">{chapter.moduleName}</strong> especially in{" "}
                    <strong className="text-red-600 font-medium">{chapter.chapter}</strong> Lecture.
                  </p>
                  <div className="mt-4 p-4 bg-gray-100 shadow rounded-md">
                    <p className="font-semibold text-lg text-black">{cleanDescription(chapter.chapterDescription)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-lg text-gray-700">No struggling chapters found.</p>
          )}
        </div>

        {/* Module Performance */}
        <div className="p-6 bg-white shadow-md rounded-lg border-l-4 border-yellow-400">
          <h4 className="text-3xl font-bold text-black mb-6">Module Performance</h4>
          <p className="text-2xl font-semibold text-blue-900">
            Highest Performance Module 🌟:{" "}
            <strong className="text-blue-600 font-medium">
              {parsedUserData.highestScoreModule?.moduleName || "N/A"}
            </strong>
          </p>
          <p className="text-2xl font-semibold text-blue-900">
            Lowest Performance Module 💪:{" "}
            <strong className="text-red-600 font-medium">
              {parsedUserData.lowestScoreModule?.moduleName || "N/A"}
            </strong>
          </p>
        </div>

        {/* Study Recommendations */}
        <div className="p-6 bg-white shadow-md rounded-lg border-l-4 border-green-400">
          <h4 className="text-3xl font-bold text-black mb-6">Study Recommendations</h4>
          {parsedUserData.studyRecommendations && parsedUserData.studyRecommendations.length > 0 ? (
            <ul className="pl-5 list-disc">
              {parsedUserData.studyRecommendations.map((rec, index) => (
                <li key={index} className="text-2xl font-semibold text-blue-900">
                  {rec}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lg text-gray-700">No recommendations available.</p>
          )}
        </div>

        {/* Performer Type */}
        <div className="p-6 bg-white shadow-md rounded-lg border-l-4 border-blue-400">
          <h4 className="text-3xl font-bold text-black mb-6">Performer Type</h4>
          <p className="text-2xl font-semibold text-blue-900">
            <strong className="text-red-600 font-medium">{parsedUserData.performerType}</strong>
          </p>
          <div className="flex space-x-4 mt-4">
            <button
              className={`font-bold py-3 px-6 rounded-md ${
                parsedUserData.performerType === "Excellent Performer"
                  ? "bg-blue-900 text-white"
                  : "bg-blue-300 text-gray-700"
              }`}
            >
              Excellent
            </button>
            <button
              className={`font-bold py-3 px-6 rounded-md ${
                parsedUserData.performerType === "Medium Performer"
                  ? "bg-blue-900 text-white"
                  : "bg-blue-300 text-gray-700"
              }`}
            >
              Medium
            </button>
            <button
              className={`font-bold py-3 px-6 rounded-md ${
                parsedUserData.performerType === "Low Performer"
                  ? "bg-blue-900 text-white"
                  : "bg-blue-300 text-gray-700"
              }`}
            >
              Low
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Support;
