import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLectureQuizSummary } from "@/service/quiz";

export const fetchLectureSummaries = createAsyncThunk("lectureSummary/fetchSummaries", async (moduleId) => {
  const response = await getLectureQuizSummary(moduleId);
  return response.data;
});

const initialState = {
  summaries: [],
  selectedLectureSummary: null,
  loading: false,
  error: null,
  blur: true // Add blur state
};

const lectureSummarySlice = createSlice({
  name: "lectureSummary",
  initialState,
  reducers: {
    setSelectedLectureSummary: (state, action) => {
      const lectureId = action.payload;
      const summary = state.summaries.find((item) => item.lectureId === lectureId);
      state.selectedLectureSummary = summary || {
        totalQuizzes: 0,
        lapsedCount: 0,
        reviewCount: 0,
        feedback: { strength: [], weakness: [] },
        questions: []
      };
      state.blur = !state.selectedLectureSummary; // Update blur based on selectedLectureSummary
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLectureSummaries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLectureSummaries.fulfilled, (state, action) => {
        state.loading = false;
        state.summaries = action.payload;
      })
      .addCase(fetchLectureSummaries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setSelectedLectureSummary } = lectureSummarySlice.actions;
export default lectureSummarySlice.reducer;
