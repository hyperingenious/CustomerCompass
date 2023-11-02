import { createSlice } from "@reduxjs/toolkit";
import {
  filterAllTimeData,
  filterLast30DayData,
  filterLast7DayData,
} from "../../services/reviews/filterReviewTime";
import { filterReviewRating } from "../../services/reviews/filterReviewRating";

const initialState = {
  allData: null,
  reviewData: null,
  timeFilter: null, // all-time | 30-day-time | 7-day-time
  ratingFilter: null, // 'All Stars' | 1 | 2 | 3 | 4 | 5
};

const reviewFilterSlice = createSlice({
  name: "reviewFilterSlice",
  initialState,
  reducers: {
    setInitialData(state, action) {
      state.allData = action.payload;
      state.reviewData = action.payload;
      state.timeFilter = "all-time";
      state.ratingFilter = 'All Stars';
    },
    changeReviewDataWithTime(state, action) {
      if (action.payload === "all-time") {
        state.timeFilter = action.payload;
        state.reviewData = filterAllTimeData(state.allData, state.ratingFilter);
      }

      if (action.payload === "30-day-time") {
        state.timeFilter = action.payload;
        state.reviewData = filterLast30DayData(
          state.allData,
          state.ratingFilter
        );
      }

      if (action.payload === "7-day-time") {
        state.timeFilter = action.payload;
        state.reviewData = filterLast7DayData(
          state.allData,
          state.ratingFilter
        );
      }
    },
    changeReviewDataWithRating(state, action) {
      state.ratingFilter = action.payload;
      state.reviewData = filterReviewRating(
        state.allData,
        action.payload,
        state.timeFilter
      );
    },
  },
});

export default reviewFilterSlice.reducer;
export const {
  setInitialData,
  changeReviewDataWithTime,
  changeReviewDataWithRating,
} = reviewFilterSlice.actions;
