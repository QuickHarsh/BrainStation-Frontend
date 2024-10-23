import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { getTaskRecommendations } from "@/service/task";

function Task() {
  const [tasks, setTasks] = useState({ weeklyTasks: [], dailyTasks: [] });
  const [taskId, setTaskId] = useState(""); // Store the taskId
  const [completedSubtasks, setCompletedSubtasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { performerType, strugglingAreas } = location.state || { performerType: '', strugglingAreas: '' };
  const lowestChapter1 = strugglingAreas[0];
  const lowestChapter2 = strugglingAreas[1];
  const hasFetched = useRef(false);

  // Load completed subtasks from local storage and task set from local storage
  useEffect(() => {
    const savedCompletedSubtasks = JSON.parse(localStorage.getItem("completedSubtasks")) || [];
    setCompletedSubtasks(savedCompletedSubtasks);

    const savedTasks = JSON.parse(localStorage.getItem("taskSet"));
    if (savedTasks) {
      setTasks(savedTasks);
      setTaskId(localStorage.getItem("taskId"));
      setLoading(false); // Stop loading if we have saved tasks
    }
  }, []);

  useEffect(() => {
    if (hasFetched.current || tasks.weeklyTasks.length > 0 || tasks.dailyTasks.length > 0) return;
    hasFetched.current = true;

    const fetchTasks = async () => {
      try {
        const payload = {
          performer_type: performerType,
          lowest_two_chapters: strugglingAreas,
        };

        const response = await getTaskRecommendations(payload);

        setTaskId(response.data._id); 
        setTasks(response.data.tasks); 
        localStorage.setItem("taskSet", JSON.stringify(response.data.tasks));
        localStorage.setItem("taskId", response.data._id); 
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [performerType, lowestChapter1, lowestChapter2, tasks]);


  const handleCheckboxChange = async (taskId, taskType, taskIndex, subTaskIndex, isChecked) => {
    if (!isChecked) return;

    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[taskType][taskIndex].subTasks = updatedTasks[taskType][taskIndex].subTasks.filter(
        (_, idx) => idx !== subTaskIndex
      );
      return updatedTasks;
    });

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('User is not authenticated. No token found.');
      }

      const response = await axios.post("http://localhost:3000/api/task/delete-subtask", {
        taskId, taskType, taskIndex, subTaskIndex
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.status !== 200) {
        throw new Error("Failed to delete subtask.");
      }
    } catch (error) {
      console.error("Error deleting subtask:", error.response?.data || error.message);
      setError("Failed to delete subtask. Please try again.");
      // Revert UI changes in case of error
      setTasks((prevTasks) => {
        const revertedTasks = { ...prevTasks };
        revertedTasks[taskType][taskIndex].subTasks = [...prevTasks[taskType][taskIndex].subTasks];
        return revertedTasks;
      });
    }
  };
  
  const handleCompletedTasksButtonClick = () => {
    navigate("/completed-tasks", { state: { taskId } });
  };

  const renderSubTask = (subTask) => {
    // Check if the subtask contains a URL (simple regex for detecting a URL)
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    if (urlRegex.test(subTask)) {
      return subTask.split(urlRegex).map((part, index) =>
        urlRegex.test(part) ? (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            {part}
          </a>
        ) : (
          <span key={index}>{part}</span>
        )
      );
    }
    return subTask;
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
            tasks.weeklyTasks.map((task, taskIndex) => (
              <div key={taskIndex} className="p-6 bg-gray-100 rounded-lg mb-4">
                <h4 className="text-2xl font-extrabold text-blue-800 mb-4">{task.task}</h4>
                {task.subTasks?.length > 0 ? (
                  task.subTasks.map((subTask, subTaskIndex) => (
                    <div key={subTaskIndex} className="flex items-start space-x-2 mb-4">
                      <input
                        type="checkbox"
                        className="h-5 w-5 text-blue-600 border-gray-300 rounded"
                        onChange={(e) =>
                          handleCheckboxChange(task.task, subTask, "weeklyTasks", taskIndex, subTaskIndex, e.target.checked)
                        }
                      />
                      <label className="text-black font-bold text-xl">{renderSubTask(subTask)}</label>
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
            tasks.dailyTasks.map((task, taskIndex) => (
              <div key={taskIndex} className="p-6 bg-gray-100 rounded-lg mb-4">
                <h4 className="text-2xl font-extrabold text-blue-800 mb-4">{task.task}</h4>
                {task.subTasks?.length > 0 ? (
                  task.subTasks.map((subTask, subTaskIndex) => (
                    <div key={subTaskIndex} className="flex items-start space-x-2 mb-4">
                      <input
                        type="checkbox"
                        className="h-5 w-5 text-blue-600 border-gray-300 rounded"
                        onChange={(e) =>
                          handleCheckboxChange(task.task, subTask, "dailyTasks", taskIndex, subTaskIndex, e.target.checked)
                        }
                      />
                      <label className="text-black font-bold text-xl">{renderSubTask(subTask)}</label>
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
          onClick={handleCompletedTasksButtonClick}
        >
          View Completed Subtasks
        </button>
      </div>
    </main>
  );
}

export default Task;
