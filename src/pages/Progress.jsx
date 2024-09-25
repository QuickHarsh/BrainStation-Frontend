import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Progress() {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState(""); // Only store Student ID
  const [isLoading, setIsLoading] = useState(false); // State to handle loading status
  const [errorMessage, setErrorMessage] = useState(""); // Error handling

  // Handle changes in the Student ID input field
  const handleChange = (e) => {
    setStudentId(e.target.value);
  };

  // Handle form submission to fetch student data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setErrorMessage(""); // Reset error message

    try {
      // Fetch student data based on the Student_ID
      const response = await fetch(`http://localhost:8001/student/${studentId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch student data.");
      }

      const studentData = await response.json(); // Fetched student data

      // Now submit the form data to get predictions
      const predictionResponse = await fetch("http://localhost:8001/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ Student_id: studentData.Student_ID }) // Use fetched Student_ID for prediction
      });

      const predictionResult = await predictionResponse.json();

      const query = {
        predicted_exam_score: predictionResult.predicted_exam_score,
        task_group: predictionResult.task_group,
        performer_type: predictionResult.Performer_Type,
        tasks: JSON.stringify(predictionResult.tasks),
        lowest_two_chapters: predictionResult.lowest_two_chapters
      };

      // Navigate with prediction result
      navigate(`/support?userData=${encodeURIComponent(JSON.stringify(query))}`);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to fetch student data or prediction. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-1/2 bg-gray-200 p-4 rounded-lg shadow-lg">
        <h1>Enter Student ID to Fetch Data and Predict Performance</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-lg font-medium">Student ID:</label>
          <input
            type="text"
            value={studentId}
            onChange={handleChange}
            className="border px-3 py-2 mb-4 w-full"
            required
          />

          {errorMessage && <div className="text-red-500">{errorMessage}</div>}

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default Progress;
