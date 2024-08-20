import Scrollbars from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import { switchView } from "@/store/lecturesSlice";
import { showMCQPane } from "@/store/mcqSlice";
import { nextQuiz } from "@/store/quizzesSlice";
import QuizCard from "../cards/quiz-card";
import LeftArrowLongIcon from "../icons/left-arrow-long-icon";

const QuizList = () => {
  const dispatch = useDispatch();
  const quizzes = useSelector((state) => state.quizzes.quizzes);

  const handleBackClick = () => {
    dispatch(switchView("lecturer"));
  };

  const handlePracticeClick = () => {
    dispatch(showMCQPane());
    dispatch(nextQuiz());
  };

  return (
    <div className="p-2 flex-1 overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between mb-3">
        <button className="bg-primary-gray-light max-w-fit p-2 rounded-full" onClick={handleBackClick}>
          <LeftArrowLongIcon size={3} />
        </button>
        <h3 className="font-josfin-sans text-md uppercase opacity-50">All Quizzes</h3>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-lg font-semibold font-inter">Comprehensive Guide to Data Structures and Algorithms</h4>
        <p className="text-sm font-light">{quizzes.length} total quizzes</p>
      </div>
      <div className="flex justify-end mt-2 pb-4 border-b">
        <button
          className="uppercase text-xs text-white bg-horizontal-gradient py-[0.3rem] px-4 rounded-lg"
          onClick={handlePracticeClick}
        >
          Practice
        </button>
      </div>
      {/* Quizzes */}
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
        {quizzes.map((quiz, index) => (
          <QuizCard key={index} question={quiz.question} answer={quiz.answer} />
        ))}
      </Scrollbars>
    </div>
  );
};

export default QuizList;
