import { useDispatch, useSelector } from "react-redux";
import { switchSlide } from "@/store/lecturesSlice";
import LeftArrowIcon from "../icons/left-arrow-icon";
import RightArrowIcon from "../icons/right-arrow-icon";

const BottomBar = () => {
  const dispatch = useDispatch();
  const { lectures, currentLectureId, currentSlideId } = useSelector((state) => state.lectures);

  const currentLecture = lectures.find((lecture) => lecture.id === currentLectureId);
  const currentSlideIndex = currentLecture.slides.findIndex((slide) => slide.id === currentSlideId);
  const totalSlides = currentLecture.slides.length;

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      const prevSlideId = currentLecture.slides[currentSlideIndex - 1].id;
      dispatch(switchSlide(prevSlideId));
    }
  };

  const handleNextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) {
      const nextSlideId = currentLecture.slides[currentSlideIndex + 1].id;
      dispatch(switchSlide(nextSlideId));
    }
  };

  return (
    <div className="bg-white relative flex items-center py-2 uppercase text-xs text-gray-400 font-semibold font-josfin-sans">
      Lecture {currentLectureId}
      <div
        className="flex items-center absolute
          left-1/2 transform -translate-x-1/2
      "
      >
        <button onClick={handlePrevSlide} disabled={currentSlideIndex === 0}>
          <LeftArrowIcon color={currentSlideIndex === 0 ? "gray" : "black"} />
        </button>
        <span className="lowercase text-black px-6">
          {currentSlideIndex + 1} of {totalSlides}
        </span>
        <button onClick={handleNextSlide} disabled={currentSlideIndex === totalSlides - 1}>
          <RightArrowIcon color={currentSlideIndex === totalSlides - 1 ? "gray" : "black"} />
        </button>
      </div>
    </div>
  );
};

export default BottomBar;
