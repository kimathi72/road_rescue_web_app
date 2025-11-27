// InvoiceHeader.jsx
import React from "react";
import {
  Box,
  Stack,
  Typography,
  Chip,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";

// Map invoice status -> chip color & label (tune to your domain)
const STATUS_MAP = {
  draft: { label: "Draft", color: "default" },
  reported: { label: "Reported", color: "warning" },
  accepted: { label: "Accepted", color: "primary" },
  in_progress: { label: "In progress", color: "info" },
  completed: { label: "Completed", color: "success" },
  submitted: { label: "Submitted", color: "secondary" },
  paid: { label: "Paid", color: "success" },
  cancelled: { label: "Cancelled", color: "error" },
};

function formatKES(amount) {
  const n = Number(amount || 0);
  return n.toLocaleString("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 2 });
}

/**
 * InvoiceHeader
 * Props:
 *  - invoice: invoice object (expects id, request_id, status, created_at)
 *  - total: number (current total; if undefined it falls back to invoice.total)
 *  - onPrint?: () => void
 *  - onDownload?: () => void
 */
export default function InvoiceHeader({ invoice = {}, total, onPrint, onDownload }) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const status = invoice?.status || "draft";
  const statusInfo = STATUS_MAP[status] || { label: status, color: "default" };
  const displayTotal = typeof total !== "undefined" ? total : invoice?.total ?? 0;
  const created = invoice?.created_at ? new Date(invoice.created_at).toLocaleString() : null;

  return (
    <Box sx={{ mb: 2 }}>
      <Stack
        direction={isSm ? "column" : "row"}
        justifyContent="space-between"
        alignItems={isSm ? "flex-start" : "center"}
        spacing={2}
      >
        {/* Left: invoice title + subtitle */}
        <Box>
          <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
            Invoice #{invoice?.id ?? "—"}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              Request #{invoice?.request_id ?? "—"}
            </Typography>

            <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 16 }} />

            <Chip
              label={statusInfo.label}
              color={statusInfo.color}
              size="small"
              sx={{ textTransform: "capitalize" }}
            />

            {created && (
              <>
                <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 16 }} />
                <Typography variant="caption" color="text.secondary">
                  Created {created}
                </Typography>
              </>
            )}
          </Stack>
        </Box>

        {/* Right: total + actions */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Box textAlign="right">
            <Typography variant="caption" color="text.secondary">
              Total
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: 700, color: "primary.main", mt: 0.5 }}
            >
              {formatKES(displayTotal)}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<PrintIcon />}
              onClick={onPrint}
            >
              Print
            </Button>

            <Button
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<DownloadIcon />}
              onClick={onDownload}
            >
              Download
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
