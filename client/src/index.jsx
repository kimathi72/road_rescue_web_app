import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import App, { loader as apploader } from "./App";
import Chat, {loader as chatLoader, action as chatAction} from './components/chat/Chat.jsx'
import ErrorPage from "./ErrorPage";
import Signin, { action as signinAction } from "./components/auth/Signin.jsx";
import Signup, {action as signupAction} from "./components/auth/Signup.jsx";
import Signout, {
  loader as signoutloader,
} from "./components/auth/Signout.jsx";
 import RequestCreate, {loader as servicesLoader, action as reqAction} from "./components/request/RequestCreate.jsx";
 import RequestQueue, {loader as reqQueLoader} from "./components/request/RequestQueue.jsx";
 import RequestShow, {loader as reqShowLoader, action as reqShowAction} from "./components/request/RequestShow.jsx";
import reportWebVitals from "./reportWebVitals";
import LoadingPage from "./LoadingPage";
import RequestIndex, {loader as reqIndexLoader} from "./components/request/RequestIndex.jsx";
import InvoicesList, {loader as invListLoader} from "./components/invoice/InvoiceList.jsx";
import InvoiceShow , {loader as invShowLoader , action as invShowAction} from "./components/invoice/InvoiceShow.jsx";
import InvoiceEdit, {action as reqEditAction} from "./components/invoice/InvoiceEdit.jsx"
import Reports, {loader as repLoader} from "./components/reports/Reports.jsx";
import RequestsGroups , {loader as reqGrpLoader, action  as reqGrpAction} from "./components/request/RequestsGroups.jsx";
import VehicleIndex, {loader as vehLoader, action as vehAction} from "./components/vehicle/VehicleIndex.jsx";

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
          element: <Reports/>, 
          loader: repLoader
           
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
      },{
        path: "/vehicles/",
        element: <VehicleIndex/>,
        loader: vehLoader,
        action: vehAction
      },
       {
            path: "/chats/:chatId",
            element: <Chat/>,
            loader: chatLoader,
            action: chatAction
          }
      ,{
        path: "/invoices",
        children:[
          {
            index: true, 
            element: <InvoicesList/>,
            loader: invListLoader, 
          },
          {
            path: "/invoices/:invoiceId",
            element: <InvoiceShow />, 
            loader: invShowLoader, 
            action: invShowAction
          }, 
          {
            path: "/invoices/:invoiceId/edit",
            element: <InvoiceEdit/>,
            action: reqEditAction
          }
        ]
      },
      {
        path:'/reports',
        element: <Reports/>,
        loader: repLoader
      },
      {
        path: "/requests/",
        children: [
          {
            index: true, 
            element:  <RequestIndex/>,
        loader: reqIndexLoader,
        HydrateFallback: ()=> <LoadingPage>
          <p>fetching requests. . .</p>
        </LoadingPage>
          },
          {
            path: "/requests/create",
            element:<RequestCreate/>,
            loader: servicesLoader,
            action: reqAction
          },
          {
            path: "/requests/queue", 
            element: <RequestQueue/>,
            loader: reqQueLoader,
          },
          {
            path: "/requests/:id",
            element: <RequestShow/>, 
            loader: reqShowLoader,
            action: reqShowAction,
           
          },{
            path: "/requests/grouped/:userId",
            element: <RequestsGroups/>,
            loader: reqGrpLoader,
            action: reqGrpAction
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
