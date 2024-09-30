import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Task() {
  const [tasks, setTasks] = useState({ weeklyTasks: [], dailyTasks: [] }); // State for tasks
  const [completedSubtasks, setCompletedSubtasks] = useState([]); // State for completed subtasks
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors
  const navigate = useNavigate(); // For navigation
  const [searchParams] = useSearchParams(); // For URL query params

  // Extract performer type and chapters from query params
  const performerType = searchParams.get("performerType")?.replace(" Performer", "");
  const lowestChapter1 = searchParams.get("chapter1");
  const lowestChapter2 = searchParams.get("chapter2");

  // Load completed subtasks from local storage
  useEffect(() => {
    const savedCompletedSubtasks = JSON.parse(localStorage.getItem('completedSubtasks')) || [];
    setCompletedSubtasks(savedCompletedSubtasks);
  }, []);

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const payload = {
          performer_type: performerType,
          lowest_two_chapters: [
            { chapter: lowestChapter1 },
            { chapter: lowestChapter2 }
          ]
        };

        const response = await axios.post('http://localhost:3000/api/progress/task-recommendation', payload);

        if (response.status === 200 && response.data.tasks) {
          console.log("API Response:", response.data.tasks); // Log the response to check subtasks
          setTasks(response.data.tasks); // Set tasks with subtasks
        } else {
          throw new Error("No tasks found or invalid response from the server.");
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [performerType, lowestChapter1, lowestChapter2]);

  // Handle subtask checkbox change
  const handleCheckboxChange = (task, subTask, taskType) => {
    const dateCompleted = new Date().toLocaleString();
    const newCompletedSubtasks = [
      ...completedSubtasks,
      { task, subTask, dateCompleted }
    ];

    // Update local state and local storage
    setCompletedSubtasks(newCompletedSubtasks);
    localStorage.setItem('completedSubtasks', JSON.stringify(newCompletedSubtasks));

    // Remove the completed subtask from the task list
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[taskType] = updatedTasks[taskType].map((t) => {
        if (t.task === task) {
          return {
            ...t,
            subTasks: t.subTasks.filter((st) => st !== subTask)
          };
        }
        return t;
      });
      return updatedTasks;
    });
  };

  // Render loading state
  if (loading) return <div>Loading tasks...</div>;

  // Render error state
  if (error) return <div>{error}</div>;

  // Navigate to the Completed Tasks page
  const goToCompletedTasks = () => {
    navigate("/completedtasks", { state: { completedSubtasks } });
  };

  // Render the tasks
  return (
    <main className="flex h-screen flex-col items-center justify-between p-6 bg-gray-100">
      <div className="w-full md:w-3/4 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Task Board</h2>

        {/* Weekly Tasks Section */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-blue-900 mb-4">Weekly Tasks</h3>
          {tasks.weeklyTasks.length > 0 ? (
            tasks.weeklyTasks.map((task, index) => (
              <div key={index} className="p-6 bg-gray-100 rounded-lg mb-4">
                <h4 className="text-2xl font-extrabold text-blue-800 mb-4">{task.task}</h4>

                {task.subTasks && task.subTasks.length > 0 ? (
                  task.subTasks.map((subTask, subIndex) => (
                    <div key={subIndex} className="flex items-start space-x-2 mb-4">
                      <input
                        type="checkbox"
                        className="h-5 w-5 text-blue-600 border-gray-300 rounded"
                        onChange={() => handleCheckboxChange(task.task, subTask, "weeklyTasks")}
                      />
                      <label className="text-black font-bold text-xl">{subTask}</label>
                    </div>
                  ))
                ) : (
                  <p className="text-lg font-bold text-black">No subtasks available for this weekly task.</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-lg font-bold text-black">No weekly tasks available at the moment.</p>
          )}
        </section>

        {/* Daily Tasks Section */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-blue-900 mb-4">Daily Tasks</h3>
          {tasks.dailyTasks.length > 0 ? (
            tasks.dailyTasks.map((task, index) => (
              <div key={index} className="p-6 bg-gray-100 rounded-lg mb-4">
                <h4 className="text-2xl font-extrabold text-blue-800 mb-4">{task.task}</h4>

                {task.subTasks && task.subTasks.length > 0 ? (
                  task.subTasks.map((subTask, subIndex) => (
                    <div key={subIndex} className="flex items-start space-x-2 mb-4">
                      <input
                        type="checkbox"
                        className="h-5 w-5 text-blue-600 border-gray-300 rounded"
                        onChange={() => handleCheckboxChange(task.task, subTask, "dailyTasks")}
                      />
                      <label className="text-black font-bold text-xl">{subTask}</label>
                    </div>
                  ))
                ) : (
                  <p className="text-lg font-bold text-black">No subtasks available for this daily task.</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-lg font-bold text-black">No daily tasks available at the moment.</p>
          )}
        </section>

        {/* Button to navigate to Completed Tasks page */}
        <button
          className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-md"
          onClick={goToCompletedTasks}
        >
          View Completed Subtasks
        </button>
      </div>
    </main>
  );
}

export default Task;
