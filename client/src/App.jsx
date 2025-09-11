import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { CableProvider } from "./context/cable";
import { BottomNavigation, BottomNavigationAction, Grid, Typography } from "@mui/material";
import { fetchData } from "./services/fetchData";
import NavBar from "./components/navigation/NavBar";
import { useEffect, useState } from "react";
import CopyrightIcon from '@mui/icons-material/Copyright';

const token = localStorage.getItem("jwt");

export async function loader() {
  const data =
    !!token &&
    (await fetchData({
      url: "/api/me",
      method: "GET",
    }));
  return { ...data };
}

export default function App() {
  const { user } = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    
    !token && navigate("/signin");
  }, [token, navigate]);

  return (
    <Grid container direction={'column'} width={'100%'} height={'100%'}>
    <Grid
      id="app"
      container
      direction={{ xs: "column", md: "column", lg: "row" }}
      justifyContent={"center"}
    >
       <NavBar type={user?.type}/>
      <CableProvider>
        <Grid container padding={"1rem"} direction={"column"} size={{xs: 12, md:12, lg: 9}} sx={{overflowY: "auto"}}>
          <Typography variant="overline" gutterBottom sx={{ display: "block" }}>
            Welcome {user?.name || "to Road Rescue"}
          </Typography>
          <Outlet />
        </Grid>
      </CableProvider>
      
    </Grid>
    <BottomNavigation
      showLabels
      >
        <BottomNavigationAction label={`Road Rescue App - ${new Date().getFullYear()}`}/>
      </BottomNavigation>
    </Grid>
  );
}

// import { useCallback, useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import "../node_modules/leaflet-geosearch/dist/geosearch.css";
// import NavBar from "./components/navigation/NavBar.jsx";
// import Signin from "./components/auth/Signin.jsx";
// import Signup from "./components/auth/Signup.jsx";
// import Signout from "./components/auth/Signout.jsx";
// import Users from "./components/user/Index.jsx";
// import VehicleIndex from "./components/vehicle/VehicleIndex.jsx";
// import Invoices from "./components/invoice/InvoiceIndex.jsx";
// import "./assets/styles/mystyles.css";
// import RequestShow from "./components/request/RequestShow.jsx";
// import SystemLogs from "./components/admin/SystemLogs.jsx";
// import Account from "./components/responder/Account.jsx";
// import RequestOverview from "./components/admin/RequestOverview.jsx";
// import RescueQueue from "./components/request/RequestQueue.jsx";
// import Notify from "./components/navigation/Notify.jsx";
// import RequestEdit from './components/request/RequestEdit.jsx'
// import RequestIndex from "./components/request/RequestIndex.jsx";
// import Chat from "./components/chat/Chat.jsx";
// import { Grid } from "@mui/material";
// import Earnings from "./components/invoice/Earnings.jsx";
// import ProviderDashBoard from "./components/responder/ProviderDashBoard.jsx";
// import DriverDashboard from "./components/driver/DriverDashboard.jsx";
// import AdminDashboard from "./components/admin/AdminDashboard.jsx";
// import MyLocation from "./components/location/MyLocation.jsx";
// import InvoiceCreate from "./components/invoice/InvoiceCreate.jsx";
// import InvoiceShow from "./components/invoice/InvoiceShow.jsx";

// export default function App() {
//   //set user State , default to null, update state on sign in/up
//   const [user, setUser] = useState(null);
//   const token = localStorage.getItem("jwt");
//   const [isLoaded, setIsLoaded] = useState(false);

//   // await fetch api call for current_user data
//   const getUser = useCallback(async () => {
//     const result = await fetch("/api/me", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//       },
//     });

//     //await Promise results.json()
//     const data = await result.json();
//     setUser(data.user);
//     setIsLoaded(true)
//   }, [setUser]);
//   //on app load get current user
//   useEffect(() => {
//     console.log(!!token)
//     !!token && getUser();
//   }, [getUser, token]);

//   // callback function to do async fetch request. pass as prop to child component

//   //on App load, query for current user, auto login if signed in, otherwise sign in first.

//   const authorizedUser = (perm) => {
//     if (!!user && isLoaded) {
//       return !!(perm === user.role);
//     } else {
//       return false;
//     }
//   };
//   const authorisationFn = (role, element)=>{
//     if (authorizedUser(role)){
//        return element
//       }else {
//       return <Notify
//      severity={"warning"}
//      message={`only ${role} role has authorised access`}
//       >
//         <Link to='/' >Go back Home</Link>
//       </Notify>
//     }
//   }
//   return (
//     <Router
//       future={{
//     v7_startTransition: true,
//     v7_relativeSplatPath: true,
//   }}>
//     <Grid container direction={{xs: 'column', md:'row', lg: 'row'}}>
//       <NavBar user={!!user && user} />
//       <Grid container size={{xs: 12, md: 8, lg: 10}} justifyContent={'center'} p={2}>
//         <Routes>
//           <Route
//             path="/signin"
//             element={<Signin setUser={setUser} setIsLoaded={setIsLoaded} />}
//           />
//           <Route
//             path="/"
//             exact
//             element={
//             authorizedUser("provider") ? <ProviderDashBoard user={!!user  && user} />
//               : authorizedUser("driver") ? (
//                 <DriverDashboard user={!!user && user}  />
//               ) : authorizedUser("admin") ? (
//                 <AdminDashboard user={!!user && user} />
//               ) : (
//                 <Signin setUser={setUser} setIsLoaded={setIsLoaded} />
//               )
//             }
//           />
//           <Route
//             path="/signup"
//             element={<Signup setUser={setUser} setIsLoaded={setIsLoaded} />}
//           />
//           <Route
//             path="/signout"
//             element={<Signout setUser={setUser} setIsLoaded={setIsLoaded} />}
//           />

//           <Route
//             path="/requests"
//             element={
//                 <RequestIndex user={user}/>
//             }
//           />

//           <Route
//             path="/requests/create"
//             element={authorisationFn("driver", <RequestCreate />)}
//           />
//           <Route
//           path="/requests/:id"
//           element={
//             <RequestShow user={!!user && user}/>
//           }
//           />
//           <Route
//           path="/requests/:id/edit"
//           element={
//             <RequestEdit user={user}/>
//           }
//           />
//           <Route
//             path="/requests/queue"
//             element={ !!user && <RescueQueue user={user} />}
//           />
//           <Route
//             path="/invoices/list"
//             element={
//               authorisationFn("driver",
//                 <Invoices  />
//               )
//             }
//           />
//           <Route
//             path="/invoices/:id"
//             element={<InvoiceShow role={!!user && user.role} /> }
//           />
//           {/* <Route
//             path="/requests/overview"
//             element={
//               authorisationFn("admin",  <RequestOverview />)}
//           /> */}
//           <Route
//             path="/analytics"
//             element={
//               authorisationFn("admin",  <SystemLogs />)}
//           />
//           <Route
//             path="/vehicles/*"
//             element={
//               authorisationFn("driver",  <VehicleIndex />)}
//           />
//           <Route
//             path="/users"
//             element={
//               authorisationFn("admin", <Users  />)
//             }
//           />

//           <Route
//             path="/location"
//             element={
//                authorisationFn("provider" , <MyLocation user={user} />)
//             }
//           />
//           <Route
//         path="/chat/:id"
//         element={
//           <Chat user={user} />
//         }
//         />
//         </Routes>
//         </Grid>
//         </Grid>

//     </Router>

//   );
// }
