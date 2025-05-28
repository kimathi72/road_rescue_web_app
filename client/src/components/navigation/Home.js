import React from "react";
import { Route, Routes } from "react-router-dom";
// import RequestIndex from "../request/RequestIndex.js";
// import VehicleIndex from "../vehicle/VehicleIndex.js";
// import IncidentIndex from "../incident/IncidentIndex.js";
// import ClaimsIndex from "../claim/ClaimsIndex.js";

export default function Home({
  user,
  handleSubmit,
  authorized_user,
  isLoaded,
}) {
  return (
    <>
      {isLoaded ? (
        <Routes>
          {/* <Route
            path="/incidents/*"
            element={
              <IncidentIndex
                user={user}
                handleSubmit={handleSubmit}
                authorized_user={authorized_user}
              />
            }
          /> */}
          {/* <Route
            path="/claims/*"
            element={
              <ClaimsIndex
                user={user}
                handleSubmit={handleSubmit}
                authorized_user={authorized_user}
              />
            }
          /> */}
          {/* <Route
            path="/requests/*"
            element={
              <RequestIndex
                user={user}
                handleSubmit={handleSubmit}
                authorized_user={authorized_user}
              />
            }
          />
          <Route
            path="/vehicles/*"
            element={
              <VehicleIndex
                user={user}
                handleSubmit={handleSubmit}
                authorized_user={authorized_user}
              />
            }
          /> */}
          {/* <Route
            exact
            path="/*"
            element={
              <IncidentIndex
                user={user}
                handleSubmit={handleSubmit}
                authorized_user={authorized_user}
              />
            }
          /> */}

          <Route
            path="/driver/*"
            element={
              <DriverIndex user={user} authorized_user={authorized_user} />
            }
          />
          <Route
            path="/assessor/*"
            element={
              <AssessorIndex
                user={user}
                authorized_user={authorized_user}
              />
            }
          />
          <Route
            path="/provider/*"
            element={
              <ProviderIndex
                user={user}
                authorized_user={authorized_user}
              />
            }
          />
          <Route
            path="/insurer/*"
            element={
              <InsurerIndex user={user} authorized_user={authorized_user} />
            }
          />
        </Routes>
      ) : (
        <p>Loading app</p>
      )}
    </>
  );
}
