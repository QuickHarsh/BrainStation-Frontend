// QuizDeckList.jsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getQuizzesDueDetails } from "@/service/quiz";
import { switchView } from "@/store/lecturesSlice";
import QuizDeckCard from "../cards/quiz-deck-card";
import QuizSummeryCard from "../cards/quize-summery-card";
import ScrollView from "../common/scrollable-view";
import QuizDeckListSkeleton from "../skeletons/quiz-deck-list";

const QuizDeckList = () => {
  const dispatch = useDispatch();
  const [quizDetails, setQuizDetails] = useState({ dueTodayCount: 0, learningPhaseCount: 0 });
  const [loading, setLoading] = useState(true);

  // Fetch quiz due details on mount
  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await getQuizzesDueDetails();
        setQuizDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch quiz due details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizDetails();
  }, []);

  const handleQuizSummaryClick = () => {
    dispatch(switchView("due-quiz"));
  };

  if (loading) {
    return <QuizDeckListSkeleton />;
  }

  return (
    <div className="p-2 flex-1 overflow-hidden">
      {/* Heading */}
      <p className="text-md font-inter mb-4 ml-2">QUIZ DECKS</p>
      {/* Quiz Summary Card with onClick */}
      <div onClick={handleQuizSummaryClick} className="cursor-pointer">
        <QuizSummeryCard
          dueTodayCount={quizDetails.dueTodayCount}
          learningPhaseCount={quizDetails.learningPhaseCount}
        />
      </div>
      {/* Divider */}
      <div className="w-full border-b mt-4" />
      <p className="uppercase text-[#C5C5C5]">All</p>
      {/* Quiz Cards */}
      <ScrollView initialMaxHeight="340px">
        {Array.from({ length: 10 }).map((_, index) => (
          <QuizDeckCard key={index} />
        ))}
      </ScrollView>
    </div>
  );
};

export default QuizDeckList;
