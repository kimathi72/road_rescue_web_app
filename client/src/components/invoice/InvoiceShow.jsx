// src/pages/invoices/InvoiceShow.jsx
import React from "react";
import { useLoaderData, Form, redirect } from "react-router-dom";
import { fetchData } from "../../services/fetchData";

// 🟢 Loader for invoice show
export async function loader({ params }) {
  const {user} = await fetchData({ url: "/api/me", method: "GET" });
  const invoice = await fetchData({
    url: `/api/invoices/${params.invoiceId}`,
    method: "GET",
  });
  console.log(invoice)
  return { user, invoice };
}

// 🟢 Action for creating invoice items
export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  updates['invoice_id'] = parseInt(updates['invoice_id'])
  updates['cost'] = parseFloat(updates['cost'])
  console.log(updates)
  await fetchData({
    url: `/api/invoice_items`,
    method: "POST",
    submittedData: { "invoice_item": updates },
  });

  // Refresh page after adding item
  return redirect(`/invoices/${params.invoiceId}`);
}

export default function InvoiceShow() {
  const { user, invoice } = useLoaderData();

  const canAddItems =
    user.type === "Provider" && invoice.request.provider_id === user.id;

  return (
    <div>
      <h3>Invoice #{invoice.id}</h3>
      <p>
        Request ID: {invoice.request_id} — Status: {invoice.status} — Total: $
        {invoice.total}
      </p>

      <h4>Invoice Items</h4>
      {invoice.invoice_items?.length > 0 ? (
        <ul>
          {invoice.invoice_items.map((item) => (
            <li key={item.id}>
              {item.description} — ${item.cost}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items added yet.</p>
      )}

      {canAddItems && (
        <div>
          <h4>Add Invoice Item</h4>
          <Form method="post">
           <input type="hidden" name="invoice_id" value={invoice.id}/>
            <input
            type="number"
            name="quantity"
            placeholder="quantity"
            required
            />
            <input
              type="text"
              name="description"
              placeholder="Item description"
              required
            />
            <input
              type="number"
              name="cost"
              step="0.01"
              placeholder="Amount"
              required
            />
            <button type="submit">Add Item</button>
          </Form>
        </div>
      )}
    </div>
  );
}
