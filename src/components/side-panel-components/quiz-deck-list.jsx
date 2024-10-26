// QuizDeckList.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionsCountByModule } from "@/service/question";
import { getQuizzesDueDetails } from "@/service/quiz";
import { switchView } from "@/store/lecturesSlice";
import QuizDeckCard from "../cards/quiz-deck-card";
import QuizSummeryCard from "../cards/quize-summery-card";
import ScrollView from "../common/scrollable-view";
import QuizDeckListSkeleton from "../skeletons/quiz-deck-list";

const QuizDeckList = () => {
  const dispatch = useDispatch();
  const { currentModuleId } = useSelector((state) => state.lectures);

  const [quizDetails, setQuizDetails] = useState({ dueTodayCount: 0, learningPhaseCount: 0 });
  const [lectureData, setLectureData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await getQuizzesDueDetails();
        setQuizDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch quiz due details:", error);
      }
    };

    fetchQuizDetails();
  }, []);

  useEffect(() => {
    const fetchLectureData = async () => {
      try {
        setLoading(true);
        const response = await getQuestionsCountByModule(currentModuleId);
        setLectureData(response.data);
      } catch (error) {
        console.error("Failed to fetch lecture data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentModuleId) {
      fetchLectureData();
    }
  }, [currentModuleId]);

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
        {lectureData.length > 0 ? (
          lectureData.map((lecture, index) => (
            <QuizDeckCard
              key={lecture.lectureId}
              label={`Lecture ${index + 1}`}
              title={lecture.lectureTitle}
              questionCount={lecture.questionCount}
            />
          ))
        ) : (
          <p className="text-center mt-10 text-lg font-medium text-gray-400">
            No lectures available for selected module.
          </p>
        )}
      </ScrollView>
    </div>
  );
};

export default QuizDeckList;
