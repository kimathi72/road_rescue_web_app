import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { fetchData } from "../../services/fetchData";

// Loader to fetch all users
export async function loader() {
  const users = await fetchData({
    url: "/api/users",
    method: "GET",
  });
  return { users };
}

export default function Users() {
  const { users: initialUsers } = useLoaderData();
  const [users, setUsers] = useState(initialUsers);

  // ✅ Toggle approval (approve or unapprove)
  const toggleApproval = async (id, approved) => {
    // Optimistic update
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, approved: !approved } : u
      )
    );

    try {
      const response = await fetchData({
        url: `/api/providers/${id}`,
        method: "PATCH",
        submittedData: { provider: { approved: !approved } },
      });

      // Check response structure — fetchData may already return parsed data
      if (!response || response.error) {
        throw new Error(response?.error || "Server error");
      }

      alert(
        !approved
          ? "✅ Provider approved successfully"
          : "🚫 Provider unapproved successfully"
      );
    } catch (err) {
      console.error(err);

      // Rollback on failure
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, approved: approved } : u
        )
      );

      alert(`❌ Failed to update provider: ${err.message}`);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold">User Management</h2>
      <table className="table-auto border-collapse border border-gray-400 w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Availability</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{u.id}</td>
              <td className="border px-4 py-2">{u.name}</td>
              <td className="border px-4 py-2">{u.email}</td>
              <td className="border px-4 py-2">{u.phone}</td>
              <td className="border px-4 py-2">{u.type || "Admin"}</td>
              <td className="border px-4 py-2">{u.availability_status || "-"}</td>
              <td className="border px-4 py-2 text-center">
                {u.type === "Provider" && (
                  <button
                    onClick={() => toggleApproval(u.id, u.approved)}
                    className={`px-3 py-1 rounded text-white ${
                      u.approved
                        ? "bg-red-600 hover:bg-red-700" // Unapprove
                        : "bg-green-600 hover:bg-green-700" // Approve
                    }`}
                  >
                    {u.approved ? "Unapprove" : "Approve"}
                  </button>
                )}
                {u.type !== "Provider" && "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
