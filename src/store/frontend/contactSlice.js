import { createSlice } from "@reduxjs/toolkit";
import { CONTACTS } from "../../scripts/contact"; // Assuming you have a CONTACTS data source

const initialState = {
  contacts: CONTACTS, // Initial contact data
  isFetching: false, // Track the fetching status
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addInitialContacts: (state, action) => {
      state.contacts = action.payload; // Set the contacts data
    },
    markFetchingStarted: (state) => {
      state.isFetching = true; // Set isFetching to true when fetching starts
    },
    markFetchFinished: (state) => {
      state.isFetching = false; // Set isFetching to false when fetching ends
    },
  },
});

export const contactActions = contactSlice.actions;
export const fetchStatusActions = {
  markFetchingStarted: contactSlice.actions.markFetchingStarted,
  markFetchFinished: contactSlice.actions.markFetchFinished,
};

export default contactSlice;
