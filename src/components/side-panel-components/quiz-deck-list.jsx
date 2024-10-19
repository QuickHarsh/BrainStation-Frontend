import { useDispatch } from "react-redux";
import { switchView } from "@/store/lecturesSlice";
import QuizDeckCard from "../cards/quiz-deck-card";
import QuizSummeryCard from "../cards/quize-summery-card";
import ScrollView from "../common/scrollable-view";

const QuizDeckList = () => {
  const dispatch = useDispatch();

  const handleQuizSummaryClick = () => {
    dispatch(switchView("due-quiz")); // Switch view to "due-quiz"
  };

  return (
    <div className="p-2 flex-1 overflow-hidden">
      {/* Heading */}
      <p className="text-md font-inter mb-4 ml-2">QUIZ DECKS</p>
      {/* Quiz Summary Card with onClick */}
      <div onClick={handleQuizSummaryClick} className="cursor-pointer">
        <QuizSummeryCard />
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
