import { createSlice } from "@reduxjs/toolkit";
import { BOOKS } from "../../scripts/books"; // Make sure BOOKS is an object, not an array

// Ensure BOOKS includes the isFetching property
const initialState = {
  books: BOOKS, // Assuming CLASSES is an array or object with book data
  isFetching: false, // Add this to handle the fetch status
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addInitialBooks: (state, action) => {
      state.books = action.payload; // Assign the books from the action
    },
    markFetchingStarted: (state) => {
      state.isFetching = true; // Safely mutate the isFetching property
    },
    markFetchFinished: (state) => {
      state.isFetching = false; // Safely mutate the isFetching property
    },
  },
});

export const booksActions = bookSlice.actions;
export const fetchStatusActions = {
  markFetchingStarted: bookSlice.actions.markFetchingStarted,
  markFetchFinished: bookSlice.actions.markFetchFinished,
};

export default bookSlice;
