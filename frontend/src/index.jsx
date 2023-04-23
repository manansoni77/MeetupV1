import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Error } from "./components/Error";
import { Signup } from "./components/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        path: "about",
        element: <About />,
      },
      {
        // signup route 
        path: 'signup',
        element: <Signup />
      },
      {
        // signin route
        path: 'signin'
      },
      {
        // user settings route
        path: 'user'
      },
      {
        // create event route
        path: 'create-event'
      },
      {
        // see current events
        path: 'events',
      },
      {
        // book place in event
        path: 'book',
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
