import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// Function to convert score to percentage
function convertToPercentageRange(predicted_exam_score, min_percentage, max_percentage) {
  const min_score = 0;
  const max_score = 100;
  return (
    min_percentage + ((predicted_exam_score - min_score) / (max_score - min_score)) * (max_percentage - min_percentage)
  );
}

function Support() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  let parsedUserData = null;

  try {
    const userData = searchParams.get("userData");
    if (userData) {
      parsedUserData = JSON.parse(decodeURIComponent(userData)); // Decode and parse user data
      console.log("Parsed User Data:", parsedUserData); // For debugging
    } else {
      console.error("No user data found in query params.");
    }
  } catch (error) {
    console.error("Error parsing userData:", error);
  }

  if (!parsedUserData) {
    return (
      <div>
        <h2>Error: No valid data found.</h2>
        <p>Please make sure the URL contains valid user data.</p>
      </div>
    );
  }

  // Accessing predicted_exam_score correctly
  const predicted_exam_score = parsedUserData?.predicted_exam_score || null;
  console.log("Predicted Exam Score:", predicted_exam_score); // Log predicted_exam_score for debugging

  // Handle converted percentage only if predicted_exam_score exists
  const convertedPercentage = predicted_exam_score
    ? convertToPercentageRange(predicted_exam_score, 0, 100).toFixed(0)
    : "N/A";

  // Accessing lowest_two_chapters correctly as an array
  const lowestChapter1 = parsedUserData?.lowest_two_chapters?.[0]?.chapter || "N/A";
  const lowestChapter2 = parsedUserData?.lowest_two_chapters?.[1]?.chapter || "N/A";
  console.log("Lowest Chapter 1:", lowestChapter1); // Log lowestChapter1 for debugging
  console.log("Lowest Chapter 2:", lowestChapter2); // Log lowestChapter2 for debugging
  const performerType = parsedUserData?.performer_type || "Medium Performer";

  // Redirect Handlers
  const handleGoToDashboard = () => {
    const dashUrl = `/Dashboard?performerType=${encodeURIComponent(performerType)}&chapter1=${encodeURIComponent(
      lowestChapter1
    )}&chapter2=${encodeURIComponent(lowestChapter2)}&studentId=${encodeURIComponent(parsedUserData.studentId)}`;
    navigate(dashUrl); // Navigate to Task.jsx with the necessary data
  }; // Redirect to Analysis page
  const handleCompletedTasks = () => alert("Redirect to Completed Tasks Page");
  // const handleViewTasks = () => {
  //   const updatedUserData = {
  //     ...parsedUserData,
  //     Student_id: parsedUserData?.Student_id || "your_actual_student_id"
  //   };
  //   navigate(`/Task?userData=${encodeURIComponent(JSON.stringify(updatedUserData))}`);
  // };

  // Redirect Handlers
  const handleViewTasks = () => {
    // Pass performer_type and lowest_two_chapters as query parameters
    const taskUrl = `/Task?performerType=${encodeURIComponent(performerType)}&chapter1=${encodeURIComponent(
      lowestChapter1
    )}&chapter2=${encodeURIComponent(lowestChapter2)}&studentId=${encodeURIComponent(parsedUserData.studentId)}`;
    navigate(taskUrl); // Navigate to Task.jsx with the necessary data
  };

  return (
    <main className="flex h-screen flex-col items-center justify-between p-66 bg-gray-100">
      <div className="w-full md:w-3/4 bg-white shadow-md rounded-lg p-6 relative">
        {/* Top Section - Flex layout */}
        <div className="flex justify-between items-start mb-6">
          {/* Welcome Section */}
          <div className="bg-blue-100 p-4 rounded-md">
            <h2 className="text-3xl font-bold text-blue-900">Welcome back!</h2>
            <p className="text-xl text-gray-700">
              You've reached <strong>80%</strong> of your progress this week! Keep it up and improve your results.
            </p>
          </div>

          {/* Task Counters and Buttons */}
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

            {/* Task Buttons (horizontal) */}
            <div className="flex space-x-4">
              <button
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md"
                onClick={handleCompletedTasks}
              >
                Completed Tasks
              </button>
              <button
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md"
                onClick={handleViewTasks}
              >
                View Tasks
              </button>
            </div>

            {/* Dashboard Button (centered below) */}
            <div className="mt-4">
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-md"
                onClick={handleGoToDashboard}
              >
                Go To Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Academic Forecasting Section */}
        <div className="bg-gray-200 p-5 rounded-lg mb-6">
          <h3 className="font-bold text-2xl text-gray-800 mb-2">Academic Forecasting</h3>

          {/* Academic Performance */}
          <div className="p-4 bg-white rounded-lg mb-4">
            <h4 className="font-semibold text-2xl text-gray-800">Academic Performance</h4>
            <p className="text-xl text-gray-700">
              Based on your quiz scores so far, if the next exam covers these chapters, you're likely to
              <strong>
                {" "}
                <span className="text-red-700">
                  score between {convertedPercentage - 5}% - {convertedPercentage}%.
                </span>
              </strong>
            </p>
            <button className="bg-blue-900 text-white font-bold py-2 px-4 rounded-md mt-4">Chapter 1-3</button>
          </div>

          {/* Struggling Areas */}
          <div className="p-4 bg-white rounded-lg mb-4">
            <h4 className="font-semibold text-2xl text-gray-800">Struggling Areas</h4>
            <p className="text-xl text-gray-700">
              You are showing difficulty in <strong>{lowestChapter1}</strong> and <strong>{lowestChapter2}</strong>.
            </p>
            <div className="flex space-x-2 mt-4">
              <button className="bg-blue-900 text-white font-bold py-2 px-4 rounded-md">{lowestChapter1}</button>
              <button className="bg-blue-900 text-white font-bold py-2 px-4 rounded-md">{lowestChapter2}</button>
            </div>
          </div>

          {/* Categorization */}
          <div className="p-4 bg-white rounded-lg">
            <h4 className="font-semibold text-2xl text-gray-800">Categorization</h4>
            <p className="text-xl text-gray-700">
              You are categorized as a{" "}
              <strong>
                <span className="text-red-700">{parsedUserData?.performer_type || "Medium Performer"}</span>
              </strong>
              .
            </p>
            <div className="flex space-x-2 mt-4">
              <button
                className={`py-2 px-4 rounded-md ${
                  parsedUserData.performer_type === "Excellent Performer"
                    ? "bg-blue-900 text-white font-bold"
                    : "bg-blue-200 text-gray-800 font-bold"
                }`}
              >
                Excellent
              </button>
              <button
                className={`py-2 px-4 rounded-md ${
                  parsedUserData.performer_type === "Medium Performer"
                    ? "bg-blue-900 text-white font-bold"
                    : "bg-blue-200 text-gray-800 font-bold"
                }`}
              >
                Medium
              </button>
              <button
                className={`py-2 px-4 rounded-md ${
                  parsedUserData.performer_type === "Low Performer"
                    ? "bg-blue-900 text-white font-bold"
                    : "bg-blue-200 text-gray-800 font-bold"
                }`}
              >
                Low
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Support;
