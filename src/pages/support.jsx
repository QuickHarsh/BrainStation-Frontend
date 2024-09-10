import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

// Registering chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Function to convert score to percentage
function convertToPercentageRange(predicted_exam_score, min_percentage, max_percentage) {
  const min_score = 0;
  const max_score = 100;

  const percentage =
    min_percentage + ((predicted_exam_score - min_score) / (max_score - min_score)) * (max_percentage - min_percentage);

  return percentage;
}

function Support() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Hook for query parameters
  let parsedUserData = null;

  try {
    const userData = searchParams.get("userData");
    if (userData) {
      console.log("Raw userData:", userData);
      parsedUserData = JSON.parse(decodeURIComponent(userData)); // Parsing the query param
      console.log("Parsed userData:", parsedUserData);
    }
  } catch (error) {
    console.error("Error parsing userData:", error);
  }

  // If userData is missing or invalid, display a fallback message
  if (!parsedUserData) {
    return (
      <div>
        <h2>Error: No valid data found.</h2>
        <p>Please make sure the URL contains valid user data.</p>
      </div>
    );
  }

  const predicted_exam_score = parsedUserData?.predicted_exam_score;
  const min_percentage = 0;
  const max_percentage = 100;

  // Handle case where predicted_exam_score is missing
  if (typeof predicted_exam_score === "undefined") {
    return (
      <div>
        <h2>Error: Missing exam score data.</h2>
        <p>Please make sure the user data contains a valid exam score.</p>
      </div>
    );
  }

  const convertedPercentage = convertToPercentageRange(predicted_exam_score, min_percentage, max_percentage).toFixed(0);

  // Handle case where tasks are missing or invalid
  const tasks = parsedUserData?.tasks ? JSON.parse(parsedUserData.tasks) : [];
  console.log("Parsed tasks:", tasks);

  // State to manage the completed status of each task
  const [completedTasks, setCompletedTasks] = useState(tasks.map(() => false));

  // Function to handle checkbox change
  const handleCheckboxChange = (index) => {
    const updatedTasks = [...completedTasks];
    updatedTasks[index] = !updatedTasks[index]; // Toggle the task completion status
    setCompletedTasks(updatedTasks);
  };

  // Chart data and options
  const data = {
    labels: ["Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4", "Quiz 5"],
    datasets: [
      {
        label: "Quiz Scores",
        data: [55, 60, 65, 70, 75],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Quiz Performance",
      },
    },
  };

  const pieData = {
    labels: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5"],
    datasets: [
      {
        label: "Chapter Fluency/Performance",
        data: [20, 15, 25, 10, 30],
        backgroundColor: [
          "rgba(255, 215, 0, 0.7)",
          "rgba(0, 0, 139, 0.7)",
          "rgba(255, 215, 0, 0.7)",
          "rgba(0, 0, 139, 0.7)",
          "rgba(0, 0, 139, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Chapter Fluency/Performance",
      },
    },
  };

  const handleGoToAnalysis = () => {
    navigate("/analysis");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      <div className="flex h-screen">
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-gray-200 p-4">
          <div className="p-5 bg-white border rounded-xl flex flex-col">
            <span className="font-mono font-black text-2xl">Prediction of Academic Performance:</span>
            <span className="font-mono font-black text-blue-700 text-xl">
              Based on your recent quiz scores and focus levels, you are likely to{" "}
              <span className="text-red-800">
                score between {convertedPercentage - 5} - {convertedPercentage}{" "}
              </span>
              % on the upcoming midterm exam
            </span>
            <br />
            <span className="font-mono font-black text-2xl">Identification of Struggling Areas:</span>
            <span className="font-mono font-black text-blue-700 text-xl">
              You are showing difficulty in 'Chapter 4: Data Structures'. Your performance has been below average in this section
            </span>
            <br />
            <span className="font-mono font-black text-2xl">Predictive Categorization:</span>
            <span className="font-mono font-black text-blue-700 text-xl">
              You are categorized as a <span className="text-red-800">'{parsedUserData.performer_type}' </span> in this course.
            </span>
            <br />
          </div>

          <div className="p-0 bg-blue-100 border rounded-xl flex flex-col">
            {/* Bar Chart Section */}
          {/*  <div className="flex-1 bg-gray-100 p-4">
              <Bar data={data} options={options} />
            </div>*/}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex flex-col">
          <span className="font-mono font-black text-2xl">Recommendation Task for Personalized Learning</span>
          <ul className="font-mono text-blue-900 text-xl">
            {tasks.map((task, index) => (
              <li key={index}>
                <br />
                <input
                  type="checkbox"
                  checked={completedTasks[index]}
                  onChange={() => handleCheckboxChange(index)}
                  className="mr-2"
                />
                {task}
              </li>
            ))}
          </ul>
          
          <div className="flex-1 bg-gray-100 p-4 h-20 justify-center items-center">
            <div className="flex flex-row w-80">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
          
          <button
          
            onClick={handleGoToAnalysis}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 mt-4"
          >
            Go to Analysis
          </button>
        </div>
      </div>
    </main>
  );
}

export default Support;
