import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function Task() {
  const [tasks, setTasks] = useState({ weeklyTasks: [], dailyTasks: [] });
  const [completedSubtasks, setCompletedSubtasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const performerType = searchParams.get("performerType")?.replace(" Performer", "");
  const lowestChapter1 = searchParams.get("chapter1");
  const lowestChapter2 = searchParams.get("chapter2");

  // Load completed subtasks from local storage
  useEffect(() => {
    const savedCompletedSubtasks = JSON.parse(localStorage.getItem("completedSubtasks")) || [];
    setCompletedSubtasks(savedCompletedSubtasks);
  }, []);

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const payload = {
          performer_type: performerType,
          lowest_two_chapters: [{ chapter: lowestChapter1 }, { chapter: lowestChapter2 }]
        };

        const response = await axios.post("http://localhost:3000/api/progress/task-recommendation", payload);

        if ((response.status === 200 || response.status === 201) && response.data.data && response.data.data.tasks) {
          setTasks(response.data.data.tasks);
        } else {
          throw new Error("No tasks found or invalid response from the server.");
        }
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [performerType, lowestChapter1, lowestChapter2]);

  // Handle task completion and update
  const handleCheckboxChange = async (taskId, task, subTask, taskType, isChecked) => {
    // If checkbox is unchecked, skip completion
    if (!isChecked) return;

    const dateCompleted = new Date().toLocaleString();
    const newCompletedSubtasks = [...completedSubtasks, { task, subTask, dateCompleted }];

    // Update local state and local storage
    setCompletedSubtasks(newCompletedSubtasks);
    localStorage.setItem("completedSubtasks", JSON.stringify(newCompletedSubtasks));

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

    // Move the task to completedTasks collection in backend
    try {
      const response = await axios.post("http://localhost:3000/api/progress/complete-task", { taskId });

      if (response.status === 200) {
        navigate("/completedtasks", { state: { completedSubtasks: newCompletedSubtasks } });
      } else {
        throw new Error("Failed to complete task");
      }
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="flex h-screen flex-col items-center justify-between p-6 bg-gray-100">
      <div className="w-full md:w-3/4 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Task Board</h2>

        {/* Weekly Tasks Section */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-blue-900 mb-4">Weekly Tasks</h3>
          {tasks?.weeklyTasks?.length > 0 ? (
            tasks.weeklyTasks.map((task, index) => (
              <div key={index} className="p-6 bg-gray-100 rounded-lg mb-4">
                <h4 className="text-2xl font-extrabold text-blue-800 mb-4">{task.task}</h4>

                {task.subTasks?.length > 0 ? (
                  task.subTasks.map((subTask, subIndex) => (
                    <div key={subIndex} className="flex items-start space-x-2 mb-4">
                      <input
                        type="checkbox"
                        className="h-5 w-5 text-blue-600 border-gray-300 rounded"
                        onChange={(e) => handleCheckboxChange(task._id, task.task, subTask, "weeklyTasks", e.target.checked)}
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
          {tasks?.dailyTasks?.length > 0 ? (
            tasks.dailyTasks.map((task, index) => (
              <div key={index} className="p-6 bg-gray-100 rounded-lg mb-4">
                <h4 className="text-2xl font-extrabold text-blue-800 mb-4">{task.task}</h4>

                {task.subTasks?.length > 0 ? (
                  task.subTasks.map((subTask, subIndex) => (
                    <div key={subIndex} className="flex items-start space-x-2 mb-4">
                      <input
                        type="checkbox"
                        className="h-5 w-5 text-blue-600 border-gray-300 rounded"
                        onChange={(e) => handleCheckboxChange(task._id, task.task, subTask, "dailyTasks", e.target.checked)}
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

        <button
          className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-md"
          onClick={() => navigate("/completedtasks", { state: { completedSubtasks } })}
        >
          View Completed Subtasks
        </button>
      </div>
    </main>
  );
}

export default Task;
