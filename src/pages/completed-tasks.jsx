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
        setCompletedSubtasks(response.completedTasks);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchCompletedSubtasks();
  }, []);

  const toggleTaskExpansion = (index) => {
    setExpandedTask(expandedTask === index ? null : index);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-blue-600 font-semibold text-lg">
        Loading completed subtasks...
      </div>
    );

  if (error) return <div className="text-red-500 font-semibold text-center">{error}</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-3xl p-6">
        <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Completed Tasks</h2>

        {completedSubtasks.length > 0 ? (
          <div className="space-y-6">
            {completedSubtasks.map((subtask, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:scale-[1.02]"
              >
                <div
                  className="flex justify-between relative w-full items-center px-4 py-5 bg-blue-50 hover:bg-blue-100 cursor-pointer transition"
                  onClick={() => toggleTaskExpansion(index)}
                >
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="accent-blue-600" checked readOnly />
                    <h3 className="text-lg font-semibold text-blue-800">{subtask.completedSubtask.task}</h3>
                  </div>
                  <div className="text-sm font-medium absolute right-12 text-gray-500">
                    {new Date(subtask.completedAt).toLocaleDateString()}
                  </div>
                  <span className="ml-2 text-gray-400 text-lg">{expandedTask === index ? "▼" : "▶"}</span>
                </div>

                {expandedTask === index && (
                  <div className="p-5 bg-gray-50 border-t border-gray-200 space-y-4">
                    <p className="text-gray-800 text-md">{subtask.completedSubtask.subTask}</p>
                    <div className="bg-yellow-50 p-4 rounded-md shadow-inner">
                      <p className="text-gray-700 font-medium">Recommendations:</p>
                      <p className="text-gray-700 mt-2">Focus on past papers from the last 3 years, particularly:</p>
                      <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                        <li>Chapter 4: Data Structures</li>
                        <li>Chapter 2: Introduction to Algorithms</li>
                      </ul>
                      <p className="mt-2 font-medium text-gray-700">
                        Specifically, practice the <span className="text-blue-800">Binary Trees</span> section.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg font-medium text-gray-600 mt-4">No completed subtasks yet.</p>
        )}

        <button
          className="mt-10 flex items-center justify-center w-40 mx-auto bg-blue-600 text-white font-bold py-2.5 px-4 rounded-lg shadow-md hover:bg-blue-500 transition-all duration-300 transform hover:-translate-y-1"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </main>
  );
}

export default CompletedTasks;
