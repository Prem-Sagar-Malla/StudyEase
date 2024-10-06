import { createSlice } from "@reduxjs/toolkit";
import { SERVICES } from "../../scripts/services";


const initialState = {
  services: SERVICES, // Assuming BOOKS is an array or object with book data
  isFetching: false, // Add this to handle the fetch status
};

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    addInitialServices: (state, action) => {
      state.services = action.payload;
    },
    markFetchingStarted: (state) => {
      state.isFetching = true; // Safely mutate the isFetching property
    },
    markFetchFinished: (state) => {
      state.isFetching = false; // Safely mutate the isFetching property
    },
  },
});

export const servicesActions = serviceSlice.actions;
export const fetchStatusActions = {
  markFetchingStarted: serviceSlice.actions.markFetchingStarted,
  markFetchFinished: serviceSlice.actions.markFetchFinished,
};

export default serviceSlice;
