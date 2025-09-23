// RoleIndex.jsx
import { useLoaderData, Navigate } from "react-router-dom";
import { fetchData } from "../../services/fetchData";


export async function loader() {
  const data =
    (await fetchData({
      url: "/api/me",
      method: "GET",
    }));
  return { ...data };
}
/**
 * This component picks the correct index view based on user role.
 */
export default function RoleIndex() {
  const { user } = useLoaderData(); // apploader should return { user }

  if (!user) {
    // Redirect or show login if no user
    return <Navigate to="/signin" replace />;
  }

  switch (user.type) {
    case "Driver":
      return <Navigate to="/requests/create" replace />;
    case "Provider":
      return <Navigate to="/requests" replace />;
    case "Admin":
      return <Navigate to="/reports" replace />;
    default:
      return <p>Unauthorized: Unknown role</p>;
  }
}
