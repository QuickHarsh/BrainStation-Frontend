import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import DonutChart from "../charts/donut-chart";

// Import the DonutChart component

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false); // Session state
  const [showPopup, setShowPopup] = useState(false); // Popup state
  const [finalResult, setFinalResult] = useState(null); // Final result from stop session
  const videoRef = useRef(null);
  const [webSocket, setWebSocket] = useState(null);
  const intervalRef = useRef(null); // Ref for storing the interval ID
  const location = useLocation(); // Get the current route

  // Base URL for the backend
  const baseURL = "http://34.30.64.175:9001/";

  // Check if the current route is '/study'
  const isStudyRoute = location.pathname === "/study";

  // Start video streaming with balanced resolution and frame rate
  useEffect(() => {
    const initVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720, frameRate: 30 } // Adjust frame rate and resolution for better accuracy
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };

    initVideoStream();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Start session function
  const startSession = async () => {
    try {
      // Retrieve ASRS result from localStorage
      const storedASRSResult = localStorage.getItem("ASRS_Result");

      // If the result is not found in localStorage, return an error or alert
      if (!storedASRSResult) {
        alert("ASRS result not found. Please complete the survey.");
        return;
      }

      // Parse the stored result (assuming it's stored as JSON)
      const asrsResult = JSON.parse(storedASRSResult).result;

      // Send the ASRS result from localStorage in the POST request
      await axios.post(`${baseURL}asrs_result`, { asrs_result: asrsResult });

      const ws = new WebSocket(`${baseURL.replace("http", "ws")}start_session`);
      setWebSocket(ws);

      ws.onopen = () => {
        console.log("WebSocket connection established.");
        setIsSessionActive(true); // Change status to "Monitoring"

        // Sending frames every 200ms for better accuracy
        if (!intervalRef.current) {
          intervalRef.current = setInterval(() => sendFrame(ws), 200); // Send frames every 200ms
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
        stopSession(); // Cleanup
      };
    } catch (error) {
      console.error("Error starting session:", error);
    }
  };

  // Stop session function
  const stopSession = async () => {
    try {
      if (webSocket) {
        webSocket.close();
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Clear interval
        intervalRef.current = null;
      }

      const response = await axios.post(`${baseURL}stop_session`);
      console.log("Final result:", response.data);

      setFinalResult(response.data); // Set the final result

      // Save final result to localStorage
      localStorage.setItem("finalResult", JSON.stringify(response.data));

      setShowPopup(true); // Show the popup

      setIsSessionActive(false); // Change status to "Stopped"
    } catch (error) {
      console.error("Error stopping session:", error);
    }
  };

  // Send frame to the server
  const sendFrame = (ws) => {
    if (videoRef.current && ws.readyState === WebSocket.OPEN) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext("2d");

      // Capture the current frame
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // Send the frame to the backend as a JPEG blob
      canvas.toBlob(
        (blob) => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(blob); // Send captured frame
          }
        },
        "image/jpeg",
        0.7 // Compress the image to improve network performance
      );
    }
  };

  // Optionally retrieve the result from localStorage on component mount
  useEffect(() => {
    const savedResult = localStorage.getItem("finalResult");
    if (savedResult) {
      setFinalResult(JSON.parse(savedResult));
    }
  }, []);

  return (
    <div
      className="w-full z-[100] h-[4.25rem] p-2 px-8 flex items-center justify-between"
      style={{ boxShadow: "3px 1px 5.8px rgba(0, 0, 0, 0.25)" }}
    >
      {/* Monitoring status */}
      <div className="flex items-center gap-1">
        <div
          className={`rounded-full w-3 h-3 mb-0.5 ${isSessionActive ? "bg-green-500" : "bg-red-600"}`}
          style={{ animation: isSessionActive ? "blink 10s infinite" : "none" }}
        />
        <div className="font-josfin-sans text-sm">{isSessionActive ? "Monitoring" : "Stopped"}</div>
      </div>

      {/* Control buttons */}
      <div className="flex items-center gap-6">
        <button
          className="font-inter text-sm px-4 py-1.5 bg-green-500 text-white rounded-xl"
          onClick={startSession}
          disabled={isSessionActive || !isStudyRoute} // Disable if not on /study
          style={{ pointerEvents: isSessionActive || !isStudyRoute ? "none" : "auto", opacity: 1 }}
        >
          Start Session
        </button>
        <button
          className="font-inter text-sm px-4 py-1.5 bg-red-500 text-white rounded-xl"
          onClick={stopSession}
          disabled={!isSessionActive || !isStudyRoute} // Disable if not on /study
          style={{ pointerEvents: !isSessionActive || !isStudyRoute ? "none" : "auto", opacity: 1 }}
        >
          Stop Session
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <div className="flex items-center cursor-pointer gap-2" onClick={toggleDropdown}>
            <img
              src="https://cdn-icons-png.freepik.com/512/219/219966.png"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-josfin-sans text-sm">Hi, Danuja</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>

          {dropdownVisible && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-[101]">
              <ul className="py-1">
                <li>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => console.log("User Account clicked")}
                  >
                    User Account
                  </button>
                </li>
                <li>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => console.log("Logout clicked")}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Hidden video element for background streaming */}
      <video ref={videoRef} className="hidden" autoPlay />

      {/* Popup Modal */}
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

                {/* Emotion Distribution DonutChart */}
                <h3 className="font-bold mt-4">Emotion Distribution:</h3>
                {finalResult.emotion_distribution ? (
                  <DonutChart emotionDistribution={finalResult.emotion_distribution} />
                ) : (
                  <p>No emotion data available</p>
                )}
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

export default Navbar;
