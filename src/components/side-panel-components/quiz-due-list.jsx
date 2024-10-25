import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { checkIfLocked } from "@/helper/checkLockedQuizzes";
import { getQuizzesDueByToday } from "@/service/quiz";
import { showDialog } from "@/store/dialogSlice";
import { switchView } from "@/store/lecturesSlice";
import { showMCQPane } from "@/store/mcqSlice";
import { setDueQuizzes } from "@/store/quizzesDueSlice";
import DueQuizCard from "../cards/due-quiz-card";
import Button from "../common/button";
import ScrollView from "../common/scrollable-view";
import Tabs from "../common/tabs";
import LeftArrowLongIcon from "../icons/left-arrow-long-icon";
import QuizDueListSkeleton from "../skeletons/quiz-due-list";

const QuizDueList = () => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("all-due");
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const shouldRefreshQuizzes = useSelector((state) => state.quizzesDue.shouldRefreshQuizzes); // Listen to refresh flag

  const handleBackClick = () => {
    dispatch(switchView("quiz-deck"));
  };

  const [quizStats, setQuizStats] = useState({
    new: 0,
    lapsed: 0,
    review: 0,
    total: 0
  });

  const quizStatCards = [
    { label: "New", value: quizStats.new, bgColor: "#D7C5E5" },
    { label: "Lapsed", value: quizStats.lapsed, bgColor: "#A3E4F1" },
    { label: "Review", value: quizStats.review, bgColor: "#FEF39D" },
    { label: "Total", value: quizStats.total, bgColor: "#AEF8BA" }
  ];

  const tabs = [
    { id: "all-due", label: "All Due" },
    { id: "learning", label: "Learning" }
  ];

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const fetchQuizzes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getQuizzesDueByToday();
      if (response.success) {
        setQuizzes(response.data.docs);

        // Stats calculation for New, Lapsed, and Review
        const newQuizzes = response.data.docs.filter((quiz) => quiz.status === "new").length;
        const lapsedQuizzes = response.data.docs.filter((quiz) => quiz.status === "lapsed").length;
        const reviewQuizzes = response.data.docs.filter((quiz) => quiz.status === "review").length;
        const totalQuizzes = response.data.docs.length;

        setQuizStats({
          new: newQuizzes,
          lapsed: lapsedQuizzes,
          review: reviewQuizzes,
          total: totalQuizzes
        });
      } else {
        setError("Failed to fetch due quizzes.");
      }
    } catch (err) {
      setError("An error occurred while fetching quizzes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    fetchQuizzes();
  }, [shouldRefreshQuizzes]);

  // Don't exclude locked quizzes from being displayed
  const filteredQuizzes =
    selectedTab === "all-due"
      ? quizzes // Show all quizzes
      : quizzes.filter((quiz) => quiz.status === "new" || quiz.status === "lapsed");

  // Exclude locked quizzes from practice session
  const handleAllDuePractice = () => {
    const unlockedQuizzes = quizzes.filter((quiz) => !checkIfLocked(quiz));

    if (unlockedQuizzes.length === 0) {
      dispatch(showDialog({ dialogId: "quiz-deck" }));
    } else {
      dispatch(setDueQuizzes(unlockedQuizzes));
      dispatch(showMCQPane());
    }
  };

  const handleNewLapsedPractice = () => {
    const filteredQuizzes = quizzes.filter(
      (quiz) => (quiz.status === "new" || quiz.status === "lapsed") && !checkIfLocked(quiz)
    );

    if (filteredQuizzes.length === 0) {
      dispatch(showDialog({ dialogId: "quiz-deck" }));
    } else {
      dispatch(setDueQuizzes(filteredQuizzes));
      dispatch(showMCQPane());
    }
  };

  if (loading) {
    return <QuizDueListSkeleton />;
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
      <div className="flex items-center justify-between mb-3">
        <button className="bg-primary-gray-light max-w-fit p-2 rounded-full" onClick={handleBackClick}>
          <LeftArrowLongIcon size={3} />
        </button>
        <h3 className="font-josfin-sans text-md uppercase opacity-50">Due Quizzes</h3>
      </div>

      <div className="h-full">
        <ScrollView initialMaxHeight="145px">
          <div className="pb-2 h-full">
            <div className="mb-2 bg-slate-300 rounded-lg p-4">
              <p className="text-[14px]">
                <span className="font-semibold text-left">Today’s Recall Deck:</span>
                <span className="text-justify">Strengthen What You’ve Learned with Spaced Repetition!</span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {quizStatCards.map((stat, index) => (
                <div
                  key={index}
                  className="flex justify-between text-sm p-2 rounded-lg"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <p>{stat.label}:</p>
                  <p>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-b mt-2 pb-4">
            <div className="flex items-center justify-center mt-2">
              <p className="text-base mb-2 font-josfin-sans text-gray-400">Practice</p>
              <div className="flex-1 ml-2 border-b border-gray-200"></div>
            </div>
            <div className="flex gap-2 ">
              <Button className="font-medium" onClick={handleAllDuePractice}>
                All Due
              </Button>
              <Button className="font-medium" onClick={handleNewLapsedPractice}>
                New / Lapsed
              </Button>
            </div>
          </div>

          <div>
            <Tabs tabs={tabs} selectedTab={selectedTab} handleTabClick={handleTabClick} />
          </div>
          <div>
            <TransitionGroup className="quizzes-list">
              {filteredQuizzes.length > 0 ? (
                filteredQuizzes.map((quiz, index) => (
                  <CSSTransition key={index} timeout={300} classNames="fade">
                    <DueQuizCard
                      key={index}
                      question={quiz.questionDetails.question}
                      attempt={quiz.attemptCount}
                      ease={quiz.ease_factor}
                      status={quiz.status}
                      isLocked={Boolean(checkIfLocked(quiz))} // Show locked status
                    />
                  </CSSTransition>
                ))
              ) : (
                <p className="text-center mt-10 text-lg font-medium text-gray-400">No due quizzes available!</p>
              )}
            </TransitionGroup>
          </div>
        </ScrollView>
      </div>
    </div>
  );
};

export default QuizDueList;
