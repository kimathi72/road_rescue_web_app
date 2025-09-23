import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  CircularProgress
} from "@mui/material";

/**
 * Props:
 *  open: boolean – dialog state
 *  amount: number – invoice total
 *  phone: string – default phone
 *  loading: boolean – show loading spinner
 *  onClose: fn – close dialog
 *  onConfirm: fn({phone_number}) – confirm payment
 */
export default function PaymentConfirmDialog({
  open,
  amount,
  phone,
  loading,
  onClose,
  onConfirm
}) {
  const [phoneNumber, setPhoneNumber] = useState(phone || "");

  const handleConfirm = () => {
    if (!phoneNumber) return;
    onConfirm({ phone_number: phoneNumber });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Payment</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          You are about to pay <strong>KES {amount}</strong> via M-Pesa.
        </Typography>
        <TextField
          fullWidth
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          margin="normal"
        />
        <Typography variant="caption">
          An STK Push will be sent to your phone to complete the payment.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          disabled={!phoneNumber || loading}
        >
          {loading ? <CircularProgress size={20} /> : "Proceed to Pay"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
