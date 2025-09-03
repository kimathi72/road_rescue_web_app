import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import App, { loader as apploader } from "./App";
import "leaflet/dist/leaflet.css";
import ErrorPage from "./ErrorPage";
import Signin, { action as signinAction } from "./components/auth/Signin.jsx";
import Signup, {action as signupAction} from "./components/auth/Signup.jsx";
import Signout, {
  loader as signoutloader,
} from "./components/auth/Signout.jsx";
 import RequestCreate, {loader as servicesLoader, action as reqAction} from "./components/request/RequestCreate.jsx";

import reportWebVitals from "./reportWebVitals";
import LoadingPage from "./LoadingPage";
const {user} = await apploader()
console.log(user)
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: apploader,
    HydrateFallback: () => (
      <LoadingPage>
        {" "}
        <p>Initializing Road Rescue App. Please wait</p>{" "}
      </LoadingPage>
    ),
    children: [
      {
        index: true,
        element: <div>"hello"</div>,
      },
      {
        path: "/signin",
        element: <Signin />,
        action: signinAction,
      },
      {
        path: "/signout",
        element: <Signout />,
        loader: signoutloader,
      },
      {
        path: "/signup",
        element: <Signup/>,
        action: signupAction,
      },
      {
        path: "/requests/",
        children: [
          {
            path: "/requests/create",
            element:<RequestCreate/>,
            ...(!!user && {loader: async()=> servicesLoader(user.id)}),
            action: reqAction
          }
        ]
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
