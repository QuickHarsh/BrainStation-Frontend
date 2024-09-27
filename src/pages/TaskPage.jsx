import React from "react";
import { useLocation } from "react-router-dom";

const TaskPage = () => {
  const location = useLocation();
  const { tasks } = location.state || {}; // Retrieve tasks passed from the Support page

  if (!tasks || tasks.length === 0) {
    return <div>No tasks found.</div>;
  }

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Weekly Tasks</h1>

        {tasks.map((task, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">{task.task}</h2>

            <ul className="list-disc list-inside text-gray-700">
              {task.subTasks.map((subTask, subIndex) => (
                <li key={subIndex} className="mb-2">
                  {subTask.includes("http") ? (
                    <a href={subTask} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      {subTask}
                    </a>
                  ) : (
                    subTask
                  )}
                </li>
              ))}
            </ul>

            {task.timeEstimate && (
              <p className="text-sm text-gray-600 mt-2">Estimated time: {task.timeEstimate}</p>
            )}
          </div>
        ))}

        <button
          className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </main>
  );
};

export default TaskPage;
