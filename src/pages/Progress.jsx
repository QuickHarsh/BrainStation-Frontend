// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);
// function Progress() {
//   const navigate = useNavigate();
//   const [studentId, setStudentId] = useState(""); // Only store Student ID
//   const [isLoading, setIsLoading] = useState(false); // State to handle loading status
//   const [errorMessage, setErrorMessage] = useState(""); // Error handling
//   // Handle changes in the Student ID input field
//   const handleChange = (e) => {
//     setStudentId(e.target.value);
//   };
//   // Handle form submission to fetch student data
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true); // Start loading
//     setErrorMessage(""); // Reset error message
//     try {
//       // Fetch student data based on the Student_ID
//       const response = await fetch(`http://localhost:3000/api/progress/student/${studentId}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json"
//         }
//       });
//       if (!response.ok) {
//         throw new Error("Failed to fetch student data.");
//       }
//       const studentData = await response.json(); // Fetched student data
//       // Now submit the form data to get predictions
//       const predictionResponse = await fetch("http://localhost:3000/api/progress/predict", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ Student_id: studentData.Student_ID }) // Use fetched Student_ID for prediction
//       });
//       if (!predictionResponse.ok) {
//         throw new Error("Failed to get prediction.");
//       }
//       const predictionResult = await predictionResponse.json();
//       const query = {
//         predicted_exam_score: predictionResult.predicted_exam_score,
//         task_group: predictionResult.task_group,
//         performer_type: predictionResult.Performer_Type,
//         tasks: JSON.stringify(predictionResult.tasks),
//         lowest_two_chapters: predictionResult.lowest_two_chapters
//       };
//       // Navigate with prediction result
//       navigate(`/support?userData=${encodeURIComponent(JSON.stringify(query))}`);
//     } catch (error) {
//       console.error("Error:", error);
//       setErrorMessage(error.message ||"Failed to fetch student data or prediction. Please try again.");
//     } finally {
//       setIsLoading(false); // Stop loading
//     }
//   };
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div className="w-1/2 bg-gray-200 p-4 rounded-lg shadow-lg">
//         <h1>Enter Student ID to Fetch Data and Predict Performance</h1>
//         <form onSubmit={handleSubmit}>
//           <label className="block mb-2 text-lg font-medium">Student ID:</label>
//           <input
//             type="text"
//             value={studentId}
//             onChange={handleChange}
//             className="border px-3 py-2 mb-4 w-full"
//             required
//           />
//           {errorMessage && <div className="text-red-500">{errorMessage}</div>}
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
//             disabled={isLoading}
//           >
//             {isLoading ? "Loading..." : "Submit"}
//           </button>
//         </form>
//       </div>
//     </main>
//   );
// }
// export default Progress;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Progress() {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState(""); // State to store Student ID
  const [isLoading, setIsLoading] = useState(false); // State for loading status
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  // Handle input change for Student ID
  const handleChange = (e) => {
    setStudentId(e.target.value);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setErrorMessage("");

  //   try {
  //     // Fetch student data from the backend
  //     const studentResponse = await fetch(`http://localhost:3000/api/progress/student/${studentId}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     });

  //     if (!studentResponse.ok) {
  //       throw new Error("Failed to fetch student data.");
  //     }

  //     const studentData = await studentResponse.json(); // Successfully fetched student data
  //     console.log("Fetched Student Data:", studentData);  // Log student data

  //     // Now fetch the prediction data using the correct Student ID from studentData.data
  //     console.log("Sending Student ID:", { Student_id: studentData.data.Student_ID });

  //     const predictionResponse = await fetch("http://localhost:3000/api/progress/predict", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ Student_id: studentData.data.Student_ID }) // Send the fetched student ID
  //     });

  //     if (!predictionResponse.ok) {
  //       const errorResponse = await predictionResponse.json(); // Log response if error occurs
  //       console.error("Prediction Error Response:", errorResponse);
  //       throw new Error("Failed to get prediction.");
  //     }

  //     const predictionResult = await predictionResponse.json(); // Successfully fetched prediction result
  //     console.log("Fetched Prediction Data:", predictionResult);

  //     // Create a query object to pass prediction result to the support page
  //     const query = {
  //       predicted_exam_score: predictionResult.predicted_exam_score,
  //       lowest_two_chapters: predictionResult.lowest_two_chapters,
  //       performer_type: predictionResult.performer_type,
  //       tasks: predictionResult.tasks
  //     };

  //     // Navigate to the support page with the query data
  //     navigate(`/support?userData=${encodeURIComponent(JSON.stringify(query))}`);
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setErrorMessage(error.message || "Failed to fetch student data or prediction.");
  //   } finally {
  //     setIsLoading(false); // Stop loading state
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      // Fetch student data
      const studentResponse = await fetch(`http://localhost:3000/api/progress/student/${studentId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!studentResponse.ok) {
        throw new Error("Failed to fetch student data.");
      }

      const studentData = await studentResponse.json(); // Fetched student data
      console.log("Fetched Student Data:", studentData);

      // Fetch prediction data
      const predictionResponse = await fetch("http://localhost:3000/api/progress/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ Student_id: studentData.data.Student_ID }) // Send Student_ID
      });

      if (!predictionResponse.ok) {
        throw new Error("Failed to get prediction.");
      }

      const predictionResult = await predictionResponse.json(); // Fetched prediction data
      console.log("Fetched Prediction Data:", predictionResult);

      // Prepare query object to pass to Support.jsx
      const query = {
        predicted_exam_score: predictionResult.data.predicted_exam_score,
        lowest_two_chapters: predictionResult.data.lowest_two_chapters,
        performer_type: predictionResult.data.performer_type,
        tasks: predictionResult.data.tasks
      };

      // Use encodeURIComponent to ensure safe passing of data via URL
      navigate(`/support?userData=${encodeURIComponent(JSON.stringify(query))}`);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message || "Failed to fetch student data or prediction.");
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
