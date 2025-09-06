// src/pages/invoices/InvoiceShow.jsx
import React from "react";
import { useLoaderData, Form, redirect } from "react-router-dom";
import { fetchData } from "../../services/fetchData";
import {
  Button,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

// 🟢 Loader
export async function loader({ params }) {
  const user = await fetchData({ url: "/api/me", method: "GET" });
  const invoice = await fetchData({
    url: `/api/invoices/${params.invoiceId}`,
    method: "GET",
  });
  return { user, invoice };
}

// 🟢 Action for creating invoice items
export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  updates["invoice_id"] = parseInt(updates["invoice_id"]);
  updates["cost"] = parseFloat(updates["cost"]);

  await fetchData({
    url: `/api/invoice_items`,
    method: "POST",
    submittedData: { invoice_item: updates },
  });

  return redirect(`/invoices/${params.invoiceId}`);
}

export default function InvoiceShow() {
  const { user, invoice } = useLoaderData();

  const canAddItems =
    user.type === "Provider" && invoice.request.provider_id === user.id;

  const canPay = user.type === "Driver" && invoice.is_submitted;
  const canUndo = user.type === "Admin" && invoice.is_submitted;

  return (
    <Grid container direction="column" spacing={4} sx={{ p: 3 }}>
      {/* Invoice Summary */}
      <Grid>
        <Typography variant="h5" gutterBottom>
          Invoice #{invoice.id}
        </Typography>
        <Typography variant="body1">
          Request ID: {invoice.request_id} — Status: {invoice.status}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1, color: "red", fontWeight: "bold" }}>
          Total: ${invoice.total}
        </Typography>
      </Grid>

      {/* Add Invoice Items Form (Provider only) */}
      {canAddItems && !invoice.is_submitted && (
        <Grid >
          <Typography variant="h6" gutterBottom>
            Add Invoice Item
          </Typography>
          <Form method="post" style={{ display: "flex", gap: "1rem" }}>
            <input type="hidden" name="invoice_id" value={invoice.id} />

            <input type="number" name="quantity" placeholder="Quantity" required />
            <input type="text" name="description" placeholder="Item description" required />
            <input
              type="number"
              name="cost"
              step="0.01"
              placeholder="Amount"
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Add Item
            </Button>
          </Form>
        </Grid>
      )}

      {/* Invoice Items Table */}
      <Grid >
        <Typography variant="h6" gutterBottom>
          Invoice Items
        </Typography>
        {invoice.invoice_items?.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoice.invoice_items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.cost}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>No items added yet.</Typography>
        )}
      </Grid>

      {/* Actions */}
      <Grid >
        <Box display="flex" gap={2}>
          {/* Provider → Submit Invoice */}
          {canAddItems && !invoice.is_submitted && (
            <Form method="patch" action={`/invoices/${invoice.id}/edit`}>
              <input type="hidden" name="is_submitted" value={!invoice.is_submitted} />
              <Button type="submit" variant="contained" color="success">
                Submit Invoice
              </Button>
            </Form>
          )}

          {/* Driver → Pay Invoice */}
          {canPay && (
            <Form method="post" action={`/invoices/${invoice.id}/pay`}>
              <Button type="submit" variant="contained" color="primary">
                Pay Invoice
              </Button>
            </Form>
          )}

          {/* Admin → Undo Submission */}
          {canUndo && (
            <Form method="patch" action={`/invoices/${invoice.id}/undo`}>
              <input type="hidden" name="is_submitted" value={false} />
              <Button type="submit" variant="outlined" color="warning">
                Undo Submission
              </Button>
            </Form>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
