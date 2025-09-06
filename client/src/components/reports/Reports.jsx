// src/pages/reports/Reports.jsx
import React from "react";
import { useLoaderData } from "react-router-dom";
import { fetchData } from "../../services/fetchData";
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import BuildIcon from "@mui/icons-material/Build";
import HistoryIcon from "@mui/icons-material/History";

// Loader
export async function loader() {
  const reports = await fetchData({ url: "/api/reports" });
  return { reports };
}

export default function Reports() {
  const { reports } = useLoaderData();

  if (!reports) return <p>Loading reports...</p>;

  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      <Grid  size={{xs:12}}>
        <Typography variant="h4" gutterBottom>
          Reports Dashboard
        </Typography>
      </Grid>

      {/* 🟢 Revenue */}
      {reports.revenue && (
        <Grid size={{ xs:12, md:6}}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              <AttachMoneyIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              Revenue (by Month)
            </Typography>
            <List>
              {Object.entries(reports.revenue).map(([month, total]) => (
                <ListItem key={month}>
                  <ListItemIcon>
                    <AttachMoneyIcon />
                  </ListItemIcon>
                  <ListItemText primary={`${month}`} secondary={`$${total}`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      )}

      {/* 🟢 Requests by Status */}
      {reports.requests && (
        <Grid size={{xs:12, md:6}}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              <AssignmentIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              Requests by Status
            </Typography>
            <List>
              {Object.entries(reports.requests).map(([status, count]) => (
                <ListItem key={status}>
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText primary={status} secondary={`${count}`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      )}

      {/* 🟢 Services breakdown (Admin only) */}
      {reports.services && (
        <Grid size={{xs:12, md:6}}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              <BuildIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              Requests by Service
            </Typography>
            <List>
              {Object.entries(reports.services).map(([service, count]) => (
                <ListItem key={service}>
                  <ListItemIcon>
                    <BuildIcon />
                  </ListItemIcon>
                  <ListItemText primary={service} secondary={`${count}`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      )}

      {/* 🟢 Outstanding Invoices */}
      {reports.outstanding_invoices && (
        <Grid  size={{xs:12}}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              <ReceiptLongIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              Outstanding Invoices
            </Typography>
            {reports.outstanding_invoices.length > 0 ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Invoice #</TableCell>
                    <TableCell>Request</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reports.outstanding_invoices.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell>{inv.id}</TableCell>
                      <TableCell>{inv.request_id}</TableCell>
                      <TableCell>{inv.status}</TableCell>
                      <TableCell>${inv.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Typography>No outstanding invoices 🎉</Typography>
            )}
          </Paper>
        </Grid>
      )}

      {/* 🟢 Past Requests (Driver only) */}
      {reports.past_requests && (
        <Grid  size={{xs:12}}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              <HistoryIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              Past Requests
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Request #</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.past_requests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell>{req.id}</TableCell>
                    <TableCell>{req.status}</TableCell>
                    <TableCell>{req.location?.city}</TableCell>
                    <TableCell>
                      {new Date(req.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      )}

      {/* 🟢 Driver Invoices */}
      {reports.invoices && (
        <Grid  size={{xs:12}}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              <ReceiptLongIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              Your Invoices
            </Typography>
            {reports.invoices.length > 0 ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Invoice #</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reports.invoices.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell>{inv.id}</TableCell>
                      <TableCell>{inv.status}</TableCell>
                      <TableCell>${inv.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Typography>No invoices yet.</Typography>
            )}
          </Paper>
        </Grid>
      )}
    </Grid>
  );
}
