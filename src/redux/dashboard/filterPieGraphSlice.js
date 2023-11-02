import { createSlice } from "@reduxjs/toolkit";
import {
  starPieDataForLast7Days,
  starPieDataForLast30Days,
  starPieDataForLastAllDays,
} from "../../services/dashboard/filterDataForPieGraph";

const initialState = {
  allData: null,
  dataAsPerTime: null,
  timeFilter: null,
};

const pieGraphFilterSlice = createSlice({
  name: "pieGraphFilterSlice",
  initialState,
  reducers: {
    setInitialData(state, action) {
      state.allData = action.payload;
      state.dataAsPerTime = starPieDataForLast7Days(action.payload);
      state.timeFilter = "7-day-time";
    },
    changePieDataAsPerTime(state, action) {
      if (action.payload === "7-day-time") {
        state.timeFilter = action.payload;
        state.dataAsPerTime = starPieDataForLast7Days(state.allData);
      }
      if (action.payload === "30-day-time") {
        state.timeFilter = action.payload;
        state.dataAsPerTime = starPieDataForLast30Days(state.allData);
      }
      if (action.payload === "all-time") {
        state.timeFilter = action.payload;
        state.dataAsPerTime = starPieDataForLastAllDays(state.allData);
      }
    },
  },
});

export default pieGraphFilterSlice.reducer;
export const { changePieDataAsPerTime, setInitialData } =
  pieGraphFilterSlice.actions;
