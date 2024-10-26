import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getQuizFeedback, getQuizzes } from "@/service/quiz";
import FeedbackCard from "../cards/feedback-card";
import DonutChart from "../charts/donut-chart";
import AnimatingDots from "../common/animating-dots";
import ScrollView from "../common/scrollable-view";
import SummeryTable from "./summery-table";

const QuizSummery = ({ onClose, summeryData, isFromDue = false }) => {
  const practiceHistory = useSelector((state) => state.practice.practiceHistory);
  const { currentLectureId } = useSelector((state) => state.lectures);
  const userId = localStorage.getItem("userId").replace(/"/g, "");
  const [feedback, setFeedback] = useState({ strength: [], weakness: [] });
  const [loading, setLoading] = useState(true);
  const [mergedData, setMergedData] = useState([]);

  const fetchFeedbackAndQuizzes = async () => {
    setLoading(true);

    try {
      const feedbackResponse = await getQuizFeedback(
        currentLectureId,
        { practiceHistory },
        { from: isFromDue ? "due" : "lecture" }
      );
      setFeedback(feedbackResponse.data[0] || { strength: [], weakness: [] });

      const filters = {
        "filter[userId]": userId,
        "filter[lectureId]": currentLectureId
      };

      if (isFromDue) {
        delete filters["filter[lectureId]"];
      }

      const quizResponse = await getQuizzes(filters);

      const quizzes = quizResponse.data.docs;

      const mergedData = practiceHistory.map((practice) => {
        const matchedQuiz = quizzes.find((quiz) => quiz.questionDetails.question === practice.question);

        return {
          ...practice,
          status: matchedQuiz ? matchedQuiz.status : "N/A",
          nextReviewDate: matchedQuiz ? matchedQuiz.next_review_date : "N/A",
          currentStep: matchedQuiz ? matchedQuiz.current_step : "N/A",
          learningSteps: matchedQuiz ? matchedQuiz.learningSteps : "N/A"
        };
      });

      setMergedData(mergedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setFeedback({ strength: [], weakness: ["Error retrieving feedback."] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbackAndQuizzes();
  }, [practiceHistory, currentLectureId, userId]);

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
      <ScrollView initialMaxHeight={"140px"}>
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
      </ScrollView>
    </div>
  );
};

export default QuizSummery;
