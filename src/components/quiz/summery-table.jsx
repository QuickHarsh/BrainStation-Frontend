import { formatDistanceToNow } from "date-fns";

// You can use date-fns for easy date manipulation

const SummeryTable = ({ tableData }) => {
  const formatDateWithDays = (nextReviewDate) => {
    const date = new Date(nextReviewDate);
    const daysRemaining = formatDistanceToNow(date, { addSuffix: false }); // Calculate the days remaining
    return {
      formattedDate: date.toISOString().slice(0, 10), // Extracting the date in 'YYYY-MM-DD' format
      daysRemaining: daysRemaining
    };
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
                const { formattedDate, daysRemaining } = formatDateWithDays(data.nextReviewDate);

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
