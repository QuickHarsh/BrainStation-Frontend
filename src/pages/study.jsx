import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SurveyModal from "@/components/asrs-form";
import ContentCard from "@/components/cards/content-card";
import BottomBar from "@/components/layout/bottom-bar";
import MCQPane from "@/components/quiz/mcq-pane";
import { switchView } from "@/store/lecturesSlice";
import { hideMCQPane } from "@/store/mcqSlice";

// Assuming SurveyModal is located here

const Study = () => {
  const dispatch = useDispatch();
  const isMCQPaneVisible = useSelector((state) => state.mcq.isMCQPaneVisible);

  // State to control the visibility of the survey popup
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  useEffect(() => {
    dispatch(switchView("lecturer"));
  }, [dispatch]);

  const currentSlide = useSelector((state) => {
    const currentLecture = state.lectures.lectures.find((lecture) => lecture.id === state.lectures.currentLectureId);
    return (
      currentLecture.slides.find((slide) => slide.id === state.lectures.currentSlideId) || currentLecture.slides[0]
    );
  });

  const currentLectureTitle = useSelector((state) => {
    const currentLecture = state.lectures.lectures.find((lecture) => lecture.id === state.lectures.currentLectureId);
    return currentLecture?.title;
  });

  const handleCloseMCQPane = () => {
    dispatch(hideMCQPane());
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow bg-primary-paper p-16 flex items-center justify-center ">
        <ContentCard title={currentSlide.title} content={currentSlide.content} />
      </div>
      {/* Bottom bar */}
      <div className="px-4 py-1">
        <BottomBar />
      </div>

      {/* MCQ Pane Modal */}
      <MCQPane isVisible={isMCQPaneVisible} onClose={handleCloseMCQPane} lectureTitle={currentLectureTitle} />

      {/* Survey Modal */}
      <SurveyModal isVisible={isPopupVisible} onClose={handleClosePopup} />
    </div>
  );
};

export default Study;
