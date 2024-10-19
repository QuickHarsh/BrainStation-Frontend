import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MCQDuePane from "@/components/quiz/mcq-due-pane";
import { switchToQuizDeck } from "@/store/lecturesSlice";
import { hideMCQPane, showMCQPane } from "@/store/mcqSlice";

const QuizDeck = () => {
  const dispatch = useDispatch();
  const isMCQPaneVisible = useSelector((state) => state.mcq.isMCQPaneVisible);

  useEffect(() => {
    dispatch(switchToQuizDeck());
  }, [dispatch]);

  const handlePracticeClick = () => {
    dispatch(showMCQPane());
  };

  const handleCloseMCQPane = () => {
    dispatch(hideMCQPane());
  };

  return (
    <div className="flex justify-center items-center h-full">
      <button className="bg-primary px-4 py-2 rounded text-white" onClick={handlePracticeClick}>
        Practice Quizzes
      </button>
      {isMCQPaneVisible && <MCQDuePane isVisible={isMCQPaneVisible} onClose={handleCloseMCQPane} />}
    </div>
  );
};

export default QuizDeck;
