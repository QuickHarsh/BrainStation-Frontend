import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeedbackCard from "@/components/cards/feedback-card";
import DialogBox from "@/components/common/dialog";
import ScrollView from "@/components/common/scrollable-view";
import QuestionCounter from "@/components/quiz-deck/question-counter";
import QuestionLongCard from "@/components/quiz-deck/question-long-card";
import MCQDuePane from "@/components/quiz/mcq-due-pane";
import { hideDialog } from "@/store/dialogSlice";
import { switchToQuizDeck } from "@/store/lecturesSlice";
import { hideMCQPane } from "@/store/mcqSlice";

const QuizDeck = () => {
  const dispatch = useDispatch();
  const isMCQPaneVisible = useSelector((state) => state.mcq.isMCQPaneVisible);
  const visibleDialogId = useSelector((state) => state.dialog.visibleDialogId);
  const { selectedLectureSummary, blur } = useSelector((state) => state.lectureSummary);

  useEffect(() => {
    dispatch(switchToQuizDeck());
  }, [dispatch]);

  const handleCloseDialog = () => {
    dispatch(hideDialog({ dialogId: "quiz-deck" }));
  };

  const handleCloseMCQPane = () => {
    dispatch(hideMCQPane());
  };

  return (
    <div className="relative px-8 py-8 h-full">
      {blur && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#ffffff80] bg-opacity-90 z-10">
          <p className="text-gray-700 text-lg font-semibold">Please select a lecture to view quiz details.</p>
        </div>
      )}
      <div className={`h-full ${blur ? "blur-sm pointer-events-none" : ""}`}>
        <h3 className="text-gray-900 text-xl font-inter font-semibold">
          {selectedLectureSummary?.lectureTitle || "Select a Lecture"}
        </h3>

        <ScrollView initialMaxHeight="10rem">
          <div className="mt-4">
            <QuestionCounter
              total={selectedLectureSummary?.totalQuizzes || 0}
              lapsed={selectedLectureSummary?.lapsedCount || 0}
              review={selectedLectureSummary?.reviewCount || 0}
            />
          </div>

          <p className="text-gray-900 text-lg font-inter mt-4">Recent Feedback based on performance</p>
          <div className="bg-gray-100 mt-4 p-4 rounded-xl grid grid-cols-1 gap-2">
            {selectedLectureSummary?.feedback?.strength.length || selectedLectureSummary?.feedback?.weakness.length ? (
              <>
                <FeedbackCard
                  title="What I'm Best At"
                  items={selectedLectureSummary.feedback.strength}
                  bgColor="bg-[#BEDCC3]"
                  noItemsText="No strengths identified."
                />
                <FeedbackCard
                  title="What to Focus On"
                  items={selectedLectureSummary.feedback.weakness}
                  bgColor="bg-[#F5ECAB]"
                  noItemsText="No weaknesses identified."
                />
              </>
            ) : (
              <p className="text-gray-600 text-sm">
                There’s no feedback available here. Practice on quizzes to get valuable feedback.
              </p>
            )}
          </div>

          <p className="mt-4 text-lg text-gray-900">All Questions Available</p>
          <div className="my-4 grid gap-4">
            {selectedLectureSummary?.questions?.length > 0 ? (
              selectedLectureSummary.questions.map((question, index) => (
                <QuestionLongCard key={index} questionText={question.questionText} answer={question.answer} />
              ))
            ) : (
              <p className="text-gray-500 text-sm">No questions available for this lecture.</p>
            )}
          </div>
        </ScrollView>

        {isMCQPaneVisible && <MCQDuePane isVisible={isMCQPaneVisible} onClose={handleCloseMCQPane} />}
        <DialogBox
          isVisible={visibleDialogId === "quiz-deck"}
          title="No quizzes available"
          message="There are no quizzes available for practice."
          onOkay={handleCloseDialog}
          isHideCancel
        />
      </div>
    </div>
  );
};

export default QuizDeck;
