import { useRef, useState } from "react";
import axios from "axios";
import SurveyModal from "@/components/emotion/asrs-form";
import {
  checkAssrsResultAge,
  checkAssrsResultExists,
  createAssrsResult,
  getAssrsResultByUser,
  updateAssrsResult
} from "@/service/asrs";
import { saveSession } from "@/service/session";

const SessionControl = ({ moduleId }) => {
  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const [webSocket, setWebSocket] = useState(null);
  const [finalResult, setFinalResult] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [sessionStatus, setSessionStatus] = useState("Not started");
  const [dotColor, setDotColor] = useState("red");

  const [startTime, setStartTime] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [stopTime, setStopTime] = useState(null);
  const [sessionDate, setSessionDate] = useState(null);
  const [isBarVisible, setIsBarVisible] = useState(true);

  const toggleBarVisibility = () => setIsBarVisible(!isBarVisible);

  const baseURL = import.meta.env.VITE_BRAINSTATION_EMOTIONURL;

  // Main function to handle ASRS checks and fetch result if needed
  const fetchASRSResultForSession = async () => {
    const { exists } = await checkAssrsResultExists();
    if (exists) {
      const isCurrent = await checkAssrsResultAge();
      if (isCurrent) {
        // If ASRS result is current, fetch and return it
        const asrsResult = await getAssrsResultByUser();
        return asrsResult?.data?.assrsResult;
      } else {
        // If ASRS result exists but is outdated, show survey to update it
        setShowSurvey(true);
        return null;
      }
    } else {
      // If ASRS result does not exist, show survey to create a new one
      setShowSurvey(true);
      return null;
    }
  };

  const initVideoStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1920, height: 1080, frameRate: 60 }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Error accessing webcam:", err);
    }
  };

  const stopVideoStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const startSession = async (finalasrsResult = null) => {
    try {
      const now = new Date();
      const startTime = now.toISOString();
      setStartTime(startTime);
      setSessionDate(now.toISOString().split("T")[0]);

      await initVideoStream();

      if (finalasrsResult) {
        await axios.post(`${baseURL}asrs_result`, { asrs_result: finalasrsResult });
      }

      const ws = new WebSocket(`${baseURL.replace("http", "ws")}start_session`);
      setWebSocket(ws);

      ws.onopen = () => {
        setSessionStatus("Monitoring");
        setDotColor("green");

        if (!intervalRef.current) {
          intervalRef.current = setInterval(() => sendFrame(ws), 100);
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

  const stopSession = async () => {
    try {
      if (webSocket) {
        webSocket.close();
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      stopVideoStream();

      const stopTime = new Date().toISOString();
      setStopTime(stopTime);

      const response = await axios.post(`${baseURL}stop_session`);
      const sessionData = {
        ...response.data,
        moduleId,
        startTime,
        stopTime,
        date: sessionDate
      };

      console.log("Session data:", sessionData);
      await saveSession(sessionData);

      setFinalResult(response.data);
      setShowPopup(true);

      localStorage.setItem("finalResult", JSON.stringify(response.data));

      setSessionStatus("Stopped");
      setDotColor("red");
    } catch (error) {
      console.error("Error stopping session:", error);
    }
  };

  const sendFrame = (ws) => {
    if (videoRef.current && ws.readyState === WebSocket.OPEN) {
      requestAnimationFrame(() => {
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
          1.0
        );
      });
    }
  };

  const handleStartSessionClick = async () => {
    try {
      const asrsResult = await fetchASRSResultForSession();

      if (asrsResult) {
        startSession(asrsResult);
      }
    } catch (error) {
      console.error("Error in session start flow:", error);
    }
  };

  const handleSurveyComplete = async (surveyResult) => {
    setShowSurvey(false);

    try {
      if (surveyResult.update) {
        // Update the existing ASRS result
        const updatedResult = await updateAssrsResult({ asrs_result: "Positive" });
        const asrsValue = updatedResult?.data;
        startSession(asrsValue);
      } else {
        // Create a new ASRS result
        const newAsrsResult = await createAssrsResult(surveyResult);
        const asrsValue = newAsrsResult?.data;
        startSession(asrsValue);
      }
    } catch (error) {
      console.error("Error updating or creating ASRS result:", error);
    }
  };

  return (
    <>
      <div
        className={`absolute top-4 right-4 min-w-[17rem] z-[1000]   rounded-md p-4 transition-all duration-300 ease-in-out ${
          isBarVisible ? "max-h-[200px] bg-white shadow-lg" : "max-h-[50px] bg-primary-paper shadow-sm"
        }`}
      >
        {/* Always visible part with status indicator */}
        <div className="flex">
          <div className="flex items-center gap-1">
            <div className={`w-2.5 h-2.5 rounded-full`} style={{ backgroundColor: dotColor }}></div>
            <p className="text-sm">{sessionStatus}</p>
          </div>

          {/* Toggle button to show/hide the session control buttons */}
          <button className="ml-auto text-sm text-gray-500 hover:text-gray-700" onClick={toggleBarVisibility}>
            {isBarVisible ? "Hide" : "Show"}
          </button>
        </div>

        {/* Conditional session control buttons with animation */}
        <div
          className={`mt-2 transition-opacity duration-300 ease-in-out ${
            isBarVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex space-x-4">
            <button
              className="bg-green-500 text-white text-sm px-4 py-2 rounded hover:bg-green-700"
              onClick={handleStartSessionClick}
            >
              Start Session
            </button>
            <button
              className="bg-red-500 text-white text-sm px-4 py-2 rounded hover:bg-red-700"
              onClick={stopSession}
              disabled={sessionStatus === "Not started" || sessionStatus === "Stopped"}
            >
              Stop Session
            </button>
          </div>
        </div>
      </div>

      <video ref={videoRef} className="hidden" autoPlay />

      <SurveyModal isVisible={showSurvey} onClose={() => setShowSurvey(false)} onContinue={handleSurveyComplete} />

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
    </>
  );
};

export default SessionControl;
