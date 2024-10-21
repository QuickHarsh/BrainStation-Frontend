import { formatDistanceToNow } from "date-fns";

const SummeryTable = ({ tableData }) => {
  const formatDateWithDays = (data) => {
    const { nextReviewDate, currentStep, learningSteps, status } = data;

    if (status === "new" || status === "lapsed") {
      // Calculate minutes until the next review based on current step and learning steps
      if (learningSteps && learningSteps[currentStep] !== undefined) {
        const minutesToNextReview = learningSteps[currentStep];
        return {
          formattedDate: `${minutesToNextReview} minutes to next review`,
          daysRemaining: `${minutesToNextReview} minutes`
        };
      } else {
        return {
          formattedDate: "Learning steps not available",
          daysRemaining: "N/A"
        };
      }
    }

    // Fallback for statuses other than "new" or "lapsed"
    if (!nextReviewDate) {
      return {
        formattedDate: "N/A",
        daysRemaining: "N/A"
      };
    }

    try {
      const date = new Date(nextReviewDate);
      if (isNaN(date.getTime())) {
        return {
          formattedDate: "Invalid Date",
          daysRemaining: "N/A"
        };
      }

      const daysRemaining = formatDistanceToNow(date, { addSuffix: false });
      return {
        formattedDate: date.toISOString().slice(0, 10),
        daysRemaining: daysRemaining
      };
    } catch (error) {
      console.error("Error formatting date:", error);
      return {
        formattedDate: "Error",
        daysRemaining: "Error"
      };
    }
  };

  return (
    <div className="flex flex-col">
      <div className="min-w-full inline-block align-middle">
        <div className="border rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="divide-x divide-gray-200">
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                  Question
                </th>
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                  Difficulty
                </th>
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">
                  Next Review Date / Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tableData.map((data, index) => {
                const { formattedDate, daysRemaining } = formatDateWithDays(data);

                return (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      <p>{data.question}</p>
                      <p className="text-xs font-normal text-gray-500">{data.correctAnswer}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{data.difficulty}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{data.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <p>{daysRemaining}</p>
                      <p className="text-xs font-normal text-gray-500">{formattedDate}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SummeryTable;
