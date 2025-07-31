import { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../node_modules/leaflet-geosearch/dist/geosearch.css";
import NavBar from "./components/navigation/NavBar.jsx";
import Signin from "./components/auth/Signin.jsx";
import Signup from "./components/auth/Signup.jsx";
import Signout from "./components/auth/Signout.jsx";
import Users from "./components/user/Index.jsx";
import Invoices from "./components/invoice/InvoiceIndex.jsx";
import "./assets/styles/mystyles.css";
import SystemLogs from "./components/admin/SystemLogs.jsx";
import JobsList from "./components/responder/JobsList.jsx";
import Account from "./components/responder/Account.jsx";
import RequestOverview from "./components/admin/RequestOverview.jsx";
import RequestCreate from "./components/request/RequestCreate.jsx";
import RescueQueue from "./components/driver/RescueQueue.jsx";
import Notify from "./components/navigation/Notify.jsx";
import AssignedJobs from './components/responder/AssignedJobs.jsx'

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

  const authorizedUser = (role) => {
    if (!!token && isLoaded) {
      return !!(role === user.role);
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
    <div  className='container'>
    <Router 
      future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }}>     
      <NavBar user={!!user && user} />
        <Routes>
          <Route
            path="/signin"
            element={<Signin setUser={setUser} setIsLoaded={setIsLoaded} />}
          />
          <Route
            path="/"
            exact
            element={
            authorizedUser("provider") ? <JobsList />
              : authorizedUser("driver") ? (
                <RequestCreate handleSubmit={handleSubmit} />
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
            path="/jobs_list"
            element={
              authorisationFn("provider",
                <JobsList handleSubmit={handleSubmit} />
              )
            }
          />
          <Route
            path="/assigned_jobs"
            element={
              authorisationFn("provider", <AssignedJobs />)}
          />
          <Route
            path="/account"
            element={
              authorisationFn("provider",
                <Account handleSubmit={handleSubmit} />
              )
            }
          />
          <Route
            path="/new_rescue"
            element={authorisationFn("driver", <RequestCreate />)}
          />
          <Route
            path="/rescue_queue"
            element={authorisationFn("driver", <RescueQueue />)}
          />
          <Route
            path="/invoices/*"
            element={
              authorisationFn("driver",
                <Invoices handleSubmit={handleSubmit} />
              )
            }
          />
          <Route
            path="/jobs_overview"
            element={
              authorisationFn("admin",  <RequestOverview />)}
          />
          <Route
            path="/system_logs"
            element={
              authorisationFn("admin",  <SystemLogs />)}
          />
          <Route
            path="/users/*"
            element={
              authorisationFn("admin", <Users handleSubmit={handleSubmit} />)
            }
          />
        </Routes>
         
    </Router>
    </div>
  );
}
