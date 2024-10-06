import { createSlice } from "@reduxjs/toolkit";
import { CHAPTERS } from "../../scripts/chapter";

// Ensure initialState has a chapters field
const initialState = {
  chapters: CHAPTERS, // Assuming CHAPTERS is an array or object with chapter data
  isFetching: false,  // Add this to handle the fetch status
};

const chapterSlice = createSlice({
  name: "chapters",
  initialState, // Use the initialState object here
  reducers: {
    addInitialChapters: (state, action) => {
      state.chapters = action.payload; // Update the chapters from the action payload
    },
    markFetchingStarted: (state) => {
      state.isFetching = true; // Safely mutate the isFetching property
    },
    markFetchFinished: (state) => {
      state.isFetching = false; // Safely mutate the isFetching property
    },
  },
});

export const chaptersActions = chapterSlice.actions;
export const fetchStatusActions = {
  markFetchingStarted: chapterSlice.actions.markFetchingStarted,
  markFetchFinished: chapterSlice.actions.markFetchFinished,
};

export default chapterSlice;
