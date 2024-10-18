import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Loader } from "@/components";
import ContentCard from "@/components/cards/content-card";
import SurveyModal from "@/components/emotion/asrs-form";
import BottomBar from "@/components/layout/bottom-bar";
import MCQPane from "@/components/quiz/mcq-pane";
import useFetchData from "@/hooks/fetch-data";
import { checkAssrsResultAge, checkAssrsResultExists, createAssrsResult, getAssrsResultByUser } from "@/service/asrs";
import { getModuleById } from "@/service/module";
import { saveSession } from "@/service/session";
import { setCurrentModule, switchView } from "@/store/lecturesSlice";
import { hideMCQPane } from "@/store/mcqSlice";

// Import the API services

const Study = () => {
  const dispatch = useDispatch();
  const { moduleId } = useParams();

  // Fetch module data using the custom hook
  const moduleData = useFetchData(getModuleById, moduleId);

  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const [webSocket, setWebSocket] = useState(null);
  const [finalResult, setFinalResult] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false); // State for showing the survey modal
  const [sessionStatus, setSessionStatus] = useState("Not started");
  const [dotColor, setDotColor] = useState("red");

  // State to store session time and date
  const [startTime, setStartTime] = useState(null); // Session start time
  // eslint-disable-next-line no-unused-vars
  const [stopTime, setStopTime] = useState(null); // Session stop time
  const [sessionDate, setSessionDate] = useState(null); // Today's date for the session

  const baseURL = import.meta.env.VITE_BRAINSTATION_EMOTIONURL;
  const userId = "66d97b6fc30a1f78cf41b615"; // Replace this with the actual user ID

  useEffect(() => {
    dispatch(switchView("lecturer"));

    if (moduleData && moduleData.success && moduleData.data) {
      dispatch(setCurrentModule(moduleData.data));
    }
  }, [moduleData, dispatch]);

  const currentSlide = useSelector((state) => {
    const currentLecture = state.lectures.lectures.find((lecture) => lecture._id === state.lectures.currentLectureId);
    if (currentLecture && currentLecture.slides && currentLecture.slides.length > 0) {
      return (
        currentLecture.slides.find((slide) => slide.id === state.lectures.currentSlideId) || currentLecture.slides[0]
      );
    }
    return null;
  });

  const currentLectureTitle = useSelector((state) => {
    const currentLecture = state.lectures.lectures.find((lecture) => lecture._id === state.lectures.currentLectureId);
    return currentLecture ? currentLecture.title : "";
  });

  const isMCQPaneVisible = useSelector((state) => state.mcq.isMCQPaneVisible);

  const handleCloseMCQPane = () => {
    dispatch(hideMCQPane());
  };

  // Fetch ASRS result by checking if it's older than 6 months
  const fetchAndCheckASRSResult = async () => {
    try {
      const exists = await checkAssrsResultExists(userId);

      if (exists) {
        const isOlderThanSixMonths = await checkAssrsResultAge(userId);

        if (isOlderThanSixMonths) {
          setShowSurvey(true); // Show the survey if it's older than 6 months
          return null;
        } else {
          const asrsResult = await getAssrsResultByUser(userId);
          const finalasrsResult = asrsResult.data.assrsResult;
          return finalasrsResult; // Use the existing ASRS result from MongoDB
        }
      } else {
        setShowSurvey(true); // Show the survey if no ASRS result exists
        return null;
      }
    } catch (error) {
      console.error("Error fetching ASRS result:", error);
      throw error;
    }
  };

  // Start session logic
  const startSession = async (finalasrsResult = null) => {
    try {
      // Get current date (YYYY-MM-DD) and time for session start
      const now = new Date();
      const startTime = now.toISOString(); // Start time in ISO format
      setStartTime(startTime); // Set start time
      setSessionDate(now.toISOString().split("T")[0]); // Set today's date in YYYY-MM-DD format

      // If ASRS result was provided, send it to the backend
      if (finalasrsResult) {
        await axios.post(`${baseURL}asrs_result`, { asrs_result: finalasrsResult });
      }

      // Establish WebSocket connection for session monitoring
      const ws = new WebSocket(`${baseURL.replace("http", "ws")}start_session`);
      setWebSocket(ws);

      ws.onopen = () => {
        console.log("WebSocket connection established.");
        setSessionStatus("Monitoring");
        setDotColor("green");

        if (!intervalRef.current) {
          intervalRef.current = setInterval(() => sendFrame(ws), 200);
        }
      };

      ws.onmessage = (event) => {
        console.log("Received result:", event.data);
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = () => {
        console.log("Session closed.");
      };
    } catch (error) {
      console.error("Error starting session:", error);
    }
  };

  // Stop session logic
  const stopSession = async () => {
    try {
      if (webSocket) {
        webSocket.close();
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      // Record stop time
      const stopTime = new Date().toISOString();
      setStopTime(stopTime); // Set stop time

      // Fetch final session data from the backend
      const response = await axios.post(`${baseURL}stop_session`);
      const sessionData = {
        ...response.data, // Use data from the stop_session response
        userId: "66d97b6fc30a1f78cf41b615", // Replace with actual user ID
        moduleId: "66eea15243421e0263b960bc", // Replace with actual module ID
        startTime: startTime,
        stopTime: stopTime,
        date: sessionDate // Date from when session was started
      };

      console.log("Session data:", sessionData);
      // Save session data to backend
      await saveSession(sessionData); // Implement saveSession API call here

      setFinalResult(response.data); // Store the result for display
      setShowPopup(true);

      // Save final result to localStorage
      localStorage.setItem("finalResult", JSON.stringify(response.data));

      setSessionStatus("Stopped");
      setDotColor("red");
    } catch (error) {
      console.error("Error stopping session:", error);
    }
  };

  // Send frame to backend
  const sendFrame = (ws) => {
    if (videoRef.current && ws.readyState === WebSocket.OPEN) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext("2d");

      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(blob);
          }
        },
        "image/jpeg",
        0.7
      );
    }
  };

  const initVideoStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, frameRate: 30 }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };
  useEffect(() => {
    initVideoStream();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // This function is triggered when the user clicks the "Start Session" button
  const handleStartSessionClick = async () => {
    try {
      const asrsResult = await fetchAndCheckASRSResult();

      if (asrsResult) {
        startSession(asrsResult); // If ASRS result is available, start session with it
      }
    } catch (error) {
      console.error("Error in session start flow:", error);
    }
  };

  // This function is triggered after the survey is completed
  const handleSurveyComplete = async (surveyResult) => {
    setShowSurvey(false); // Hide the survey modal

    try {
      // If survey completed, save the result to MongoDB
      const newAsrsResult = await createAssrsResult(userId, surveyResult);
      console.log("ASRS result saved:", newAsrsResult);
      const asrsValue = newAsrsResult.data;
      console.log("ASRS result value:", asrsValue);

      // Proceed with session start using new ASRS values
      startSession(asrsValue);
    } catch (error) {
      console.error("Error saving ASRS result:", error);
    }
  };

  if (!moduleData) {
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Status and buttons in a single line, justified between */}
      <div className="flex justify-between items-center p-4">
        {/* Status with Dot */}
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: dotColor }}></div>
          <p>{sessionStatus}</p>
        </div>

        {/* Buttons for starting and stopping session */}
        <div className="flex space-x-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleStartSessionClick} // Show survey modal first if needed
          >
            Start Session
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={stopSession}
            disabled={sessionStatus === "Not started" || sessionStatus === "Stopped"}
          >
            Stop Session
          </button>
        </div>
      </div>

      {currentSlide ? (
        <>
          <div className="flex-grow w-full overflow-hidden bg-primary-paper p-16 flex items-center justify-center ">
            <ContentCard title={currentSlide.title} content={currentSlide.content} />
          </div>
          <div className="px-4 py-1">
            <BottomBar />
          </div>
          <MCQPane isVisible={isMCQPaneVisible} onClose={handleCloseMCQPane} lectureTitle={currentLectureTitle} />
        </>
      ) : (
        <div className="flex justify-center items-center">
          <p>No slides available for the current lecture.</p>
        </div>
      )}

      {/* Hidden video element for capturing frames */}
      <video ref={videoRef} className="hidden" autoPlay />

      {/* Survey Modal */}
      <SurveyModal
        isVisible={showSurvey}
        onClose={() => setShowSurvey(false)} // Close the survey
        onContinue={handleSurveyComplete} // Continue with session start after survey is complete
        userId={userId}
      />

      {/* Popup Modal for displaying final result */}
      {showPopup && finalResult && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[200]">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-[30rem]">
            <h2 className="text-xl font-bold mb-4">Final Result</h2>
            {finalResult ? (
              <div className="text-left">
                <p className="mb-2">
                  <strong>Classification:</strong> {finalResult.final_classification || "N/A"}
                </p>
                <p className="mb-2">
                  <strong>Focus Time:</strong> {finalResult.focus_time?.toFixed(2) || 0} milliseconds
                </p>
                <p className="mb-2">
                  <strong>Total Movements:</strong> {finalResult.total_movements || 0}
                </p>
                <p className="mb-2">
                  <strong>Erratic Movements:</strong> {finalResult.erratic_movements || 0}
                </p>
                <p className="mb-2">
                  <strong>Erratic Percentage:</strong> {finalResult.erratic_percentage?.toFixed(2) || 0}%
                </p>
              </div>
            ) : (
              <p>No result</p>
            )}
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 mt-4"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Study;
