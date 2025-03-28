import { useDispatch, useSelector } from "react-redux";
import { switchLecture, switchView } from "@/store/lecturesSlice";
import { setQuizzesForLecture } from "@/store/quizzesSlice";
import ChapterCard from "../cards/chapter-card";
import LastActivityCard from "../cards/last-activity-card";
import ScrollView from "../common/scrollable-view";

const LectureList = () => {
  const dispatch = useDispatch();
  const lectures = useSelector((state) => state.lectures.lectures);

  const handleChapterClick = (lectureId) => {
    dispatch(switchLecture(lectureId));
    dispatch(setQuizzesForLecture(lectureId));
    dispatch(switchView("quiz"));
  };

  return (
    <div className="p-2 flex-1 overflow-hidden">
      {/* Heading */}
      <p className="text-md font-inter mb-4 ml-2">ALL LECTURES/ CHAPTERS</p>
      {/* Last Activity Card */}
      <LastActivityCard />
      {/* All Lectures */}
      <div className="mt-2 flex-1 overflow-hidden">
        <ScrollView initialMaxHeight="260px">
          <div className="px-2">
            {lectures.map((lecture, index) => (
              <ChapterCard
                key={lecture._id}
                id={lecture._id}
                lectureNumber={index + 1}
                title={lecture.title}
                onClick={() => handleChapterClick(lecture._id)}
              />
            ))}
          </div>
        </ScrollView>
      </div>
    </div>
  );
};

export default LectureList;
