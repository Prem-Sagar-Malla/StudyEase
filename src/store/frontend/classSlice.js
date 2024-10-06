import { createSlice } from "@reduxjs/toolkit";
import { CLASSES } from "../../scripts/classes";

const initialState = {
  classes: CLASSES, // Assuming BOOKS is an array or object with book data
  isFetching: false, // Add this to handle the fetch status
};

const classesSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    addInitialClasses: (state, action) => {
      state.classes = action.payload;
    },
    markFetchingStarted: (state) => {
      state.isFetching = true; // Safely mutate the isFetching property
    },
    markFetchFinished: (state) => {
      state.isFetching = false; // Safely mutate the isFetching property
    },
  },
});

export const classesActions = classesSlice.actions;
export const fetchStatusActions = {
  markFetchingStarted: classesSlice.actions.markFetchingStarted,
  markFetchFinished: classesSlice.actions.markFetchFinished,
};

export default classesSlice;
