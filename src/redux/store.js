import { configureStore } from "@reduxjs/toolkit";
import filterLineGraphSlice from "./dashboard/filterLineGraphSlice";
import filterPieGraphSlice from "./dashboard/filterPieGraphSlice";
import filterHorizontalBarGraphSlice from "./dashboard/filterHorizontalBarGraphSlice";
import filterReviewsSlice from "./reviews/filterReviewsSlice";
import filterSquareGraphSlice from "./dashboard/filterSquareGraphSlice";
import { reducer } from "./fetchReviewDataSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    // auth
    auth: authSlice,

    //review-data
    reviewData: reducer,

    lineGraphFilter: filterLineGraphSlice,
    pieGraphFilter: filterPieGraphSlice,
    horizontalBarGraphFilter: filterHorizontalBarGraphSlice,
    reviewsFilter: filterReviewsSlice,
    three100SquareFilter: filterSquareGraphSlice,
  },
});

export default store;
