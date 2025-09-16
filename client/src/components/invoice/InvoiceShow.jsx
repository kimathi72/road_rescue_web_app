import React, { useState, useEffect, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import {
  Grid,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  CircularProgress,
} from "@mui/material";
import { fetchData } from "../../services/fetchData";
import { CableContext } from "../../context/cable";
import PaymentConfirmDialog from "../payment/PaymentConfirmDialog";
import InvoiceCreate from "./InvoiceCreate";

export async function loader({ params }) {
  const { user } = await fetchData({ url: "/api/me" });
  const invoice = await fetchData({ url: `/api/invoices/${params.invoiceId}` });
  return { user, invoice };
}

export default function InvoiceShow() {
  const { user, invoice } = useLoaderData();
  const cableContext = useContext(CableContext);

  const canAddItems = user.type === "Provider" && invoice.request.provider_id === user.id;
  const canPay = user.type === "Driver" && invoice.is_submitted;
  const canUndo = user.type === "Admin" && invoice.is_submitted;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [checkoutId, setCheckoutId] = useState(null);
  const [error, setError] = useState(null);
  const [items, setItems] = useState(invoice.invoice_items || []);

  // 📡 Subscribe to MpesaChannel for real-time updates
  useEffect(() => {
    if (!checkoutId || !cableContext?.cable) return;

    const channel = cableContext.cable.subscriptions.create(
      { channel: "MpesaChannel", checkoutRequestID: checkoutId },
      {
        connected() {
          console.log("Subscribed to Mpesa updates:", checkoutId);
        },
        received(data) {
          console.log("Received STK update:", data);

          // Defensive checks
          if (!data || !data.status) {
            setError("Invalid payment update received.");
            setLoadingPayment(false);
            return;
          }

          setPaymentStatus(data.status);
          setLoadingPayment(false);

          if (data.status === "failed") {
            setError(data.message || "Payment failed. Please try again.");
          } else if (data.status === "success") {
            setLoadingPayment(false);
            setPaymentStatus(data.status)
            // Optionally refresh invoice items or mark invoice paid
            alert(`Payment successful! Response: ${data.message || "N/A"}`);
          }
        },
        disconnected() {
          console.warn("Disconnected from MpesaChannel");
        },
      }
    );

  }, [checkoutId, cableContext]);

  // 💳 Handle "Pay Now" confirmation
  const handlePayConfirm = async ({ phone_number }) => {
    setLoadingPayment(true);
    setError(null);
    setPaymentStatus("Processing…");

    try {
      const res = await fetchData({
        url: "/api/stkpush",
        method: "POST",
        submittedData: {
          mpesa: {
            invoice_id: invoice.id,
            amount: invoice.total,
            phoneNumber: phone_number,
          },
        },
      });

      if (res?.CheckoutRequestID) {
        setCheckoutId(res.CheckoutRequestID);
        setDialogOpen(false);
      } else {
        throw new Error("Invalid STK push response");
      }
    } catch (err) {
      console.error(err);
      setError("Could not initiate payment.");
      setLoadingPayment(false);
      setPaymentStatus(null);
    }
  };

  const handleItemAdded = (newItem) => {
    setItems((prev) => [...prev, newItem]);
  };

  return (
    <Grid container direction="column" spacing={3} sx={{ p: 3 }}>
      <Grid>
        <Typography variant="h5" gutterBottom>
          Invoice #{invoice.id}
        </Typography>
        <Typography>
          Request #{invoice.request_id} — Status: {invoice.status} — Total:{" "}
          <strong>KES {invoice.total}</strong>
        </Typography>
      </Grid>

      {error && (
        <Grid>
          <Alert severity="error">{error}</Alert>
        </Grid>
      )}
      {paymentStatus && !error && (
        <Grid>
          <Alert severity={paymentStatus === "success" ? "success" : "info"}>
            Payment status: {paymentStatus}
          </Alert>
        </Grid>
      )}

      <Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Quantity</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length > 0 ? (
                items.map((item) => (
                  <TableRow key={item.id || item.description}>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>KES {item.cost}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>No items added yet.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      {canAddItems && (
        <Grid>
          <InvoiceCreate invoiceId={invoice.id} onItemAdded={handleItemAdded} />
        </Grid>
      )}

      <Grid container spacing={2}>
        {canPay && (
          <Grid container width={"100%"}>
            <Button
            fullWidth
              variant="contained"
              onClick={() => setDialogOpen(true)}
              disabled={loadingPayment}
            >
              {loadingPayment ? <CircularProgress size={20} /> : "Pay Now"}
            </Button>
          </Grid>
        )}
        {canUndo && (
          <Grid container width={"100%"}>
            <Button fullWidth variant="outlined" color="error">
              Undo Submission
            </Button>
          </Grid>
        )}
      </Grid>

      <PaymentConfirmDialog
        open={dialogOpen}
        amount={invoice.total}
        phone={user.phone}
        loading={loadingPayment}
        onClose={() => setDialogOpen(false)}
        onConfirm={handlePayConfirm}
      />
    </Grid>
  );
}
