import { useCallback, useEffect, useState } from "react";
import { Routes, Route} from "react-router-dom";
import '../node_modules/leaflet-geosearch/dist/geosearch.css';
import NavBar from "./components/navigation/NavBar.jsx";
import Signin from "./components/auth/Signin.jsx";
import Signup from "./components/auth/Signup.jsx";
import Signout from "./components/auth/Signout.jsx";
import Requests from "./components/request/RequestIndex.jsx";
import Users from "./components/user/Index.jsx";
import Invoices from "./components/invoice/InvoiceIndex.jsx";
import "./assets/styles/mystyles.css";
import { Grid, Stack } from "@mui/material";
import Map from "./components/location/Map.jsx";
import SystemLogs from "./components/admin/SystemLogs.jsx";
import JobsList from "./components/responder/JobsList.jsx";
import Account from "./components/responder/Account.jsx";

export default function App() {
  //set user State , default to null, update state on sign in/up
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("jwt");
  const [isLoaded, setIsLoaded] = useState(false);
  const getUser = useCallback(async () => {
    // await fetch api call for current_user data
  
    const result = await fetch("/api/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    //await promise results.json()
    const data = await result.json();
    setUser(data.user);
    setIsLoaded(true);
   
  }, [setUser]);

  useEffect(() => {
    getUser(); //call our  current user usecallback function
  }, [getUser]);

  // callback function to do async fetch request. pass as prop to child component
  const handleSubmit = async (url, method, obj) => {
    try {
      const results = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: obj && JSON.stringify(obj),
      });
      const data = await results.json();
      console.log(data);
    } catch (error) {
      alert(error);
    }
  };

  //on App load, query for current user, auto login if signed in, otherwise sign in first.

  const authorizedUser = useCallback(
    (role) => {
      if (role !== user.role) {
        return false
      }else{
        return true
      }
    },
    [user]
  );

  return (
    <Grid className="container">
      <NavBar user={!!user && user} />
      <Stack className="mainDiv" minHeight={'40rem'}>
          <Routes>
            <Route
              path="/signin"
              element={
                <Signin
                user={user}
                  setUser={setUser}
                  setIsLoaded={setIsLoaded}
                />
              }
            />
            <Route
              path="/"
              exact
              element={ <Signin   user={user}    setUser={setUser}    setIsLoaded={setIsLoaded} />
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
              path="/rescues/*"
              element={
                !!token &&
                isLoaded && (
                  <Requests
                    user={user}
                    handleSubmit={handleSubmit}
                    authorizedUser={authorizedUser}
                  />
                )
              }
            />
             
            
            <Route
              path="/jobs_list"
              element={
                !!token &&
                isLoaded && (
                  <JobsList
                    user={user}
                    handleSubmit={handleSubmit}
                    authorizedUser={authorizedUser}
                  />
                )
              }
            />
            <Route
              path="/account"
              element={
                !!token &&
                isLoaded && (
                  <Account
                    user={user}
                    handleSubmit={handleSubmit}
                    authorizedUser={authorizedUser}
                  />
                )
              }
            />
            

            <Route
              path="/invoices/*"
              element={
                !!token &&
                isLoaded && (
                  <Invoices
                    user={user}
                    handleSubmit={handleSubmit}
                    authorizedUser={authorizedUser}
                  />
                )
              }
            />

            <Route
              path="/system_logs"
              element={
                !!token &&
                isLoaded && (
                  <SystemLogs
                    user={user}
                    handleSubmit={handleSubmit}
                    authorizedUser={authorizedUser}
                  />
                )
              }
            />
            <Route
              path="/users/*"
              element={
                !!token &&
                isLoaded && (
                  <Users
                    user={user}
                    handleSubmit={handleSubmit}
                    authorizedUser={authorizedUser}
                  />
                )
              }
            />
          </Routes>
        </Stack>
    </Grid>
  );
}
