import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllReviewsAndVisitorsCount } from "../services/supabase/getAllReviews";

export const fetchReviewData = createAsyncThunk(
  "reviewData/fetchReviewData",
  async function () {
    const reviews = await getAllReviewsAndVisitorsCount();
    return reviews;
  }
);

const initialState = {
  data: null,
  visitorCount: null,
  status: "idle", // 'idle' | 'loading' | 'finished' | 'error'
  error: null,
};

const reviewDataSlice = createSlice({
  name: "reviewData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviewData.fulfilled, (state, action) => {
        state.status = "finished";
        state.data = action.payload.reviews;
        state.visitorCount = action.payload.visitors;
      })
      .addCase(fetchReviewData.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

// Export the reducer property from the createSlice result
export const { reducer } = reviewDataSlice;
