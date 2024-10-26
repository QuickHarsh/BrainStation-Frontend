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

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="flex flex-col h-screen">
      <button
        className="bg-transparent text-blue-400 font-bold py-1 px-4 rounded-full ml-4 mt-4 flex items-center border border-blue-400 hover:bg-blue-100"
        style={{ width: "fit-content" }}
        onClick={() => navigate(-1)}
      >
        <span className="mr-2"></span> Back
      </button>

      <div className="flex-grow w-full bg-white p-6 md:w-3/4 shadow-md rounded-lg mx-auto">
        <h2 className="text-3xl font-bold text-black text-center mb-6">Task Board</h2>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-blue-900 mb-4">Weekly Tasks</h3>
          {tasks?.weeklyTasks?.length > 0 ? (
            tasks.weeklyTasks.map((task, taskIndex) => (
              <div key={taskIndex} className="p-6 bg-gray-200 rounded-lg mb-4">
                <h4 className="text-2xl font-extrabold text-blue-800 mb-4">{task.task}</h4>
                {task.subTasks?.length > 0 ? (
                  task.subTasks.map((subTask, subTaskIndex) => (
                    <div key={subTaskIndex} className="flex items-start space-x-2 mb-4">
                      <input
                        type="checkbox"
                        className="custom-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded"
                        style={{ width: "20px", height: "20px" }}
                        onChange={(e) =>
                          handleCheckboxChange(taskId, "weeklyTasks", taskIndex, subTaskIndex, e.target.checked)
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
              <div key={taskIndex} className="p-6 bg-gray-200 rounded-lg mb-4">
                <h4 className="text-2xl font-extrabold text-blue-800 mb-4">{task.task}</h4>
                {task.subTasks?.length > 0 ? (
                  task.subTasks.map((subTask, subTaskIndex) => (
                    <div key={subTaskIndex} className="flex items-start space-x-2 mb-4">
                      <input
                        type="checkbox"
                        className="custom-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded"
                        style={{ width: "20px", height: "20px" }}
                        onChange={(e) =>
                          handleCheckboxChange(taskId, "dailyTasks", taskIndex, subTaskIndex, e.target.checked)
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
      <div className="w-full h-1/2 bg-gray-300"></div>
    </main>
  );
}

export default Task;
