import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCompletedTasks } from "@/service/task";

function CompletedTasks() {
  const navigate = useNavigate(); // For navigation
  const [completedSubtasks, setCompletedSubtasks] = useState([]); // State for completed subtasks
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [expandedTask, setExpandedTask] = useState(null); // For expanding/collapsing tasks

  // Fetch completed subtasks using the token to get user ID automatically
  useEffect(() => {
    const fetchCompletedSubtasks = async () => {
      try {
        // Proceed with the API request if the token exists
        const response = await getCompletedTasks();
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

  // Toggle the expanded/collapsed state of a task
  const toggleTaskExpansion = (index) => {
    setExpandedTask(expandedTask === index ? null : index);
  };

  if (loading) return <div>Loading completed subtasks...</div>;
  if (error) return <div>{error}</div>;

  return (
    
    <main className="flex h-screen flex-col items-center justify-between p-6 bg-gray-100">
      
      <div className="w-full md:w-3/4 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Completed Tasks</h2>

        {/* Check if there are any completed subtasks */}
        {completedSubtasks.length > 0 ? (
          <div className="space-y-4">
            {/* Map through the completed subtasks and render each one */}
            {completedSubtasks.map((subtask, index) => (
              <div key={index} className="border border-gray-300 rounded-lg">
                {/* Task Header */}
                <div
                  className="flex justify-between items-center p-4 bg-blue-100 cursor-pointer"
                  onClick={() => toggleTaskExpansion(index)}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={true} // Assume all tasks are completed
                      readOnly
                    />
                    <h3 className="text-xl font-bold text-blue-900">{subtask.completedSubtask.task}</h3>
                  </div>
                  <p className="text-lg font-bold text-blue-700">{new Date(subtask.completedAt).toLocaleDateString()}</p>
                  <span className="ml-2 text-gray-600">
                    {expandedTask === index ? "▼" : "▶"}
                  </span>
                </div>

                {/* Task Body */}
                {expandedTask === index && (
                  <div className="p-4 bg-gray-100">
                    <p className="text-gray-700">{subtask.completedSubtask.subTask}</p>
                    <p className="mt-2 text-sm text-gray-600">
                      Focus on past papers from the last 3 years, particularly Chapter 4: Data Structures and Chapter 2: Introduction to Algorithms.
                    </p>
                    <p className="text-sm text-gray-600">Specifically, practice the "Binary Trees" section.</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No completed subtasks yet.</p>
        )}

        {/* Back button to navigate to the previous page */}
        <button
          className="bg-transparent text-blue-400 font-bold py-1 px-4 rounded-full ml-4 mt-4 flex items-center border border-blue-400 hover:bg-blue-100"
          onClick={() => navigate(-1)}// Navigate back to home or previous page
        >
          Go Back
        </button>
      </div>
    </main>
  );
}

export default CompletedTasks;
