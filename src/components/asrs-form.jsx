import { useState } from "react";

const SurveyModal = ({ isVisible, onClose }) => {
  // State to track which checkbox is selected per row
  const [selectedValues, setSelectedValues] = useState({});

  const handleCheckboxChange = (rowIndex, columnIndex) => {
    // Set the selected column for the current row
    setSelectedValues((prev) => ({
      ...prev,
      [rowIndex]: columnIndex
    }));
  };

  // Always call hooks first, then handle conditional rendering
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div className="bg-white p-8 rounded shadow-lg w-2/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Survey Form</h2>
          <button onClick={onClose} className="text-red-500">
            Close
          </button>
        </div>

        <form>
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
  );
};

// Make sure this is a default export
export default SurveyModal;
