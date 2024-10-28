import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteSubtaskFromTaskController, getTaskRecommendations } from "@/service/task";

function Task() {
  const [tasks, setTasks] = useState({ weeklyTasks: [], dailyTasks: [] });
  const [taskId, setTaskId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { performerType, strugglingAreas } = location.state || { performerType: "", strugglingAreas: [] };
  const lowestChapter1 = strugglingAreas[0];
  const lowestChapter2 = strugglingAreas[1];
  const hasFetched = useRef(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("taskSet"));
    if (savedTasks) {
      setTasks(savedTasks);
      setTaskId(localStorage.getItem("taskId"));
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (hasFetched.current || tasks.weeklyTasks.length > 0 || tasks.dailyTasks.length > 0) return;
    hasFetched.current = true;

    const fetchTasks = async () => {
      try {
        const payload = {
          performer_type: performerType,
          lowest_two_chapters: strugglingAreas
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
      const response = await deleteSubtaskFromTaskController({
        taskId,
        taskType,
        taskIndex,
        subTaskIndex
      });

      if (!response.success) {
        throw new Error("Failed to delete subtask. API error.");
      }

      console.log("Subtask deleted and moved to completed collection:", response);
    } catch (err) {
      setError("Failed to delete subtask. Please try again.");
      setTasks((prevTasks) => {
        const revertedTasks = { ...prevTasks };
        revertedTasks[taskType][taskIndex].subTasks = [...prevTasks[taskType][taskIndex].subTasks];
        return revertedTasks;
      });
    }
  };

  const handleCompletedTasksButtonClick = () => {
    navigate("/completed-tasks");
  };

  const renderSubTask = (subTask) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return subTask.split(urlRegex).map((part, index) => {
      if (urlRegex.test(part)) {
        const encodedURL = encodeURI(part.trim());
        return (
          <a
            key={index}
            href={encodedURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {part}
          </a>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-blue-600 font-semibold text-lg">
        Loading tasks...
      </div>
    );
  if (error) return <div className="text-red-500 font-semibold text-center">{error}</div>;

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <div className="w-full max-w-4xl p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Task Board</h2>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-blue-900 mb-6">Weekly Tasks</h3>
          {tasks.weeklyTasks.length > 0 ? (
            tasks.weeklyTasks.map((task, taskIndex) => (
              <div key={taskIndex} className="p-6 mb-6 bg-blue-50 border border-blue-100 rounded-lg shadow-sm">
                <h4 className="text-xl font-semibold text-blue-800 mb-4">{task.task}</h4>
                {task.subTasks.length > 0 ? (
                  task.subTasks.map((subTask, subTaskIndex) => (
                    <div key={subTaskIndex} className="flex items-start gap-2 mb-3">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-blue-600 accent-blue-500 border-gray-300 rounded"
                        onChange={(e) =>
                          handleCheckboxChange(taskId, "weeklyTasks", taskIndex, subTaskIndex, e.target.checked)
                        }
                      />
                      <label className="text-gray-800">{renderSubTask(subTask)}</label>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No subtasks available for this weekly task.</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No weekly tasks available at the moment.</p>
          )}
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-blue-900 mb-6">Daily Tasks</h3>
          {tasks.dailyTasks.length > 0 ? (
            tasks.dailyTasks.map((task, taskIndex) => (
              <div key={taskIndex} className="p-6 mb-6 bg-green-50 border border-green-100 rounded-lg shadow-sm">
                <h4 className="text-xl font-semibold text-green-800 mb-4">{task.task}</h4>
                {task.subTasks.length > 0 ? (
                  task.subTasks.map((subTask, subTaskIndex) => (
                    <div key={subTaskIndex} className="flex items-start gap-2 mb-3">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-green-600 accent-green-500 border-gray-300 rounded"
                        onChange={(e) =>
                          handleCheckboxChange(taskId, "dailyTasks", taskIndex, subTaskIndex, e.target.checked)
                        }
                      />
                      <label className="text-gray-800">{renderSubTask(subTask)}</label>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No subtasks available for this daily task.</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No daily tasks available at the moment.</p>
          )}
        </section>

        <button
          className="mt-8 mx-auto block bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:-translate-y-0.5"
          onClick={handleCompletedTasksButtonClick}
        >
          View Completed Subtasks
        </button>
      </div>
    </main>
  );
}

export default Task;
