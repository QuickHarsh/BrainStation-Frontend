import { useRef, useState } from "react";
import axios from "axios";
import SurveyModal from "@/components/emotion/asrs-form";
// Import the API services
import { checkAssrsResultAge, checkAssrsResultExists, createAssrsResult, getAssrsResultByUser } from "@/service/asrs";
import { saveSession } from "@/service/session";

const SessionControl = ({ userId, moduleId }) => {
  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const [webSocket, setWebSocket] = useState(null);
  const [finalResult, setFinalResult] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [sessionStatus, setSessionStatus] = useState("Not started");
  const [dotColor, setDotColor] = useState("red");

  // State to store session time and date
  const [startTime, setStartTime] = useState(null); // Session start time
  // eslint-disable-next-line no-unused-vars
  const [stopTime, setStopTime] = useState(null); // Session stop time
  const [sessionDate, setSessionDate] = useState(null); // Today's date for the session

  const baseURL = import.meta.env.VITE_BRAINSTATION_EMOTIONURL;

  // Fetch ASRS result by checking if it's older than 6 months
  const fetchAndCheckASRSResult = async () => {
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
  };

  // Initialize webcam and video stream
  const initVideoStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1920, height: 1080, frameRate: 60 } // Higher resolution and frame rate
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Error accessing webcam:", err);
    }
  };

  // Stop webcam stream
  const stopVideoStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
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

      // Initialize video stream (webcam) only when session starts
      await initVideoStream();

      // If ASRS result was provided, send it to the backend
      if (finalasrsResult) {
        await axios.post(`${baseURL}asrs_result`, { asrs_result: finalasrsResult });
      }

      // Establish WebSocket connection for session monitoring
      const ws = new WebSocket(`${baseURL.replace("http", "ws")}start_session`);
      setWebSocket(ws);

      ws.onopen = () => {
        setSessionStatus("Monitoring");
        setDotColor("green");

        if (!intervalRef.current) {
          intervalRef.current = setInterval(() => sendFrame(ws), 100); // Reduced interval for better real-time detection
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

      // Stop video stream (webcam) when session stops
      stopVideoStream();

      // Record stop time
      const stopTime = new Date().toISOString();
      setStopTime(stopTime); // Set stop time

      // Fetch final session data from the backend
      const response = await axios.post(`${baseURL}stop_session`);
      const sessionData = {
        ...response.data, // Use data from the stop_session response
        userId: userId, // Use userId from props
        moduleId: moduleId, // Use moduleId from props
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

  // Send frame to backend using requestAnimationFrame for smoother capturing
  const sendFrame = (ws) => {
    if (videoRef.current && ws.readyState === WebSocket.OPEN) {
      requestAnimationFrame(() => {
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext("2d");

        // Draw the current frame from the video
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        // Send the frame as a high-quality JPEG to the WebSocket
        canvas.toBlob(
          (blob) => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(blob);
            }
          },
          "image/jpeg",
          1.0 // Use maximum quality (100%)
        );
      });
    }
  };

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

  return (
    <div>
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

export default SessionControl;
