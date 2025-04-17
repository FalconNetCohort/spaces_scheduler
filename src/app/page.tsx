"use client";
import {
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import SpaceTable from "./_components/SpaceTable";
import { spaces } from "./_components/spaces";
import { DatePicker } from "@mui/x-date-pickers";
import { ChevronLeft, ChevronRight, Search } from "@mui/icons-material";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

export default function Home() {
  const [date, setDate] = useState(dayjs());
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        USAFA Spaces Scheduler
      </Typography>
      <Grid container sx={{ mb: 2 }} alignItems="flex-end">
        <Grid size={{ xs: 12, sm: "grow" }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
            McDermott Library Spaces:
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: "auto" }}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <IconButton
              disabled={dayjs().isSame(date, "day") || dayjs().isAfter(date)}
              onClick={() => setDate(dayjs(date).subtract(1, "day"))}
            >
              <ChevronLeft />
            </IconButton>
            <DatePicker
              value={date}
              label="Date"
              onChange={(event) => {
                setDate(dayjs(event));
              }}
              disablePast
            />
            <IconButton>
              <ChevronRight
                onClick={() => setDate(dayjs(date).add(1, "day"))}
              />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
      <SpaceTable spaces={spaces} day={date} />
    </div>
  );
}
