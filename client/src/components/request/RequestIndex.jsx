// src/pages/RequestIndex.jsx
import React from "react";
import { useLoaderData } from "react-router-dom";
import RequestsList from "./RequestsList";
import { fetchData } from "../../services/fetchData";

// Loader for react-router
export async function loader() {
  // Fetch logged-in user
  const {user} = await fetchData({ url: "/api/me", method: "GET" });
  console.log(user)
  const requests = await fetchData({ url: "/api/requests", method: "GET" });

  // if (user.type === "Admin") {
  //   // Admin sees ALL requests
   
  // } else if (user.type === "Provider") {
  //   // Provider sees only reported requests in their city
  //   const city = user.location?.city;
  //   requests = await fetchData({
  //     url: `/api/requests?status=reported&city=${encodeURIComponent(city)}`,
  //     method: "GET",
  //   });
  // } else if (user.type === "Driver") {
  //   // Driver sees their own requests
  //   requests = await fetchData({
  //     url: `/api/users/${user.id}/requests`,
  //     method: "GET",
  //   });
  // }
console.log(requests)
  return { user, requests };
}

// Component
export default function RequestIndex() {
  const { user, requests } = useLoaderData();
  const title =
    user.type === "Admin"
      ? "All Requests"
      : user.type === "Provider"
      ? "Requests in Your City"
      : "My Requests";

  return requests && requests.length > 0 ? (
    <RequestsList title={title} requests={requests} />
  ) : (<>
    {
      user?.type == "Provider" &&<p>No Requests posted at your location... please Change location</p>
    }
    {
      user?.type == "Driver" && <p>No Requests created yet. . . please navigate to create request</p>
    }
    {
      user?.type == "Admin"&& <p>No Requests posted yet</p>
    }
    </>
  );
}
