import CreateLocation from "../location/CreateLocation.jsx";
import ManageServices from "../service/ManageServices.jsx";
import { Button, Input, Stack, TextField } from "@mui/material";
import VehicleSelect from "../vehicle/VehicleSelect.jsx";

export default function RequestForm({ setRequest, handleSubmit }) {
  
  return (
    <form onSubmit={handleSubmit} className="form">
      <Stack spacing={1}>
        <CreateLocation setData={setRequest} />
        <ManageServices setData={setRequest}  />
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
        Submit Rescue Request
      </Button>
    </form>
  );
}
