import { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../node_modules/leaflet-geosearch/dist/geosearch.css";
import NavBar from "./components/navigation/NavBar.jsx";
import Signin from "./components/auth/Signin.jsx";
import Signup from "./components/auth/Signup.jsx";
import Signout from "./components/auth/Signout.jsx";
import Users from "./components/user/Index.jsx";
import VehicleCreate from "./components/vehicle/VehicleCreate.jsx";
import Invoices from "./components/invoice/InvoiceIndex.jsx";
import "./assets/styles/mystyles.css";
import RequestShow from "./components/request/RequestShow.jsx";
import SystemLogs from "./components/admin/SystemLogs.jsx";
import Account from "./components/responder/Account.jsx";
import RequestOverview from "./components/admin/RequestOverview.jsx";
import RequestCreate from "./components/request/RequestCreate.jsx";
import RescueQueue from "./components/request/RequestQueue.jsx";
import Notify from "./components/navigation/Notify.jsx";
import RequestEdit from './components/request/RequestEdit.jsx'
import RequestIndex from "./components/request/RequestIndex.jsx";
import Chat from "./components/chat/Chat.jsx";
import { Grid } from "@mui/material";
import Earnings from "./components/invoice/Earnings.jsx";

export default function App() {
  //set user State , default to null, update state on sign in/up
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("jwt");
  const [isLoaded, setIsLoaded] = useState(false);

  // await fetch api call for current_user data
  const getUser = useCallback(async () => {
    const result = await fetch("/api/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    //await Promise results.json()
    const data = await result.json();
    setUser(data.user);
    setIsLoaded(true)
  }, [setUser]);
  //on app load get current user
  useEffect(() => {
    console.log(!!token)
    !!token && getUser();
  }, [getUser, token]);

  // callback function to do async fetch request. pass as prop to child component
  

  //on App load, query for current user, auto login if signed in, otherwise sign in first.

  const authorizedUser = (perm) => {
    if (!!user && isLoaded) {
      return !!(perm === user.role);
    } else {
      return false;
    }
  };
  const authorisationFn = (role, element)=>{
    if (authorizedUser(role)){
       return element
      }else {
      return <Notify
     severity={"warning"}
     message={`only ${role} role has authorised access`}
      >
        <Link to='/' >Go back Home</Link>
      </Notify>
    }
  }
  return (
    <Router 
      future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }}>     
    <Grid container direction={{xs: 'column', md:'row', lg: 'row'}}>
      <NavBar user={!!user && user} />
      <Grid container size={{xs: 12, md: 8, lg: 10}} justifyContent={'center'} p={2}>
        <Routes>
          <Route
            path="/signin"
            element={<Signin setUser={setUser} setIsLoaded={setIsLoaded} />}
          />
          <Route
            path="/"
            exact
            element={
            authorizedUser("provider") ? <RequestIndex />
              : authorizedUser("driver") ? (
                <RequestCreate  />
              ) : authorizedUser("admin") ? (
                <RequestOverview />
              ) : (
                <Signin setUser={setUser} setIsLoaded={setIsLoaded} />
              )
            }
          />
          <Route
            path="/signup"
            element={<Signup setUser={setUser} setIsLoaded={setIsLoaded} />}
          />
          <Route
            path="/signout"
            element={<Signout setUser={setUser} setIsLoaded={setIsLoaded} />}
          />

          <Route
            path="/requests"
            element={
                <RequestIndex/>
            }
          />
         
          <Route
            path="/requests/create"
            element={authorisationFn("driver", <RequestCreate />)}
          />
          <Route
          path="/requests/:id"
          element={
            <RequestShow user={!!user && user}/>
          }
          />
          <Route
          path="/requests/:id/edit"
          element={
            <RequestEdit user={user}/>
          }
          />
          <Route
            path="/requests/queue"
            element={ !!user && <RescueQueue user={user} />}
          />
          <Route
            path="/invoices/*"
            element={
              authorisationFn("driver",
                <Invoices  />
              )
            }
          />
          {/* <Route
            path="/requests/overview"
            element={
              authorisationFn("admin",  <RequestOverview />)}
          /> */}
          <Route
            path="/analytics"
            element={
              authorisationFn("admin",  <SystemLogs />)}
          />
          <Route
            path="/earnings"
            element={
              authorisationFn("provider",  <Earnings />)}
          />
          <Route
            path="/users"
            element={
              authorisationFn("admin", <Users  />)
            }
          />
          <Route 
          path="/add_vehicle"
          element={<VehicleCreate user={user}  />}
          />
          <Route
        path="/chat/:id"
        element={
          <Chat user={user} />
        }
        />
        </Routes>
        </Grid>
        </Grid>
         
    </Router>
    
  );
}
