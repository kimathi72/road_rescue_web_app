import {
  Grid,
  Box,
  FormControl,
  InputLabel,
  TextField,
  Input,
  Button,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";

export default function InvoiceCreate({invoiceId, onItemAdded}) {
  const [item, setItem] = useState({});
  useEffect(() => {
   !!invoiceId && setItem((prev) => ({ ...prev, "invoice_id": invoiceId }));
  }, [invoiceId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(item);
    const res = await fetch("/api/invoice_items", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ invoice_item: item }),
    });
    const data = await res.json()
    console.log(data)
    onItemAdded(data)
  };
  return (
    <Grid container direction={"column"} gap={"2rem"}>
      <h5>invoice id: {invoiceId} </h5>
      
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <InputLabel>add invoice item</InputLabel>
          <Input
            type="number"
            onChange={(e) => {
              setItem((prev) => ({ ...prev, quantity: e.target.value }));
            }}
            placeholder="quantity"
          />
          <TextField
            type="text"
            placeholder="description"
            onChange={(e) => {
              setItem((prev) => ({ ...prev, description: e.target.value }));
            }}
          />
          <TextField
            type="number"
            placeholder="charge"
            onChange={(e) => {
              setItem((prev) => ({ ...prev, "cost": e.target.value }));
            }}
          />
          <Button type="submit" startIcon={<AddIcon />}>
            add
          </Button>
        </Stack>
      </form>
    </Grid>
  );
}
