import { createSlice } from "@reduxjs/toolkit";
import { SUBJECTS } from "../../scripts/subject";


const initialState = {
  subjects: SUBJECTS, // Assuming SUBJECTS is an array or object with book data
  isFetching: false, // Add this to handle the fetch status
};

const subjectSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    addInitialSubjects: (state, action) => {
      state.subjects = action.payload;
    },
    markFetchingStarted: (state) => {
      state.isFetching = true; // Safely mutate the isFetching property
    },
    markFetchFinished: (state) => {
      state.isFetching = false; // Safely mutate the isFetching property
    },
  },
});

export const subjectsActions = subjectSlice.actions;
export const fetchStatusActions = {
  markFetchingStarted: subjectSlice.actions.markFetchingStarted,
  markFetchFinished: subjectSlice.actions.markFetchFinished,
};

export default subjectSlice;
