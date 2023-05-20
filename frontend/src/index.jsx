import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Error } from "./components/Error";
import { Signin, Signup, Signout } from "./components/Auth";
import { CreateEvent, ListEvents, Register } from "./components/Event";

const router = createBrowserRouter(
  [
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
          path: "signup",
          element: <Signup />,
        },
        {
          // signin route
          path: "signin",
          element: <Signin />,
        },
        {
          // signout route
          path: "signout",
          element: <Signout />
        },
        {
          // user settings route
          path: "user",
        },
        {
          // create event route
          path: "create-event",
          element: <CreateEvent />,
        },
        {
          // see current events
          path: "events",
          element: <ListEvents />
        },
        {
          // register for event
          path: "register/:event_id",
          element: <Register />
        },
      ],
    },
  ],
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
