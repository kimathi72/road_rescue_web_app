// Signup.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate, Form, redirect } from "react-router-dom";
import {
  Button,
  MenuItem,
  Grid,
  TextField,
  Paper,
  Stack,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import { fetchData } from "../../services/fetchData";
import useDocumentTitle from "../../hooks/useDocumentTitle";

/* ----------------------------------------------
 * Action (server-side handling via react-router)
 * ---------------------------------------------- */
export async function action({ request }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  // Ensure phone is present as a string
  if ("phone" in updates) updates.phone = String(updates.phone || "");

  const data = await fetchData({
    url: "/api/users",
    method: "POST",
    submittedData: { user: updates },
  });

  if (!!data && data.user) {
    // optionally send welcome email (existing logic)
    await fetchData({
      url: "/api/mailings",
      method: "POST",
      submittedData: {
        notification: {
          to: data.user.email,
          subject: "Welcome to Road Rescue App!",
          html_content: `<h1>Hello ${data.user.name}</h1><p>Your account was created successfully.</p>`,
        },
      },
    });

    if ("jwt" in data) localStorage.setItem("jwt", data.jwt);

    // redirect to homepage after successful signup
    return redirect("/");
  }

  // fallback: reload (could be improved to return errors)
  return null;
}

/* ----------------------------------------------
 * Component
 * ---------------------------------------------- */
export default function Signup() {
  useDocumentTitle("Road Rescue - Signup");
  const roles = ["Driver", "Provider"];
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  // client-side state for immediate validation / feedback
  const [formState, setFormState] = useState({
    type: "Driver",
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  // Prevent submitting if passwords don't match (we still let action handle server-side validation)
  const handleSubmit = (e) => {
    // Using react-router <Form> will POST to action; intercept to run client validations
    if (formState.password !== formState.password_confirmation) {
      e.preventDefault();
      setErrorMsg("Passwords do not match.");
      setSnackbarOpen(true);
      return;
    }
    // Optionally: basic phone normalization could be done here
    // allow submit to continue
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ p: { xs: 2, md: 4 } }}
    >
      <Grid item xs={12} sm={10} md={7} lg={5}>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom>
            Create an account
          </Typography>

          <Form method="post" id="signupForm" onSubmit={handleSubmit} replace>
            <Stack spacing={2}>
              <TextField
                select
                label="Account Type"
                name="type"
                value={formState.type}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, type: e.target.value }))
                }
                required
                fullWidth
                variant="outlined"
                helperText="Please select account type"
              >
                {roles.map((r) => (
                  <MenuItem key={r} value={r}>
                    {r}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Full name"
                name="name"
                value={formState.name}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, name: e.target.value }))
                }
                required
                fullWidth
                variant="outlined"
                autoComplete="name"
              />

              <TextField
                label="Email address"
                name="email"
                value={formState.email}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, email: e.target.value }))
                }
                required
                fullWidth
                variant="outlined"
                type="email"
                autoComplete="email"
              />

              <TextField
                label="Phone number"
                name="phone"
                value={formState.phone}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, phone: e.target.value }))
                }
                required
                fullWidth
                variant="outlined"
                type="tel"
                placeholder="+2547XXXXXXXX" // Kenya-style placeholder
                helperText="Include country code (e.g. +254...)"
              />

              <TextField
                label="Password"
                name="password"
                value={formState.password}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, password: e.target.value }))
                }
                required
                fullWidth
                variant="outlined"
                type="password"
                autoComplete="new-password"
              />

              <TextField
                label="Confirm password"
                name="password_confirmation"
                value={formState.password_confirmation}
                onChange={(e) =>
                  setFormState((s) => ({
                    ...s,
                    password_confirmation: e.target.value,
                  }))
                }
                required
                fullWidth
                variant="outlined"
                type="password"
                autoComplete="new-password"
              />

              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                sx={{ py: 1.2, fontWeight: 600 }}
              >
                Sign up
              </Button>

              <Button
                component={Link}
                to="/login"
                variant="text"
                fullWidth
                sx={{ textTransform: "none" }}
              >
                Already have an account? Log in
              </Button>
            </Stack>
          </Form>
        </Paper>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
