import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader } from "@/components";
import ContentCard from "@/components/cards/content-card";
import BottomBar from "@/components/layout/bottom-bar";
import MCQPane from "@/components/quiz/mcq-pane";
import useFetchData from "@/hooks/fetch-data";
import { getModuleById } from "@/service/module";
import { setCurrentModule, switchView } from "@/store/lecturesSlice";
import { hideMCQPane } from "@/store/mcqSlice";

const Study = () => {
  const dispatch = useDispatch();
  const { moduleId } = useParams();

  // Fetch module data using the custom hook
  const moduleData = useFetchData(getModuleById, moduleId);

  useEffect(() => {
    dispatch(switchView("lecturer"));

    // Ensure moduleData is available and has data before dispatching
    if (moduleData && moduleData.success && moduleData.data) {
      // Only set the module and lectures in the reducer
      dispatch(setCurrentModule(moduleData.data)); // Set the module and lectures in the reducer
    }
  }, [moduleData, dispatch]);

  const currentSlide = useSelector((state) => {
    const currentLecture = state.lectures.lectures.find((lecture) => lecture._id === state.lectures.currentLectureId);
    // Ensure currentLecture and its slides exist before trying to access them
    if (currentLecture && currentLecture.slides && currentLecture.slides.length > 0) {
      return (
        currentLecture.slides.find((slide) => slide.id === state.lectures.currentSlideId) || currentLecture.slides[0]
      );
    }
    return null;
  });

  const currentLectureTitle = useSelector((state) => {
    const currentLecture = state.lectures.lectures.find((lecture) => lecture._id === state.lectures.currentLectureId);
    return currentLecture ? currentLecture.title : "";
  });

  const isMCQPaneVisible = useSelector((state) => state.mcq.isMCQPaneVisible);

  const handleCloseMCQPane = () => {
    dispatch(hideMCQPane());
  };

  // Render loader if moduleData is still fetching or empty
  if (!moduleData) {
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {currentSlide ? (
        <>
          <div className="flex-grow w-full overflow-hidden bg-primary-paper p-16 flex items-center justify-center ">
            <ContentCard title={currentSlide.title} content={currentSlide.content} />
          </div>
          <div className="px-4 py-1">
            <BottomBar />
          </div>
          <MCQPane isVisible={isMCQPaneVisible} onClose={handleCloseMCQPane} lectureTitle={currentLectureTitle} />
        </>
      ) : (
        <div className="flex justify-center items-center">
          <p>No slides available for the current lecture.</p>
        </div>
      )}
    </div>
  );
};

export default Study;
