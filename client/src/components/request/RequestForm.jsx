import SetLocation from "../location/SetLocation.jsx";
import ManageServices from "../service/ManageServices.jsx";
import { Button, Input, Stack, TextField } from "@mui/material";
import VehicleSelect from "../vehicle/VehicleSelect.jsx";

export default function RequestForm({ setRequest, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="form">
      <Stack spacing={1}>
        <SetLocation setData={setRequest} />
        <ManageServices setData={setRequest} />
        <VehicleSelect setData={setRequest} />

        <TextField
          fullWidth
          label="description"
          multiline
          onChange={(e) =>
            setRequest((prev) => ({
              ...prev,
              request_description: e.target.value,
            }))
          }
          minRows={3}
          placeholder="Enter description"
        />
      </Stack>
      <Button variant="contained" color="error" type="submit">
        Request Road Rescue
      </Button>
    </form>
  );
}
