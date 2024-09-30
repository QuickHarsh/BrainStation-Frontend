import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CompletedTasks() {
  const location = useLocation();
  const navigate = useNavigate();

  // Load completed subtasks from location.state or localStorage as fallback
  const [completedSubtasks, setCompletedSubtasks] = useState(location.state?.completedSubtasks || []);

  // Use effect to check local storage if state is empty
  useEffect(() => {
    if (completedSubtasks.length === 0) {
      const savedSubtasks = JSON.parse(localStorage.getItem("completedSubtasks")) || [];
      setCompletedSubtasks(savedSubtasks);
    }
  }, [completedSubtasks]);

  return (
    <main className="flex h-screen flex-col items-center justify-between p-6 bg-gray-100">
      <div className="w-full md:w-3/4 bg-white shadow-md rounded-lg p-6 relative">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Completed Subtasks</h2>

        {/* Display completed subtasks */}
        {completedSubtasks.length > 0 ? (
          <div className="space-y-6">
            {completedSubtasks.map((subtask, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg">
                <h3 className="text-xl font-bold text-blue-900 mb-2">{subtask.task}</h3>
                <p className="text-gray-700">{subtask.subTask}</p>
                <p className="text-sm text-gray-500">Completed on: {subtask.dateCompleted}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No completed subtasks yet.</p>
        )}

        {/* Go Back Button */}
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
