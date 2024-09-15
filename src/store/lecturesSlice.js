import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lectures: [],
  currentModuleId: null,
  currentLectureId: null,
  currentSlideId: null,
  currentView: "lecturer"
};

const lecturesSlice = createSlice({
  name: "lectures",
  initialState,
  reducers: {
    setCurrentModule: (state, action) => {
      const selectedModule = action.payload; // Action payload should be the module with lectures
      state.currentModuleId = selectedModule._id;
      state.lectures = selectedModule.lectures;
      // Set the first lecture and slide as the current ones
      if (selectedModule.lectures.length > 0) {
        state.currentLectureId = selectedModule.lectures[0]._id;
        if (selectedModule.lectures[0].slides.length > 0) {
          state.currentSlideId = selectedModule.lectures[0].slides[0].id;
        }
      }
    },
    switchLecture: (state, action) => {
      state.currentLectureId = action.payload;
      const selectedLecture = state.lectures.find((lecture) => lecture._id === action.payload);
      if (selectedLecture && selectedLecture.slides.length > 0) {
        state.currentSlideId = selectedLecture.slides[0].id;
      }
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
