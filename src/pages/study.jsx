import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader } from "@/components";
import ContentCard from "@/components/cards/content-card";
import SessionControl from "@/components/emotion/SessionControl";
import BottomBar from "@/components/layout/bottom-bar";
import MCQPane from "@/components/quiz/mcq-pane";
import useFetchData from "@/hooks/fetch-data";
import { getModuleById } from "@/service/module";
import { setCurrentModule, switchView } from "@/store/lecturesSlice";
import { hideMCQPane } from "@/store/mcqSlice";

// Import the new component

const Study = () => {
  const dispatch = useDispatch();
  const { moduleId } = useParams();
  const userId = "66d97b6fc30a1f78cf41b615"; // Replace this with the actual user ID

  // Fetch module data using the custom hook
  const moduleData = useFetchData(getModuleById, moduleId);

  useEffect(() => {
    dispatch(switchView("lecturer"));

    if (moduleData && moduleData.success && moduleData.data) {
      dispatch(setCurrentModule(moduleData.data));
    }
  }, [moduleData, dispatch]);

  const currentSlide = useSelector((state) => {
    const currentLecture = state.lectures.lectures.find((lecture) => lecture._id === state.lectures.currentLectureId);
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

  const currentLectureId = useSelector((state) => {
    const lectureId = state.lectures.currentLectureId;
    return lectureId;
  });

  const isMCQPaneVisible = useSelector((state) => state.mcq.isMCQPaneVisible);

  const handleCloseMCQPane = () => {
    dispatch(hideMCQPane());
  };

  if (!moduleData) {
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Use the SessionControl component and pass userId and moduleId */}
      <SessionControl userId={userId} moduleId={moduleId} />

      {currentSlide ? (
        <>
          <div className="flex-grow w-full overflow-hidden bg-primary-paper pl-16 flex items-center justify-center ">
            <ContentCard title={currentSlide.title} content={currentSlide.content} lectureId={currentLectureId} />
          </div>
          <div className="px-4 py-1">
            {/* <Ontology userId={'66d97b6fc30a1f78cf41b620'} lectureId={currentLectureId} /> */}
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
