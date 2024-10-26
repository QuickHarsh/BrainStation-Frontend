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
                {/*   <span className="block text-2xl font-bold text-blue-900">Task completed</span>
                <span className="block text-4xl font-extrabold text-blue-900">20</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-bold text-blue-900">Task remaining</span>
                <span className="block text-4xl font-extrabold text-red-700">5</span>*/}
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleCompletedTasksButtonClick}
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md text-lg"
              >
                Completed Tasks
              </button>
              <button
                onClick={handleNavigate}
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md text-lg"
              >
                Generate Tasks
              </button>
            </div>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-md mt-2 text-lg"
              onClick={handledashboard}
            >
              Go To Dashboard
            </button>
          </div>
        </div>

        <div className="p-4 bg-white shadow-md rounded-lg border-l-4 border-blue-400">
          <h4 className="font-bold text-2xl text-black-900 mb-4">Module Predictions</h4>
          {parsedUserData.modulePredictions && parsedUserData.modulePredictions.length > 0 ? (
            <div className="flex flex-wrap">
              {parsedUserData.modulePredictions.map((module) => (
                <button
                  key={module.moduleId}
                  className={`font-bold py-2 px-4 rounded-md m-2 ${
                    selectedModule && selectedModule.moduleId === module.moduleId
                      ? "font-bold bg-blue-900 text-white"
                      : "font-bold bg-blue-300 text-gray-700"
                  }`}
                  onClick={() => handleModuleClick(module.moduleId)}
                >
                  {module.moduleName}
                </button>
              ))}
            </div>
          ) : (
            <p>No module predictions available.</p>
          )}
        </div>

        {selectedModule && (
          <div className="p-4 bg-white shadow-md rounded-lg">
            <p className="text-lg font-bold text-blue-900">
              {selectedModule.predictedExamScore && !isNaN(selectedModule.predictedExamScore) ? (
                <>
                  Based on your quiz scores so far, if the next exam covers these chapters, you&apos;re likely to
                  <strong className="text-red-700">
                    {" "}
                    score between {convertToPercentage(selectedModule.predictedExamScore) - 5}% -{" "}
                    {convertToPercentage(selectedModule.predictedExamScore)}%
                  </strong>
                  .
                </>
              ) : (
                "You&apos;re not done any lectures in this module."
              )}
            </p>
          </div>
        )}

        <div className="p-4 bg-white shadow-md rounded-lg border-l-4 border-red-400">
          <h4 className="font-bold text-2xl text-black-900 mb-4">Struggling Areas</h4>
          {parsedUserData.lowestTwoChapters && parsedUserData.lowestTwoChapters.length > 0 ? (
            <div>
              {parsedUserData.lowestTwoChapters.map((chapter, index) => (
                <div key={index} className="mb-6">
                  <p className="text-lg font-bold text-blue-900">
                    You are showing difficulty in <strong className="text-red-700">{chapter.moduleName}</strong>{" "}
                    especially in <strong className="text-red-700">{chapter.chapter}</strong> Lecture.
                  </p>
                  <div className="mt-4 p-4 bg-gray-200 shadow rounded-md">
                    <p>{cleanDescription(chapter.chapterDescription)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No struggling chapters found.</p>
          )}
        </div>

        <div className="p-4 bg-white shadow-md rounded-lg border-l-4 border-yellow-400">
          <h4 className="font-bold text-2xl text-black-900 mb-4">Module Performance</h4>
          <p className="text-lg font-bold text-blue-900">
            Highest Performance Module 🌟:{" "}
            <strong className="text-blue-700">{parsedUserData.highestScoreModule?.moduleName || "N/A"}</strong>
          </p>
          <p className="text-lg font-bold text-blue-900">
            Lowest Performance Module 💪:{" "}
            <strong className="text-red-700">{parsedUserData.lowestScoreModule?.moduleName || "N/A"}</strong>
          </p>
        </div>

        <div className="p-4 bg-white shadow-md rounded-lg border-l-4 border-green-400">
          <h4 className="font-bold text-2xl text-black-900 mb-4">Study Recommendations</h4>
          {parsedUserData.studyRecommendations && parsedUserData.studyRecommendations.length > 0 ? (
            <ul className="pl-5 list-none">
              <li className="text-lg font-bold text-blue-900">
                <span>Study for: </span>
                <span className="font-bold text-red-600">{parsedUserData.studyRecommendations[0]}</span>
              </li>
              {parsedUserData.studyRecommendations.slice(1).map((rec, index) => (
                <li key={index + 1} className="text-lg font-bold text-blue-900">
                  {rec}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-left text-lg font-bold text-blue-900">No recommendations available.</p>
          )}
        </div>

        <div className="p-4 bg-white shadow-md rounded-lg border-l-4 border-blue-400">
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
