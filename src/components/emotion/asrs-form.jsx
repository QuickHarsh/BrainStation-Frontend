import { useState } from "react";

const SurveyModal = ({ isVisible, onClose, onContinue }) => {
  const [surveyData, setSurveyData] = useState({
    question1: null,
    question2: null,
    question3: null,
    question4: null,
    question5: null,
    question6: null
  });

  const [errorMessage, setErrorMessage] = useState(""); // State to handle incomplete submission
  const [showThankYouPopup, setShowThankYouPopup] = useState(false); // State to control "Thank You" popup visibility

  if (!isVisible) return null;

  // Helper function to handle changes in survey answers
  const handleChange = (questionKey, value) => {
    setSurveyData((prevData) => ({
      ...prevData,
      [questionKey]: value
    }));
  };

  // Function to validate if all questions are answered
  const validateSurvey = () => {
    return Object.values(surveyData).every((value) => value !== null);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateSurvey()) {
      setErrorMessage("Please answer all questions before submitting.");
      return;
    }

    setErrorMessage(""); // Clear error message
    setShowThankYouPopup(true); // Show the "Thank You" popup
    onContinue(surveyData); // Call the parent function to continue after survey is completed
  };

  return (
    <>
      {/* Main Survey Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
        <div className="bg-white p-8 rounded shadow-lg w-2/3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">ASRS Survey</h2>
            <button onClick={onClose} className="text-red-500">
              Close
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <table className="table-auto w-full border-collapse border border-gray-300">
              {/* Table Header */}
              <thead>
                <tr>
                  <th className="border border-gray-300 w-1/2"></th> {/* Blank header */}
                  <th className="border border-gray-300 p-2" style={{ height: "150px" }}>
                    <div className="transform -rotate-90 flex items-center justify-center h-full">Never</div>
                  </th>
                  <th className="border border-gray-300 p-2" style={{ height: "150px" }}>
                    <div className="transform -rotate-90 flex items-center justify-center h-full">Rarely</div>
                  </th>
                  <th className="border border-gray-300 p-2" style={{ height: "150px" }}>
                    <div className="transform -rotate-90 flex items-center justify-center h-full">Sometimes</div>
                  </th>
                  <th className="border border-gray-300 p-2" style={{ height: "150px" }}>
                    <div className="transform -rotate-90 flex items-center justify-center h-full">Often</div>
                  </th>
                  <th className="border border-gray-300 p-2" style={{ height: "150px" }}>
                    <div className="transform -rotate-90 flex items-center justify-center h-full">Very Often</div>
                  </th>
                </tr>
              </thead>

              {/* Table Body with Questions */}
              <tbody>
                {[
                  "How often do you attend lectures?",
                  "How often do you ask questions during lectures?",
                  "How often do you complete your assignments on time?",
                  "How often do you review lecture notes after class?",
                  "How often do you participate in class discussions?",
                  "How often do you use additional resources for learning?"
                ].map((question, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{question}</td>
                    {[...Array(5)].map((_, columnIndex) => (
                      <td key={columnIndex} className="border border-gray-300 text-center">
                        <input
                          type="radio"
                          name={`question${index + 1}`}
                          value={columnIndex}
                          onChange={() => handleChange(`question${index + 1}`, columnIndex)}
                          required
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

            <div className="mt-4 text-right">
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Thank You Popup (after survey completion) */}
      {showThankYouPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1100]">
          <div className="bg-white p-6 rounded shadow-lg text-center w-[400px] border-l-8 border-blue-400">
            <h2 className="text-lg font-bold mb-4">Thank You For Your Time</h2>
            <p className="mb-4">Let&apos;s Start The Lessons</p>
            <button
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
              onClick={() => setShowThankYouPopup(false)}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SurveyModal;
