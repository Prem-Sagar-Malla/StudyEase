import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App"; // Import your App component
import Home from "../pages/frontend/Home";
import AboutUsSection from "../pages/frontend/AboutUsSection";
import Services from "../pages/frontend/Services";
import Classes from "../pages/frontend/Classes";
import Books from "../pages/frontend/Books";
import Blogs from "../pages/frontend/Blogs";
import Quote from "../components/frontend/Quote";
import ContactUs from "../pages/frontend/ContactUs";
import Subject from "../pages/frontend/Subject";
import Chapter from "../pages/frontend/Chapter";
import { CSpinner } from "@coreui/react";

const Dashboard = React.lazy(
  () => import("../pages/dashboard/dashboard/Dashboard")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Keep the App component here for all frontend routes
    children: [
      // Define frontend routes as children of App
      {
        path: "/",
        element: <Home />, // You might need to create a HomePage component if not already defined
      },
      {
        path: "about-us",
        element: <AboutUsSection />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "class",
        element: <Classes />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "quotes",
        element: <Quote />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: "class/:class/subject",
        element: <Subject />,
      },
      {
        path: "class/:class/subject/:subject/chapter",
        element: <Chapter />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Dashboard />
      </Suspense>
    ),
    children: [
      // Define your dashboard routes here
      // { path: "services", element: <AddNewService /> },
      // { path: "classes", element: <AddNewClasses /> },
      // Add other dashboard routes here...
    ],
  },
]);

function MainRouter() {
  return <RouterProvider router={router} />;
}

export default MainRouter;
