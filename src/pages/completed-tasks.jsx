import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function CompletedTasks() {
  const navigate = useNavigate();
  const location = useLocation();
  const taskId = location.state?.taskId || ""; // Retrieve taskId from the previous page's state
  const studentId = location.state?.studentId || ""; // Retrieve studentId from the previous page's state

  const [completedSubtasks, setCompletedSubtasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch completed subtasks from the backend using taskId and studentId
  useEffect(() => {
    if (!taskId || !studentId) {
      setError("No valid task or student ID provided.");
      setLoading(false);
      return;
    }

    const fetchCompletedSubtasks = async () => {
      try {
        // Ensure the correct taskId and studentId are passed in the API call
        const response = await axios.get(`http://localhost:3000/api/progress/completed-tasks/${taskId}`, {
          params: { studentId } // Send studentId as a query parameter
        });

        if (response.status === 200 && response.data.completedTasks) {
          setCompletedSubtasks(response.data.completedTasks); // Store the completed tasks
        } else {
          throw new Error("No completed subtasks found.");
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedSubtasks(); // Trigger the fetch on component mount
  }, [taskId, studentId]);

  if (loading) return <div>Loading completed subtasks...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="flex h-screen flex-col items-center justify-between p-6 bg-gray-100">
      <div className="w-full md:w-3/4 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Completed Subtasks</h2>

        {completedSubtasks.length > 0 ? (
          <div className="space-y-6">
            {completedSubtasks.map((subtask, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg">
                <h3 className="text-xl font-bold text-blue-900 mb-2">{subtask.completedSubtask.task}</h3>
                <p className="text-gray-700">{subtask.completedSubtask.subTask}</p>
                <p className="text-sm text-gray-500">Completed on: {new Date(subtask.completedAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No completed subtasks yet.</p>
        )}

        <button
          className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md mt-6"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>
    </main>
  );
}

export default CompletedTasks;
