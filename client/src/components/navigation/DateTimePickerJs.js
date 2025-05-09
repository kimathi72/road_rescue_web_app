import React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function DateTimePickerJs({ setData }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <DemoItem label="Date of occurrence">
          <DateTimePicker
            value={dayjs(new Date())}
            onchange={(value) => {
              setData((prev) => ({ ...prev, date_time: value }));
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
