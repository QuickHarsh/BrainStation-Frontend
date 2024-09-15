// lecturesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import lectures from "../../public/assets/data/lectures";

const initialState = {
  lectures: lectures,
  currentModuleId: null,
  currentLectureId: 1,
  currentSlideId: 1,
  currentView: "lecturer"
};

const lecturesSlice = createSlice({
  name: "lectures",
  initialState,
  reducers: {
    setCurrentModule: (state, action) => {
      state.currentModuleId = action.payload;
      state.lectures = lectures.filter((lecture) => lecture.moduleId === state.currentModuleId);
      state.currentLectureId = state.lectures[0].id;
      state.currentSlideId = state.lectures[0].slides[0].id;
    },
    switchLecture: (state, action) => {
      state.currentLectureId = action.payload;
      const selectedLecture = state.lectures.find((lecture) => lecture.id === action.payload);
      state.currentSlideId = selectedLecture.slides[0].id;
      state.currentView = "quiz";
    },
    switchSlide: (state, action) => {
      state.currentSlideId = action.payload;
    },
    switchView: (state, action) => {
      state.currentView = action.payload;
    },
    switchToQuizDeck: (state) => {
      state.currentView = "quiz-deck";
    }
  }
});

export const { setCurrentModule, switchLecture, switchSlide, switchView, switchToQuizDeck } = lecturesSlice.actions;

export default lecturesSlice.reducer;
