import { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";
import { getQuizFeedback, getQuizzes } from "@/service/quiz";
import DonutChart from "../charts/donut-chart";
import AnimatingDots from "../common/animating-dots";
import SummeryTable from "./summery-table";

const QuizSummery = ({ onClose, summeryData }) => {
  const practiceHistory = useSelector((state) => state.practice.practiceHistory); // Accessing practice history from the store
  const { currentLectureId } = useSelector((state) => state.lectures); // Get current lectureId from store
  const userId = "66d97b6fc30a1f78cf41b620"; // Static userId for now
  const [feedback, setFeedback] = useState(""); // Store feedback
  const [loading, setLoading] = useState(true); // Loading state for feedback
  const [mergedData, setMergedData] = useState([]); // State to hold merged data

  useEffect(() => {
    const fetchFeedbackAndQuizzes = async () => {
      setLoading(true); // Start loading

      try {
        // Fetch feedback
        const feedbackResponse = await getQuizFeedback({ practiceHistory });
        setFeedback(feedbackResponse.data);

        // Fetch quiz data from the quizzes API
        const quizResponse = await getQuizzes({
          "filter[userId]": userId,
          "filter[lectureId]": currentLectureId
        });

        const quizzes = quizResponse.data.docs;
        console.log("Fetched Quiz data:", quizzes);

        // Merge practice history with quiz data
        const mergedData = practiceHistory.map((practice) => {
          const matchedQuiz = quizzes.find((quiz) => quiz.questionDetails.question === practice.question);

          return {
            ...practice,
            status: matchedQuiz ? matchedQuiz.status : "N/A",
            nextReviewDate: matchedQuiz ? matchedQuiz.next_review_date : "N/A"
          };
        });

        setMergedData(mergedData); // Set merged data
      } catch (error) {
        console.error("Error fetching data:", error);
        setFeedback("Error retrieving feedback.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchFeedbackAndQuizzes(); // Call the function to get feedback and quizzes
  }, [practiceHistory, currentLectureId, userId]);

  if (loading) {
    return (
      <div className="w-full h-full mt-5 flex items-center justify-center">
        <AnimatingDots />
      </div>
    );
  }

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
          <div className="bg-gray-100 w-full min-h-[160px] px-4 py-6 mt-2 rounded-xl">
            <h3 className="text-lg text-gray-600 font-semibold">Feedback</h3>
            <p className="mt-2">{feedback}</p>
          </div>
          {/* Quiz table */}
          <div className="w-full">
            <SummeryTable tableData={mergedData} />
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default QuizSummery;
