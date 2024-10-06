import { createSlice } from "@reduxjs/toolkit";
import { FEATURES } from "../../scripts/feature";

const featureSlice = createSlice({
  name: "features",
  initialState: FEATURES,
  reducers: {
    addInitialFeature: (store, action) => {
      return store;
    },
  },
});

export const featuresActions = featureSlice.actions;

export default featureSlice;
