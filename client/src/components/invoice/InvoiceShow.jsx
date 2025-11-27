import React, { useState, useEffect, useContext, useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import {
  Grid,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import { CableContext } from "../../context/cable";
import { fetchData } from "../../services/fetchData";
import PaymentConfirmDialog from "../payment/PaymentConfirmDialog";
import InvoiceItemsManager from "./InvoiceItemsManager";

export async function loader({ params }) {
  const { user } = await fetchData({ url: "/api/me" });
  const invoice = await fetchData({ url: `/api/invoices/${params.invoiceId}` });
  return { user, invoice };
}

export default function InvoiceShow() {
  const { user, invoice } = useLoaderData();
  const cableContext = useContext(CableContext);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [checkoutId, setCheckoutId] = useState(null);
  const [error, setError] = useState(null);
  const [items, setItems] = useState(invoice.invoice_items || []);

  const canAddItems = user.type === "Provider" && invoice.request.provider_id === user.id;
  const canPay = user.type === "Driver" && invoice.is_submitted;
  const canPromptDriver = user.type === "Provider" && invoice.request.provider_id === user.id && !invoice.is_submitted;

  // Compute total dynamically
  const total = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + Number(item.cost || 0) * Number(item.quantity || 1),
      0
    );
  }, [items]);

  // Real-time payment updates
  useEffect(() => {
    if (!checkoutId || !cableContext?.cable) return;

    const channel = cableContext.cable.subscriptions.create(
      { channel: "MpesaChannel", checkoutRequestID: checkoutId },
      {
        received(data) {
          if (!data || !data.status) return setError("Invalid payment update received.");
          setPaymentStatus(data.status);
          setLoadingPayment(false);
        },
      }
    );
  }, [checkoutId, cableContext]);

  // Driver initiates payment
  const handlePayConfirm = async ({ phone_number }) => {
    setLoadingPayment(true);
    setError(null);

    try {
      const res = await fetchData({
        url: "/api/stkpush",
        method: "POST",
        submittedData: {
          mpesa: { invoice_id: invoice.id, amount: total, phoneNumber: phone_number },
        },
      });

      if (res?.CheckoutRequestID) setCheckoutId(res.CheckoutRequestID);
      else throw new Error("Invalid STK push response");
    } catch (err) {
      console.error(err);
      setError("Could not initiate payment.");
      setLoadingPayment(false);
    }
  };

  // Provider prompts driver to pay
  const handlePromptDriver = async () => {
    setLoadingPayment(true);
    setError(null);

    try {
      const res = await fetchData({
        url: "/api/invoices/prompt_payment",
        method: "POST",
        submittedData: { invoice_id: invoice.id },
      });

      if (res?.success) {
        setPaymentStatus("Driver Notified");
      } else {
        throw new Error("Failed to notify driver");
      }
    } catch (err) {
      console.error(err);
      setError("Could not prompt driver.");
    } finally {
      setLoadingPayment(false);
    }
  };

  const handleItemsChange = (updatedItem, type) => {
    if (type === "add") setItems((prev) => [...prev, updatedItem]);
    else if (type === "edit")
      setItems((prev) => prev.map((i) => (i.id === updatedItem.id ? updatedItem : i)));
    else if (type === "delete") setItems((prev) => prev.filter((i) => i.id !== updatedItem.id));
  };

  return (
    <Grid container spacing={3} sx={{ p: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md={8}>
              <Typography variant="h5" gutterBottom>
                Invoice #{invoice.id}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Request #{invoice.request_id} — Status: {invoice.status}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                color="primary"
                sx={{ textAlign: { xs: "left", md: "right" }, fontWeight: "bold" }}
              >
                Total: KES {total}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Alerts */}
      {error && <Grid item xs={12}><Alert severity="error">{error}</Alert></Grid>}
      {paymentStatus && !error && (
        <Grid item xs={12}>
          <Alert severity={paymentStatus === "success" ? "success" : "info"}>
            Payment status: {paymentStatus}
          </Alert>
        </Grid>
      )}

      {/* Invoice Items */}
      <Grid item xs={12}>
        <InvoiceItemsManager
          invoiceId={invoice.id}
          initialItems={items}
          onItemsChange={handleItemsChange}
        />
      </Grid>

      {/* Buttons */}
      <Grid item xs={12} md={4}>
        {canPay && (
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={() => setDialogOpen(true)}
            disabled={loadingPayment}
          >
            {loadingPayment ? <CircularProgress size={20} /> : "Pay Now"}
          </Button>
        )}
        {canPromptDriver && (
          <Button
            fullWidth
            variant="outlined"
            color="warning"
            onClick={handlePromptDriver}
            disabled={loadingPayment}
            sx={{ mt: canPay ? 2 : 0 }}
          >
            {loadingPayment ? <CircularProgress size={20} /> : "Prompt Driver to Pay"}
          </Button>
        )}
      </Grid>

      {/* Payment Dialog */}
      <PaymentConfirmDialog
        open={dialogOpen}
        amount={total}
        phone={user.phone}
        loading={loadingPayment}
        onClose={() => setDialogOpen(false)}
        onConfirm={handlePayConfirm}
      />
    </Grid>
  );
}
