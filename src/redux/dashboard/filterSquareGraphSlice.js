import { createSlice } from "@reduxjs/toolkit";
import { create300Square } from "../../services/dashboard/filterSquareGraph";

const initialState = {
  three100Squares: null,
};

const filterSquareGraphSlice = createSlice({
  name: "filterSquareGraphSlice",
  initialState,
  reducers: {
    setInitialState(state, action) {
      state.three100Squares = create300Square(action.payload);
    },
  },
});

export default filterSquareGraphSlice.reducer;
export const { setInitialState } = filterSquareGraphSlice.actions;