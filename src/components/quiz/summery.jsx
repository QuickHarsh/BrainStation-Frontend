import { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";
import { getQuizFeedback } from "@/service/quiz";
import DonutChart from "../charts/donut-chart";
import AnimatingDots from "../common/animating-dots";
import SummeryTable from "./summery-table";

// Import the feedback service

const QuizSummery = ({ onClose, summeryData }) => {
  const practiceHistory = useSelector((state) => state.practice.practiceHistory); // Accessing practice history from the store
  const [feedback, setFeedback] = useState(""); // Store feedback
  const [loading, setLoading] = useState(true); // Loading state for feedback

  useEffect(() => {
    console.log("Summery Data:", summeryData);
    console.log("Practice History from Store:", practiceHistory);

    // Call the feedback service when the component mounts
    const fetchFeedback = async () => {
      setLoading(true); // Start loading

      try {
        const response = await getQuizFeedback({ practiceHistory });
        setFeedback(response.data); // Store the feedback from the response
        console.log("Feedback response:", response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setFeedback("Error retrieving feedback."); // Handle any error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchFeedback(); // Call the function to get feedback
  }, [practiceHistory]);

  return (
    <div>
      <button className="absolute top-4 right-4 text-xl" onClick={onClose}>
        &times;
      </button>
      <h2 className="text-xl font-semibold">Quiz Summary</h2>
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight
        autoHeightMin={0}
        autoHeightMax={"calc(100vh - 150px)"}
        thumbMinSize={30}
        universal={true}
        className="rounded-lg"
      >
        <div className="w-full h-full flex flex-col gap-4 items-center mt-5">
          <DonutChart />
          <p className="text-lg font-inter">{summeryData?.title}</p>
          {/* Feedback Section */}
          <div className="bg-gray-100 w-full min-h-[160px] px-4 py-6 mt-2 rounded-xl">
            <h3 className="text-lg text-gray-600 font-semibold">Feedback</h3>
            {loading ? (
              <div className="w-full h-full mt-5 flex items-center justify-center">
                <AnimatingDots />
              </div>
            ) : (
              <p className="mt-2">{feedback}</p> // Show feedback once it's loaded
            )}
          </div>
          {/* Quiz table */}
          <div className="w-full">
            <SummeryTable tableData={summeryData?.tableData || []} />
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default QuizSummery;
