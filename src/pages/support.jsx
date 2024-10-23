import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPredictionsForAllModules } from "@/service/progress";

// Adjust the path if needed

// Function to clean up descriptions by removing unwanted phrases
function cleanDescription(description) {
  const unwantedWords = ["Sure!", "!", "'"];
  let cleanedDescription = description;
  unwantedWords.forEach((word) => {
    cleanedDescription = cleanedDescription.replace(word, "");
  });
  return cleanedDescription.trim();
}

function Support() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [parsedUserData, setParsedUserData] = useState(null); // Store parsed user data
  const [selectedModule, setSelectedModule] = useState(null); // Store the selected module for prediction display

  // Function to fetch prediction data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPredictionsForAllModules();
        setParsedUserData(response); // Save fetched data
        console.log(response);
      } catch (error) {
        console.error("Error fetching prediction data:", error);
      }
    };
    fetchData();
  }, [searchParams]);

  if (!parsedUserData) {
    return <p>Loading...</p>; // Show loading message while fetching data
  }

  const handleModuleClick = (moduleId) => {
    const selected = parsedUserData.modulePredictions.find((module) => module.moduleId === moduleId);
    setSelectedModule(selected);
  };

  // Handler to display a specific module's prediction
  const handleNavigate = async () => {
    if (parsedUserData) {
      const taskData = {
        performerType: parsedUserData.performerType,
        strugglingAreas: parsedUserData.lowestTwoChapters.map((chapter) => chapter.chapter)
      };
      // const response = await axiosInstance.post("/recommend-task", taskData);
      // console.log("Tasks generated:", response.data);
      navigate("/task", { state: taskData });
    }
  };
  const handleCompletedTasksButtonClick = () => {
    navigate("/completed-tasks", { state: {} });
  };

  return (
    <main className="flex h-screen flex-col items-center justify-between p-10 bg-gray-100">
      <div className="w-full md:w-3/4 bg-white shadow-lg rounded-lg p-6">
        {/* Top Section */}
        <div className="flex justify-between items-start mb-6">
          <div className="bg-blue-100 p-4 rounded-md">
            <h2 className="text-3xl font-bold text-blue-900">Welcome back!</h2>
            <p className="text-xl text-gray-700">
              You&apos;ve reached <strong>80%</strong> of your progress this week! Keep it up and improve your results.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-8">
              <div className="text-center">
                <span className="block text-xl font-semibold text-gray-800">Task completed</span>
                <span className="block text-4xl text-blue-900">20</span>
              </div>
              <div className="text-center">
                <span className="block text-xl font-semibold text-gray-800">Task remaining</span>
                <span className="block text-4xl text-red-700">5</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleCompletedTasksButtonClick}
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md"
              >
                Completed Tasks
              </button>
              <button
                onClick={handleNavigate}
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md"
              >
                Generate Tasks
              </button>
            </div>
            <div className="mt-4">
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-md"
                onClick={() => navigate("/analysis")}
              >
                Go To Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Academic Forecasting Section */}
        <div className="bg-gray-200 p-5 rounded-lg mb-6">
          <h3 className="font-bold text-2xl text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">
            Academic Forecasting
          </h3>

          {/* Academic Performance */}
          <div className="p-4 bg-white rounded-lg mb-4">
            <h4 className="font-semibold text-xl text-gray-800">Module Predictions</h4>
            {parsedUserData.modulePredictions && parsedUserData.modulePredictions.length > 0 ? (
              <div>
                {parsedUserData.modulePredictions.map((module) => (
                  <button
                    key={module.moduleId}
                    className="bg-blue-900 text-white font-bold py-2 px-4 rounded-md m-2"
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

          {/* Show selected module prediction details */}
          {selectedModule && (
            <div className="p-4 bg-white rounded-lg mb-4">
              <h4 className="font-semibold text-xl text-gray-800">Selected Module Prediction</h4>
              <p>
                <strong>Module Name:</strong> {selectedModule.moduleName}
              </p>
              <p>
                <strong>Predicted Exam Score:</strong> {selectedModule.predictedExamScore}
              </p>
            </div>
          )}

          {/* Struggling Areas */}
          <div className="p-4 bg-white rounded-lg mb-4">
            <h4 className="font-semibold text-xl text-gray-800">Struggling Areas</h4>
            {parsedUserData.lowestTwoChapters && parsedUserData.lowestTwoChapters.length > 0 ? (
              <div>
                {parsedUserData.lowestTwoChapters.map((chapter, index) => (
                  <div key={index}>
                    <p>
                      <strong>Chapter:</strong> {chapter.chapter}
                    </p>

                    <p>{cleanDescription(chapter.chapterDescription)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No struggling chapters found</p>
            )}
          </div>

          {/* Highest and Lowest Scoring Modules */}
          <div className="p-4 bg-white rounded-lg mb-4">
            <h4 className="font-semibold text-xl text-gray-800">Highest and Lowest Scoring Modules</h4>
            <p>
              <strong>Highest Scoring Module:</strong> {parsedUserData.highestScoreModule?.moduleName || "N/A"}
            </p>
            <p>
              <strong>Lowest Scoring Module:</strong> {parsedUserData.lowestScoreModule?.moduleName || "N/A"}
            </p>
          </div>

          {/* Study Recommendations */}
          <div className="p-4 bg-white rounded-lg mb-4">
            <h4 className="font-semibold text-xl text-gray-800">Study Recommendations</h4>
            {parsedUserData.studyRecommendations && parsedUserData.studyRecommendations.length > 0 ? (
              <ul>
                {parsedUserData.studyRecommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            ) : (
              <p>No recommendations available.</p>
            )}
          </div>

          {/* Categorization */}
          <div className="p-4 bg-white rounded-lg">
            <h4 className="font-semibold text-xl text-gray-800">Performer Type: {parsedUserData.performerType}</h4>
            <div className="flex space-x-2 mt-4">
              <button className="bg-blue-900 text-white font-bold py-2 px-4 rounded-md">Excellent</button>
              <button className="bg-blue-900 text-white font-bold py-2 px-4 rounded-md">Medium</button>
              <button className="bg-blue-900 text-white font-bold py-2 px-4 rounded-md">Low</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Support;
