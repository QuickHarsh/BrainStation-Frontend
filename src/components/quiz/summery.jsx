import { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";
import { getQuizFeedback, getQuizzes } from "@/service/quiz";
import FeedbackCard from "../cards/feedback-card";
import DonutChart from "../charts/donut-chart";
import AnimatingDots from "../common/animating-dots";
import SummeryTable from "./summery-table";

const QuizSummery = ({ onClose, summeryData }) => {
  const practiceHistory = useSelector((state) => state.practice.practiceHistory);
  const { currentLectureId } = useSelector((state) => state.lectures);
  const userId = "66d97b6fc30a1f78cf41b620";
  const [feedback, setFeedback] = useState({ strength: [], weakness: [] }); // Set default arrays
  const [loading, setLoading] = useState(true);
  const [mergedData, setMergedData] = useState([]);

  const fetchFeedbackAndQuizzes = async () => {
    setLoading(true); // Start loading

    try {
      // Fetch feedback
      const feedbackResponse = await getQuizFeedback({ practiceHistory });
      setFeedback(feedbackResponse.data[0] || { strength: [], weakness: [] }); // Ensure feedback has valid arrays

      // Fetch quiz data from the quizzes API
      const quizResponse = await getQuizzes({
        "filter[userId]": userId,
        "filter[lectureId]": currentLectureId
      });

      const quizzes = quizResponse.data.docs;

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
      setFeedback({ strength: [], weakness: ["Error retrieving feedback."] });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchFeedbackAndQuizzes();
  }, [practiceHistory, currentLectureId, userId]);

  // Calculate correct and incorrect answers from practice history
  const correctAnswers = practiceHistory.filter((item) => item.difficulty !== "wrong").length;
  const incorrectAnswers = practiceHistory.filter((item) => item.difficulty === "wrong").length;

  const donutData = [
    { name: "Correct", value: correctAnswers },
    { name: "Incorrect", value: incorrectAnswers }
  ];

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
          <DonutChart data={donutData} />
          <p className="text-lg font-inter">{summeryData?.title}</p>
          <div className="bg-gray-100 w-full min-h-[160px] px-4 py-6 mt-2 rounded-xl relative pt-10">
            <h3 className="text-lg text-gray-600 font-semibold absolute top-2 left-4">Feedback</h3>
            <div className="grid grid-cols-1 gap-2">
              {/* Reusable FeedbackSection for Strengths */}
              <FeedbackCard
                title={`What I'm Best At`}
                items={feedback.strength}
                bgColor="bg-[#BEDCC3]"
                noItemsText="No strengths identified."
              />
              {/* Reusable FeedbackSection for Weaknesses */}
              <FeedbackCard
                title="What to Focus On"
                items={feedback.weakness}
                bgColor="bg-[#F5ECAB]"
                noItemsText="No weaknesses identified."
              />
            </div>
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
