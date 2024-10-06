import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainRouter from "./routers/MainRouter";
import { Provider } from "react-redux";
import studyEaseStore from "./store/frontend/index";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={studyEaseStore}>
      <MainRouter />
    </Provider>
  </React.StrictMode>
);
