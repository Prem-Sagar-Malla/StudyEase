import { createSlice } from "@reduxjs/toolkit";
import { BLOGS } from "../../scripts/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: BLOGS,
    isFetching: false,
  },
  reducers: {
    addInitialBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    markFetchingStarted: (state) => {
      state.isFetching = true;
    },
    markFetchFinished: (state) => {
      state.isFetching = false;
    },
  },
});

export const blogsActions = blogSlice.actions;
export const fetchStatusActions = {
  markFetchingStarted: blogSlice.actions.markFetchingStarted,
  markFetchFinished: blogSlice.actions.markFetchFinished,
};

export default blogSlice;
