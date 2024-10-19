import Scrollbars from "react-custom-scrollbars-2";
import QuizDeckCard from "../cards/quiz-deck-card";
import QuizSummeryCard from "../cards/quize-summery-card";

const QuizDeckList = () => {
  return (
    <div className="p-2 flex-1 overflow-hidden">
      {/* Heading */}
      <p className="text-md font-inter mb-4 ml-2">QUIZ DECKS</p>
      {/* Quiz Summery card */}
      <QuizSummeryCard />
      {/* devider */}
      <div className="w-full border-b mt-4" />
      <p className="uppercase text-[#C5C5C5]">All</p>
      {/* QuizCards */}
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight
        autoHeightMin={0}
        autoHeightMax={"calc(100vh - 280px)"}
        thumbMinSize={30}
        universal={true}
        className="rounded-lg"
      >
        <QuizDeckCard />
        <QuizDeckCard />
        <QuizDeckCard />
        <QuizDeckCard />
        <QuizDeckCard />
        <QuizDeckCard />
        <QuizDeckCard />
        <QuizDeckCard />
        <QuizDeckCard />
        <QuizDeckCard />
        <QuizDeckCard />
        <QuizDeckCard />
        <QuizDeckCard />
        <QuizDeckCard />
        <QuizDeckCard />
        <QuizDeckCard />
        <QuizDeckCard />
        <QuizDeckCard />
      </Scrollbars>
    </div>
  );
};

export default QuizDeckList;
