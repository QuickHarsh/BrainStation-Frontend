import { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import useFetchData from "@/hooks/fetch-data";
import { getQuestions } from "@/service/question";
import { switchView } from "@/store/lecturesSlice";
import { showMCQPane } from "@/store/mcqSlice";
import { nextQuiz, setQuizzesForLecture } from "@/store/quizzesSlice";
import QuizCard from "../cards/quiz-card";
import AnimatingDots from "../common/animating-dots";
import LeftArrowLongIcon from "../icons/left-arrow-long-icon";

const QuizList = () => {
  const dispatch = useDispatch();
  const { currentLectureId } = useSelector((state) => state.lectures);
  const quizzes = useSelector((state) => state.quizzes.quizzes);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const questionsData = useFetchData(getQuestions, { "filter[lectureId]": currentLectureId });

  useEffect(() => {
    if (questionsData && questionsData.success) {
      dispatch(setQuizzesForLecture(questionsData.data.docs));
      setLoading(false);
    } else if (questionsData && !questionsData.success) {
      setError("Failed to fetch questions");
      setLoading(false);
    }
  }, [questionsData, dispatch, quizzes]);

  const handleBackClick = () => {
    dispatch(switchView("lecturer"));
  };

  const handlePracticeClick = () => {
    dispatch(showMCQPane());
    dispatch(nextQuiz());
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <AnimatingDots />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

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
        {quizzes.length > 0 ? (
          quizzes.map((quiz, index) => <QuizCard key={index} question={quiz.question} answer={quiz.answer} />)
        ) : (
          <p className="text-center mt-10 text-lg font-medium text-gray-400">No questions available!</p>
        )}
      </Scrollbars>
    </div>
  );
};

export default QuizList;
