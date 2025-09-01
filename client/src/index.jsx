import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import App , {loader as apploader}from "./App";
import 'leaflet/dist/leaflet.css';
import ErrorPage from "./ErrorPage";

import reportWebVitals from "./reportWebVitals";
import LoadingPage from "./LoadingPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    loader: apploader,
    HydrateFallback:()=><LoadingPage> <p>Initializing Road Rescue App. Please wait</p> </LoadingPage>,
    children: [
      {
        index: true,
        element: <div>"hello"</div>
      }
    ]
  }
])

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
