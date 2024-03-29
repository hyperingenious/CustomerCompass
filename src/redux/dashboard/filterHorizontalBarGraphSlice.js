import { createSlice } from "@reduxjs/toolkit";
import { getLast5Month } from "../../helpers/helper";

const initialState = {
  allData: null,
  last5Months: getLast5Month(),
  selectedMonthIndex: 0,
  selectedMonthData: null,
};

const horizontalBarGraphFilterSlice = createSlice({
  name: "horizontalBarGraphFilterSlice",
  initialState,
  reducers: {
    changeHorizontalBarGraphMonth(state, action) {
      state.selectedMonthIndex = action.payload;
      state.selectedMonthData = state.allData[action.payload];
    },
    setInitialData(state, action) {
      state.allData = action.payload;
      state.selectedMonthData = action.payload[state.selectedMonthIndex];
    },
  },
});

export default horizontalBarGraphFilterSlice.reducers;
export const { changeHorizontalBarGraphMonth, setInitialData } =
    horizontalBarGraphFilterSlice.actions;

