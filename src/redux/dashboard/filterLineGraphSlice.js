import { createSlice } from "@reduxjs/toolkit";
import {
  starGrowthLineAllTime,
  starGrowthLineLast7Days,
  starGrowthLineLastMonth,
} from "../../services/dashboard/filterDataForLineGraph";

const initialState = {
  allData: null,
  dataAsPerTime: null,
  timeFilter: null,
  combinationFilter: false, //total 10, 2-digit combinations of 1,2,3,4,5
  individualStarFilter: 1, //(default is false) 1 | 2 | 3 | 4 | 5
};

/*
Initial Setup
  -dataAsPerTime: allTime
  -timeFilter: allTime
 */
const lineGraphFilterSlice = createSlice({
  name: "lineGraphFilterSlice",
  initialState,
  reducers: {
    setInitialData(state, action) {
      state.allData = action.payload;
      state.dataAsPerTime = starGrowthLineAllTime(action.payload);
      state.timeFilter = "all-time";
    },
    changeDataAsPerTime(state, action) {
      if (action.payload === "all-time") {
        state.timeFilter = action.payload;
        state.dataAsPerTime = starGrowthLineAllTime(state.allData);
      }
      if (action.payload === "7-day-time") {
        state.timeFilter = action.payload;
        state.dataAsPerTime = starGrowthLineLast7Days(state.allData);
      }
      if (action.payload === "30-day-time") {
        state.timeFilter = action.payload;
        state.dataAsPerTime = starGrowthLineLastMonth(state.allData);
      }
    },
    changeCombinationFilter(state, action) {
      state.individualStarFilter = false;
      state.combinationFilter = action.payload
        .split(",")
        .map((combo) => Number(combo));
    },
    changeIndividualStarFilter(state, action) {
      state.combinationFilter = false;
      state.individualStarFilter = action.payload;
    },
  },
});

export default lineGraphFilterSlice.reducer;
export const {
  setInitialData,
  changeDataAsPerTime,
  changeCombinationFilter,
  changeIndividualStarFilter,
} = lineGraphFilterSlice.actions;
