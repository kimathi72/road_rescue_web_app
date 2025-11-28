// Full updated InvoiceShow.jsx with driver-phone fallback + redirect to chat
import React, { useState, useEffect, useContext, useMemo } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const cableContext = useContext(CableContext);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [checkoutId, setCheckoutId] = useState(null);
  const [error, setError] = useState(null);
  const [items, setItems] = useState(invoice.invoice_items || []);

  const canAddItems = user.type === "Provider" && invoice.request.provider_id === user.id;
  const canPay = user.type === "Driver" && invoice.is_submitted;
  const canPromptDriver = user.type === "Provider" && invoice.request.provider_id === user.id;

  const total = useMemo(() => {
    return items.reduce((sum, i) => sum + Number(i.cost || 0) * Number(i.quantity || 1), 0);
  }, [items]);

  useEffect(() => {
    if (!checkoutId || !cableContext?.cable) return;

    cableContext.cable.subscriptions.create(
      { channel: "MpesaChannel", checkoutRequestID: checkoutId },
      {
        received(data) {
          if (!data?.status) {
            setError("Invalid payment update received.");
            setLoadingPayment(false);
            return;
          }
          setPaymentStatus(data.status);
          setLoadingPayment(false);
        },
      }
    );
  }, [checkoutId, cableContext]);

  const triggerSTKPush = async (phoneNumber) => {
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
            amount: total,
            phoneNumber,
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

  const handlePayConfirm = ({ phone_number }) => {
    triggerSTKPush(phone_number);
  };

  const handlePromptDriverPayment = () => {
    const driverPhone = invoice?.request?.driver?.phone;
    if (!driverPhone) return;
    triggerSTKPush(driverPhone);
  };

  const handleMissingDriverPhone = () => {
    navigate(`/chats/${invoice.request_id}`);
  };

  const handleItemsChange = (updatedItem, type) => {
    if (type === "add") setItems((p) => [...p, updatedItem]);
    if (type === "edit") setItems((p) => p.map((i) => (i.id === updatedItem.id ? updatedItem : i)));
    if (type === "delete") setItems((p) => p.filter((i) => i.id !== updatedItem.id));
  };

  return (
    <Grid container spacing={3} sx={{ p: { xs: 2, md: 4 } }}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h5">Invoice #{invoice.id}</Typography>
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

      {error && (
        <Grid item xs={12}>
          <Alert severity="error">{error}</Alert>
        </Grid>
      )}

      {paymentStatus && !error && (
        <Grid item xs={12}>
          <Alert severity={paymentStatus === "success" ? "success" : "info"}>
            Payment status: {paymentStatus}
          </Alert>
        </Grid>
      )}

      <Grid item xs={12}>
        <InvoiceItemsManager
          invoiceId={invoice.id}
          initialItems={items}
          onItemsChange={handleItemsChange}
        />
      </Grid>

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
          <>
            {invoice?.request?.driver?.phone ? (
              <Button
                fullWidth
                variant="outlined"
                color="warning"
                onClick={handlePromptDriverPayment}
                disabled={loadingPayment}
                sx={{ mt: 2 }}
              >
                {loadingPayment ? <CircularProgress size={20} /> : "Prompt Driver to Pay"}
              </Button>
            ) : (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleMissingDriverPhone}
                sx={{ mt: 2 }}
              >
                Ask Driver for Phone Number
              </Button>
            )}
          </>
        )}
      </Grid>

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
