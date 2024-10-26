import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCompletedTasks } from "@/service/task";

function CompletedTasks() {
  const navigate = useNavigate();
  const [completedSubtasks, setCompletedSubtasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedTask, setExpandedTask] = useState(null);

  useEffect(() => {
    const fetchCompletedSubtasks = async () => {
      try {
        const response = await getCompletedTasks();
        console.log(response);
        setCompletedSubtasks(response.completedTasks);
        setLoading(false); // Ensure loading is set to false after successful fetch
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false); // Also set loading to false if there's an error
      }
    };

    fetchCompletedSubtasks();
  }, []);

  const toggleTaskExpansion = (index) => {
    setExpandedTask(expandedTask === index ? null : index);
  };

  if (loading) return <div>Loading completed subtasks...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="flex h-screen flex-col items-center justify-between p-6 bg-gray-100">
      <div className="w-full md:w-3/4 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Completed Tasks</h2>

        {completedSubtasks.length > 0 ? (
          <div className="space-y-4">
            {completedSubtasks.map((subtask, index) => (
              <div key={index} className="border border-gray-300 rounded-lg">
                <div
                  className="flex justify-between items-center p-4 bg-blue-100 cursor-pointer"
                  onClick={() => toggleTaskExpansion(index)}
                >
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2" checked={true} readOnly />
                    <h3 className="text-xl font-bold text-blue-900">{subtask.completedSubtask.task}</h3>
                  </div>
                  <p className="text-lg font-bold text-blue-700">
                    {new Date(subtask.completedAt).toLocaleDateString()}
                  </p>
                  <span className="ml-2 text-gray-600">{expandedTask === index ? "▼" : "▶"}</span>
                </div>

                {expandedTask === index && (
                  <div className="p-4 bg-gray-100">
                    <p className="text-gray-700">{subtask.completedSubtask.subTask}</p>
                    <p className="mt-2 text-sm text-gray-600">
                      Focus on past papers from the last 3 years, particularly Chapter 4: Data Structures and Chapter 2:
                      Introduction to Algorithms.
                    </p>
                    <p className="text-sm text-gray-600">
                      Specifically, practice the &quot;Binary Trees&quot; section.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No completed subtasks yet.</p>
        )}

        <button
          className="bg-transparent text-blue-400 font-bold py-1 px-4 rounded-full ml-4 mt-4 flex items-center border border-blue-400 hover:bg-blue-100"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </main>
  );
}

export default CompletedTasks;
