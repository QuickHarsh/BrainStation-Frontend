import { useState } from "react";

const SurveyModal = ({ isVisible, onClose, onContinue }) => {
  // State to track which checkbox is selected per row (rowIndex: selectedValue)
  const [selectedValues, setSelectedValues] = useState({});
  const [showIncompletePopup, setShowIncompletePopup] = useState(false);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);
  const [result, setResult] = useState(null);

  const handleCheckboxChange = (rowIndex, columnIndex) => {
    // Set the selected column for the current row (rowIndex)
    setSelectedValues((prev) => ({
      ...prev,
      [rowIndex]: columnIndex
    }));
  };

  // Function to calculate ASRS Score and save result to localStorage
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page refresh

    const answers = Object.values(selectedValues); // Get all selected values (0-4)

    if (answers.length !== 6) {
      setShowIncompletePopup(true); // Display incomplete popup
      return;
    }

    const calculationResult = calculateASRSScore(answers); // Calculate score and determine result
    setResult({
      title: "Thank You For Your Time",
      message: `Let's Start The Lessons`,
      type: calculationResult.result === "Positive" ? "success" : "info"
    });

    // Save result (Positive or Negative) to localStorage
    localStorage.setItem("ASRS_Result", JSON.stringify(calculationResult));

    setShowThankYouPopup(true); // Display thank you popup
  };

  // Function to calculate the ASRS Score
  const calculateASRSScore = (answers) => {
    const totalScore = answers.reduce((acc, val) => acc + val, 0);
    const threshold = 14;
    const result = totalScore >= threshold ? "Positive" : "Negative";
    return { score: totalScore, result: result };
  };

  // Close popup handler
  const handleCloseIncompletePopup = () => {
    setShowIncompletePopup(false);
  };

  const handleContinue = () => {
    setShowThankYouPopup(false);
    onClose(); // Close the survey modal when "Continue" is clicked
    onContinue(); // Trigger continue callback (e.g., start the lesson)
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main Survey Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
        <div className="bg-white p-8 rounded shadow-lg w-2/3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Survey Form</h2>
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

              {/* Table Body with Questions and Checkboxes */}
              <tbody>
                {[
                  "How often do you attend lectures?",
                  "How often do you ask questions during lectures?",
                  "How often do you complete your assignments on time?",
                  "How often do you review lecture notes after class?",
                  "How often do you participate in class discussions?",
                  "How often do you use additional resources for learning?"
                ].map((question, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="border border-gray-300 p-2">{question}</td>
                    {[...Array(5)].map((_, columnIndex) => (
                      <td key={columnIndex} className="border border-gray-300 text-center">
                        <input
                          type="checkbox"
                          checked={selectedValues[rowIndex] === columnIndex}
                          onChange={() => handleCheckboxChange(rowIndex, columnIndex)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 text-right">
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Incomplete Popup */}
      {showIncompletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1100]">
          <div className="bg-white p-6 rounded shadow-lg text-center w-[400px] border-l-8 border-red-400">
            <h2 className="text-lg font-bold mb-4">Incomplete Survey</h2>
            <p className="mb-4">Please answer all questions before submitting.</p>
            <button
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              onClick={handleCloseIncompletePopup}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Thank You Popup */}
      {showThankYouPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1100]">
          <div className="bg-white p-6 rounded shadow-lg text-center w-[400px] border-l-8 border-blue-400">
            <h2 className="text-lg font-bold mb-4">{result.title}</h2>
            <p className="mb-4">{result.message}</p>
            <button className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SurveyModal;
