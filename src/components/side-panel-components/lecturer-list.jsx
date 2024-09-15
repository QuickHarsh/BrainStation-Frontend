import Scrollbars from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import { switchLecture } from "@/store/lecturesSlice";
import { setQuizzesForLecture } from "@/store/quizzesSlice";
import ChapterCard from "../cards/chapter-card";
import LastActivityCard from "../cards/last-activity-card";

const LectureList = () => {
  const dispatch = useDispatch();
  const lectures = useSelector((state) => state.lectures.lectures);

  const handleChapterClick = (lectureId) => {
    dispatch(switchLecture(lectureId));
    dispatch(setQuizzesForLecture(lectureId));
  };

  return (
    <div className="p-2 flex-1 overflow-hidden">
      {/* Heading */}
      <p className="text-md font-inter mb-4 ml-2">ALL LECTURES/ CHAPTERS</p>
      {/* Last Activity Card */}
      <LastActivityCard />
      {/* All Lectures with Scrollbars */}
      <div className="flex-1 mt-3 overflow-hidden">
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
          <div className="px-2">
            {lectures.map((lecture) => (
              <ChapterCard
                key={lecture.id}
                id={lecture.id}
                title={lecture.title}
                onClick={() => handleChapterClick(lecture.id)}
              />
            ))}
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};

export default LectureList;
