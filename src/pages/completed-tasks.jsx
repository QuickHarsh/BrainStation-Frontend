import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCompletedTasksByUserIdController } from "@/service/task";

function CompletedTasks() {
  const navigate = useNavigate(); // For navigation
  const [completedSubtasks, setCompletedSubtasks] = useState([]); // State for completed subtasks
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch completed subtasks using the token to get user ID automatically
  useEffect(() => {
    const fetchCompletedSubtasks = async () => {
      try {
        // Proceed with the API request if the token exists
        const response = await getCompletedTasksByUserIdController();
        console.log(response);
        setCompletedSubtasks(response.completedTasks); // Store the completed tasks
      } catch (err) {
        setError(err.response?.data?.message || err.message); // Catch and set the error message
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchCompletedSubtasks(); // Fetch the tasks when the component mounts
  }, []); // Empty dependency array to run once on mount

  if (loading) return <div>Loading completed subtasks...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="flex h-screen flex-col items-center justify-between p-6 bg-gray-100">
      <div className="w-full md:w-3/4 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Completed Subtasks</h2>

        {/* Check if there are any completed subtasks */}
        {completedSubtasks.length > 0 ? (
          <div className="space-y-6">
            {/* Map through the completed subtasks and render each one */}
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

        {/* Back button to navigate to the previous page */}
        <button
          className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md mt-6"
          onClick={() => navigate("/")} // Navigate back to home or previous page
        >
          Go Back
        </button>
      </div>
    </main>
  );
}

export default CompletedTasks;
