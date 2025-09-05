// src/pages/invoices/InvoicesList.jsx
import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { fetchData } from "../../services/fetchData";

// Loader for invoices

export async function loader() {
  const invoices = await fetchData({ url: "/api/invoices", method: "GET" });
  const user = await fetchData({ url: "/api/me", method: "GET" });
  return { invoices, user };
}
export default function InvoicesList() {
  const { user, invoices } = useLoaderData();

  return (
    <div>
      <h3>
        {user.type === "Admin"
          ? "All Invoices"
          : user.type === "Provider"
          ? "My Issued Invoices"
          : "My Invoices"}
      </h3>

      {invoices.length > 0 ? (
        <ul>
          {invoices.map((invoice) => (
            <li key={invoice.id}>
              <Link to={`/invoices/${invoice.id}`}>
                Invoice #{invoice.id} — Request #{invoice.request_id}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No invoices found.</p>
      )}
    </div>
  );
}
