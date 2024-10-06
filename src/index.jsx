import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Providers from "./store/dashboard/Providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <Providers>
    <App />
    <ToastContainer />
  </Providers>
);
