import { useEffect, useState } from "react";
import { getAlternativeAssrsQuestions } from "@/service/asrs";
import { Loader } from "..";

// Import the new API function

const SurveyModal = ({ isVisible, onClose, onContinue }) => {
  const [surveyData, setSurveyData] = useState({});
  const [questions, setQuestions] = useState([]); // State to store fetched questions
  const [errorMessage, setErrorMessage] = useState("");
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsLoading(true);
      getAlternativeAssrsQuestions()
        .then((response) => {
          console.log("API Response:", response.data); // Log the response to check its structure

          const questionList = response.data.alternatives; // Access the alternatives array

          if (Array.isArray(questionList)) {
            setQuestions(questionList);
            setSurveyData(questionList.reduce((acc, _, index) => ({ ...acc, [`question${index + 1}`]: null }), {}));
          } else {
            console.error("Unexpected response format:", response.data);
            setQuestions([]); // Clear questions if format is incorrect
          }
        })
        .catch((error) => {
          console.error("Failed to fetch questions:", error);
          setQuestions([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isVisible]);

  const handleChange = (questionKey, value) => {
    setSurveyData((prevData) => ({
      ...prevData,
      [questionKey]: value
    }));
  };

  const validateSurvey = () => {
    return Object.values(surveyData).every((value) => value !== null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateSurvey()) {
      setErrorMessage("Please answer all questions before submitting.");
      return;
    }

    setErrorMessage("");
    setShowThankYouPopup(true);
    onContinue(surveyData);
  };

  if (!isVisible) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
        <Loader />
      </div>
    );
  }

  return (
    <>
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
              <thead>
                <tr>
                  <th className="border border-gray-300 w-1/2"></th>
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

              <tbody>
                {questions.map((question, index) => (
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
