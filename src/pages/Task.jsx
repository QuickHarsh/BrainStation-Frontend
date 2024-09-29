import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Task() {
  const [tasks, setTasks] = useState([]);  // Store tasks
  const [completedSubtasks, setCompletedSubtasks] = useState([]);  // Store completed subtasks with completion date
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();  // For navigation

  // Extract performer_type and lowest chapters from the URL query parameters
  const performerType = searchParams.get("performerType")?.replace(" Performer", "");
  const lowestChapter1 = searchParams.get("chapter1");
  const lowestChapter2 = searchParams.get("chapter2");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!performerType || !lowestChapter1 || !lowestChapter2) {
          throw new Error("Missing performerType or chapters in query params");
        }

        const payload = {
          performer_type: performerType,
          lowest_two_chapters: [
            { chapter: lowestChapter1 },
            { chapter: lowestChapter2 }
          ]
        };

        const response = await axios.post('http://localhost:3000/api/progress/task-recommendation', payload);
        if (response.status === 200 && response.data.tasks) {
          setTasks(response.data.tasks);
        } else {
          throw new Error("No tasks found or invalid response from the server.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [performerType, lowestChapter1, lowestChapter2]);

  // Function to mark a subtask as complete
  const markSubtaskComplete = (task, subTask) => {
    const dateCompleted = new Date().toLocaleDateString();  // Get the current date
    const updatedSubtask = { task: task.task, subTask, dateCompleted };  // Store task and subtask data with completion date

    // Add the completed subtask to the completedSubtasks list
    setCompletedSubtasks([...completedSubtasks, updatedSubtask]);

    // Update the task list by removing the completed subtask
    const updatedTasks = tasks.map(t => {
      if (t === task) {
        // Filter out the completed subtask
        const updatedSubTasks = t.subTasks.filter(s => s !== subTask);
        return { ...t, subTasks: updatedSubTasks };  // Return updated task with remaining subtasks
      }
      return t;
    });

    // Remove the task from the main list if all subtasks are completed
    setTasks(updatedTasks.filter(t => t.subTasks.length > 0));
  };

  // Render loading state
  if (loading) return <div>Loading tasks...</div>;

  // Render error state
  if (error) return <div>{error}</div>;

  return (
    <main className="flex h-screen flex-col items-center justify-between p-6 bg-gray-100">
      <div className="w-full md:w-3/4 bg-white shadow-md rounded-lg p-6 relative">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Weekly Tasks</h2>

        {tasks && tasks.length > 0 ? (
          <div className="space-y-6">
            {tasks.map((task, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{task.task}</h3>

                  {task.subTasks && task.subTasks.length > 0 ? (
                    task.subTasks.map((subTask, subIndex) => (
                      <div key={subIndex} className="flex items-start space-x-2 mb-2">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded" 
                          onChange={() => markSubtaskComplete(task, subTask)}  // Mark subtask as complete
                        />
                        <label className="text-gray-700">{subTask}</label>
                      </div>
                    ))
                  ) : (
                    <p>No subtasks available.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No tasks available at the moment.</p>
        )}

        <button
          className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md mt-6"
          onClick={() => navigate('/completedTasks', { state: { completedSubtasks } })}  // Navigate with completed subtasks
        >
          Completed Tasks
        </button>
      </div>
    </main>
  );
}

export default Task;
