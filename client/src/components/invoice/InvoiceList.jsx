// src/pages/invoices/InvoicesList.jsx
import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { fetchData } from "../../services/fetchData";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

// Loader
export async function loader() {
  const invoices = await fetchData({ url: "/api/invoices", method: "GET" });
  const user = await fetchData({ url: "/api/me", method: "GET" });
  return { invoices, user };
}

export default function InvoicesList() {
  const { user, invoices } = useLoaderData();

  return (
    <Grid container direction={'column'} spacing={3} sx={{ padding: 2 }}>
      <Grid size={{xs:12}}>
        <Typography variant="h4" gutterBottom>
          {user.type === "Admin"
            ? "All Invoices"
            : user.type === "Provider"
            ? "My Issued Invoices"
            : "My Invoices"}
        </Typography>
      </Grid>

      {invoices.length > 0 ? (
        <Grid size={{xs:12}}>
          <Card>
            <CardContent>
              <List>
                {invoices.map((invoice) => (
                  <ListItem key={invoice.id} disablePadding>
                    <ListItemButton
                      component={Link}
                      to={`/invoices/${invoice.id}`}
                    >
                      <ReceiptLongIcon sx={{ mr: 2, color: "primary.main" }} />
                      <ListItemText
                        primary={`Invoice #${invoice.id} - ${invoice.status}`}
                        secondary={`Request #${invoice.request.id} — ${invoice.request.issue}`}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      ) : (
        <Grid size={{xs:12}}>
          <Typography variant="body1" color="text.secondary">
            No invoices found.
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
