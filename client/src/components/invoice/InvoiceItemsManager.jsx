import React, { useState, useEffect } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";
import { fetchData } from "../../services/fetchData";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function InvoiceItemsManager({ invoiceId, initialItems = [], onItemsChange, onTotalChange }) {
  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState({ quantity: "", description: "", cost: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Compute total whenever items change
  useEffect(() => {
    const total = items.reduce((sum, i) => sum + Number(i.cost || 0) * Number(i.quantity || 0), 0);
    onTotalChange?.(total);
  }, [items, onTotalChange]);

  const handleNewChange = (field, value) => {
    setNewItem((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddItem = async () => {
    if (!newItem.quantity || !newItem.description || !newItem.cost) return;
    setLoading(true);
    setError(null);
    try {
      const savedItem = await fetchData({
        url: "/api/invoice_items",
        method: "POST",
        submittedData: { invoice_item: { ...newItem, invoice_id: invoiceId } },
      });
      setItems((prev) => [...prev, savedItem]);
      onItemsChange?.(savedItem, "add");
      setNewItem({ quantity: "", description: "", cost: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to add item.");
    } finally {
      setLoading(false);
    }
  };

  const handleInlineEdit = async (id, field, value) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, [field]: value } : i))
    );

    try {
      await fetchData({
        url: `/api/invoice_items/${id}`,
        method: "PATCH",
        submittedData: { invoice_item: { [field]: value } },
      });
    } catch (err) {
      console.error(err);
      setError("Failed to update item.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    setLoading(true);
    setError(null);
    try {
      await fetchData({ url: `/api/invoice_items/${id}`, method: "DELETE" });
      setItems((prev) => prev.filter((i) => i.id !== id));
      onItemsChange?.({ id }, "delete");
    } catch (err) {
      console.error(err);
      setError("Failed to delete item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container direction="column" spacing={2}>
      {error && <Alert severity="error">{error}</Alert>}

      <Typography variant="h6" gutterBottom>
        Invoice Items
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Quantity</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Cost (per unit)</TableCell>
              <TableCell>Total</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No items yet.
                </TableCell>
              </TableRow>
            )}
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleInlineEdit(item.id, "quantity", e.target.value)}
                    variant="standard"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    value={item.description}
                    onChange={(e) => handleInlineEdit(item.id, "description", e.target.value)}
                    variant="standard"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={item.cost}
                    onChange={(e) => handleInlineEdit(item.id, "cost", e.target.value)}
                    variant="standard"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {Number(item.quantity || 0) * Number(item.cost || 0)}
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {/* New Item Row */}
            <TableRow>
              <TableCell>
                <TextField
                  type="number"
                  value={newItem.quantity}
                  onChange={(e) => handleNewChange("quantity", e.target.value)}
                  variant="standard"
                  size="small"
                  placeholder="Qty"
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="text"
                  value={newItem.description}
                  onChange={(e) => handleNewChange("description", e.target.value)}
                  variant="standard"
                  size="small"
                  placeholder="Description"
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={newItem.cost}
                  onChange={(e) => handleNewChange("cost", e.target.value)}
                  variant="standard"
                  size="small"
                  placeholder="Cost"
                />
              </TableCell>
              <TableCell>
                {Number(newItem.quantity || 0) * Number(newItem.cost || 0)}
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={handleAddItem}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={16} /> : "Add"}
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
