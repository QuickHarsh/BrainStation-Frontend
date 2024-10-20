import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function Task() {
  const [tasks, setTasks] = useState({ weeklyTasks: [], dailyTasks: [] });
  const [taskId, setTaskId] = useState(""); // Store the taskId
  // eslint-disable-next-line no-unused-vars
  const [completedSubtasks, setCompletedSubtasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get performerType, lowest chapters, and studentId from URL
  const performerType = searchParams.get("performerType")?.replace(" Performer", "");
  const lowestChapter1 = searchParams.get("chapter1");
  const lowestChapter2 = searchParams.get("chapter2");
  const studentId = searchParams.get("studentId"); // This line is correct, only needs to appear once

  // Prevent duplicate fetching
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

  // Fetch tasks from backend if not saved in local storage
  useEffect(() => {
    if (hasFetched.current || tasks.weeklyTasks.length > 0 || tasks.dailyTasks.length > 0) return;
    hasFetched.current = true;

    const fetchTasks = async () => {
      try {
        const payload = {
          performer_type: performerType,
          lowest_two_chapters: [{ chapter: lowestChapter1 }, { chapter: lowestChapter2 }],
          Student_id: studentId // Pass the studentId from the URL here
        };

        console.log("Sending POST request with payload: ", payload); // Log the payload to confirm studentId is passed
        const response = await axios.post("http://localhost:3000/api/progress/task-recommendation", payload);

        if ((response.status === 200 || response.status === 201) && response.data.data && response.data.data.tasks) {
          console.log("Response received: ", response.data);

          // Capture and set taskId from response
          setTaskId(response.data.data._id); // Ensure taskId is saved properly
          setTasks(response.data.data.tasks); // Set tasks separately
          localStorage.setItem("taskSet", JSON.stringify(response.data.data.tasks)); // Save task set
          localStorage.setItem("taskId", response.data.data._id); // Save task ID
        } else {
          throw new Error("No tasks found or invalid response from the server.");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks(); // Trigger fetch tasks
  }, [performerType, lowestChapter1, lowestChapter2, tasks, studentId]);

  // Handle task completion and update
  const handleCheckboxChange = async (task, subTask, taskType, taskIndex, subTaskIndex, isChecked) => {
    console.log("Checkbox checked:", isChecked);
    console.log("Task details:", { taskId, taskType, taskIndex, subTaskIndex });

    if (!isChecked) return;

    // Optimistically update UI before sending the request
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[taskType][taskIndex].subTasks = updatedTasks[taskType][taskIndex].subTasks.filter(
        (_, idx) => idx !== subTaskIndex
      );
      return updatedTasks;
    });

    try {
      const response = await axios.post("http://localhost:3000/api/progress/delete-subtask", {
        taskId, // Ensure taskId is correct
        taskType, // Should be either 'weeklyTasks' or 'dailyTasks'
        taskIndex, // Task index
        subTaskIndex // Subtask index
      });

      if (response.status === 200) {
        console.log("Subtask deleted successfully:", response.data);
      } else {
        console.error("Failed to delete subtask, status:", response.status);
        // Revert UI changes if failed
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
    navigate("/completedtasks", { state: { taskId, studentId } });
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
                          handleCheckboxChange(
                            task.task,
                            subTask,
                            "weeklyTasks",
                            taskIndex,
                            subTaskIndex,
                            e.target.checked
                          )
                        }
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
                          handleCheckboxChange(
                            task.task,
                            subTask,
                            "dailyTasks",
                            taskIndex,
                            subTaskIndex,
                            e.target.checked
                          )
                        }
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
          onClick={handleCompletedTasksButtonClick}
        >
          View Completed Subtasks
        </button>
      </div>
    </main>
  );
}

export default Task;
