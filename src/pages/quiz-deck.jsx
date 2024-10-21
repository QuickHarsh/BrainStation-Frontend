import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogBox from "@/components/common/dialog";
import MCQDuePane from "@/components/quiz/mcq-due-pane";
import { hideDialog } from "@/store/dialogSlice";
import { switchToQuizDeck } from "@/store/lecturesSlice";
import { hideMCQPane, showMCQPane } from "@/store/mcqSlice";

const QuizDeck = () => {
  const dispatch = useDispatch();
  const isMCQPaneVisible = useSelector((state) => state.mcq.isMCQPaneVisible);
  const visibleDialogId = useSelector((state) => state.dialog.visibleDialogId);

  useEffect(() => {
    dispatch(switchToQuizDeck());
  }, [dispatch]);

  const handleCloseDialog = () => {
    console.log("closing dialog");

    dispatch(hideDialog({ dialogId: "quiz-deck" }));
  };

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
      <DialogBox
        isVisible={visibleDialogId === "quiz-deck"}
        title="No quizzes available"
        message="There are no quizzes available for practice."
        onOkay={handleCloseDialog}
        isHideCancel
      />
    </div>
  );
};

export default QuizDeck;
