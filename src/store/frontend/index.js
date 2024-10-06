import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./blogSlice";
import bookSlice from "./booksSlice";
import classesSlice from "./classSlice";
import quotesSlice from "./quoteSlice";
import featureSlice from "./featureSlice";
import serviceSlice from "./serviceSlice";
import subjectSlice from "./subjectSlice";
import chapterSlice from "./chapterSlice";
import contactSlice from "./contactSlice";

const studyEaseStore = configureStore({
  reducer: {
    blogs: blogSlice.reducer,
    books: bookSlice.reducer,
    classes: classesSlice.reducer,
    quotes: quotesSlice.reducer,
    features: featureSlice.reducer,
    services: serviceSlice.reducer,
    subjects: subjectSlice.reducer,
    chapters: chapterSlice.reducer,
    contacts: contactSlice.reducer,
  },
});

export default studyEaseStore;
