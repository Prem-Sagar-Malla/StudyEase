import { createSlice } from "@reduxjs/toolkit";
import { QUOTES } from "../../scripts/quotes";

const initialState = {
  quotes: QUOTES, // Assuming QUOTES is an array or object with book data
  isFetching: false, // Add this to handle the fetch status
};

const quoteSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    addInitialQuotes: (state, action) => {
      state.quotes = action.payload;
    },
    markFetchingStarted: (state) => {
      state.isFetching = true; // Safely mutate the isFetching property
    },
    markFetchFinished: (state) => {
      state.isFetching = false; // Safely mutate the isFetching property
    },
  },
});

export const quotesActions = quoteSlice.actions;
export const fetchStatusActions = {
  markFetchingStarted: quoteSlice.actions.markFetchingStarted,
  markFetchFinished: quoteSlice.actions.markFetchFinished,
};

export default quoteSlice;
