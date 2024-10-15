import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Progress() {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({
    Student_id: "19",
    Emotional_State: "",
    Time_Spent_Studying: "",
    Focus_Level: "",
    Cumulative_Average_Quiz_Score: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(studentData)
      });
      const result = await response.json();
      const query = {
        predicted_exam_score: result.predicted_exam_score,
        task_group: result.task_group,
        performer_type: result.Performer_Type,
        tasks: JSON.stringify(result.tasks)
      };
      console.log(result);

      navigate(`/support?userData=${encodeURIComponent(JSON.stringify(query))}`); // Updated path to /support
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-1/2 bg-gray-200 p-4 rounded-lg shadow-lg">
        <div className="w-full">
          <h1>
            <div className="font-medium">Assume these are the realtime data ..</div>
          </h1>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-lg font-medium">Emotional State:</label>
              <input
                type="text"
                name="Emotional_State"
                value={studentData.Emotional_State}
                onChange={handleChange}
                className="border px-3 py-2 mb-4 w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-medium">Time Spent Studying:</label>
              <input
                type="text"
                name="Time_Spent_Studying"
                value={studentData.Time_Spent_Studying}
                onChange={handleChange}
                className="border px-3 py-2 mb-4 w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-medium">Focus Level (1-100):</label>
              <input
                type="number"
                name="Focus_Level"
                value={studentData.Focus_Level}
                onChange={handleChange}
                className="border px-3 py-2 mb-4 w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-medium">Cumulative Average Quiz Score:</label>
              <input
                type="number"
                name="Cumulative_Average_Quiz_Score"
                value={studentData.Cumulative_Average_Quiz_Score}
                onChange={handleChange}
                className="border px-3 py-2 mb-4 w-full"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Progress;
