import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import axios from "axios";
import SurveyModal from "@/components/emotion/asrs-form";
import {
  checkAssrsResultAge,
  checkAssrsResultExists,
  createAssrsResult,
  getAssrsResultByUser,
  updateAssrsResult
} from "@/service/asrs";
import { getClassificationFeedback, saveSession } from "@/service/session";
import image01 from "../badges/01.png";
import image02 from "../badges/02.png";
import image03 from "../badges/03.png";
import image04 from "../badges/04.png";
import image05 from "../badges/05.png";
import image06 from "../badges/06.png";
import image07 from "../badges/07.png";
import image08 from "../badges/08.png";
import ScrollView from "../common/scrollable-view";

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
  const [isBarVisible, setIsBarVisible] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const toggleBarVisibility = () => setIsBarVisible(!isBarVisible);

  const baseURL = import.meta.env.VITE_BRAINSTATION_EMOTIONURL;

  const fetchFeedback = async (classification) => {
    try {
      const response = await getClassificationFeedback({
        classification
      });
      setFeedback(response.data?.feedback);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  useEffect(() => {
    if (showPopup && finalResult.final_classification) {
      fetchFeedback(finalResult.final_classification);
    }
  }, [showPopup, finalResult]);

  const getImageSource = (classification) => {
    switch (classification) {
      case "ADHD symptoms with emotional and head movement alterations":
        return image01;
      case "ADHD symptoms with emotional alterations":
        return image02;
      case "ADHD symptoms with head movement alterations":
        return image03;
      case "ADHD symptoms detected, consider monitoring":
        return image04;
      case "No ADHD symptoms with emotional and head movement alterations":
        return image05;
      case "No ADHD symptoms with emotional alterations":
        return image06;
      case "No ADHD symptoms with head movement alterations":
        return image07;
      case "No ADHD symptoms":
        return image08;
      default:
        return null;
    }
  };

  const showConfetti = [
    "No ADHD symptoms with emotional and head movement alterations",
    "No ADHD symptoms with emotional alterations",
    "No ADHD symptoms with head movement alterations",
    "No ADHD symptoms"
  ];

  const fetchASRSResultForSession = async () => {
    const { exists } = await checkAssrsResultExists();
    if (exists) {
      const isCurrent = await checkAssrsResultAge();
      if (isCurrent) {
        const asrsResult = await getAssrsResultByUser();
        return asrsResult?.data?.assrsResult;
      } else {
        setShowSurvey(true);
        return null;
      }
    } else {
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
      console.log("Final result:", response.data);

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
        const updatedResult = await updateAssrsResult({ asrs_result: "Positive" });
        const asrsValue = updatedResult?.data;
        startSession(asrsValue);
      } else {
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
        className={`absolute top-4 right-4 min-w-[17rem] z-[50] rounded-md p-4 transition-all duration-300 ease-in-out ${
          isBarVisible ? "max-h-[200px] bg-white shadow-lg" : "max-h-[50px] bg-primary-paper shadow-sm"
        }`}
      >
        <div className="flex">
          <div className="flex items-center gap-1">
            <div className={`w-2.5 h-2.5 rounded-full`} style={{ backgroundColor: dotColor }}></div>
            <p className="text-sm">{sessionStatus}</p>
          </div>
          <button className="ml-auto text-sm text-gray-500 hover:text-gray-700" onClick={toggleBarVisibility}>
            {isBarVisible ? "Hide" : "Show"}
          </button>
        </div>

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
        <>
          {showConfetti.includes(finalResult.final_classification) && (
            <div className="fixed inset-0 z-[1000] pointer-events-none">
              <Confetti width={window.innerWidth} height={window.innerHeight} />
            </div>
          )}
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[200]">
            <div className="absolute top-1/2 left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg text-center w-[30rem]">
              {finalResult.message ? (
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4 text-red-600">Sorry!</h2>
                  <p className="text-lg mb-2 text-gray-700">
                    {finalResult.message || "Session duration too short to determine ADHD symptoms."}
                  </p>
                  <p className="text-sm text-gray-500">
                    Please ensure your session lasts longer than 1 minute for accurate assessment.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold mb-6 text-gray-800">Final Result</h2>
                  <ScrollView initialMaxHeight="14rem">
                    <div className="text-center space-y-4">
                      {/* Badge Image */}
                      {finalResult.final_classification && (
                        <img
                          src={getImageSource(finalResult.final_classification)}
                          alt={finalResult.final_classification}
                          className="mx-auto mb-2  w-48 h-48 "
                        />
                      )}

                      {/* Statistics */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-lg shadow-sm">
                          <p className="text-md font-medium text-gray-600">Focus Time:</p>
                          <p className="text-lg font-semibold text-gray-800">
                            {finalResult.focus_time?.toFixed(2) || 0} s
                          </p>
                        </div>
                        <div className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-lg shadow-sm">
                          <p className="text-md font-medium text-gray-600">Total Movements:</p>
                          <p className="text-lg font-semibold text-gray-800">{finalResult.total_movements || 0}</p>
                        </div>
                        <div className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-lg shadow-sm">
                          <p className="text-md font-medium text-gray-600">Erratic Movements:</p>
                          <p className="text-lg font-semibold text-gray-800">{finalResult.erratic_movements || 0}</p>
                        </div>
                        <div className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-lg shadow-sm">
                          <p className="text-md font-medium text-gray-600">Erratic Percentage:</p>
                          <p className="text-lg font-semibold text-gray-800">
                            {finalResult.erratic_percentage?.toFixed(2) || 0}%
                          </p>
                        </div>
                      </div>

                      {/* Feedback */}
                      {feedback && (
                        <div className="px-4 py-3 mt-5 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg text-left">
                          <p className="text-lg font-medium text-yellow-700">
                            <strong>Feedback:</strong> {feedback}
                          </p>
                        </div>
                      )}
                    </div>
                  </ScrollView>
                </>
              )}

              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 mt-4"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SessionControl;
