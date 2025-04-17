"use client";
import {
  Autocomplete,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import SpaceTable from "./_components/SpaceTable";
import { useState } from "react";
import { spaces } from "../_components/spaces";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import { time } from "console";

export default function Schedule() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get("name");
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const [space, setSpace] = useState<string>(name ? name : "");
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [startTime, setStartTime] = useState<string>(start ? start : "");
  const [endTime, setEndTime] = useState<string>(end ? end : "");

  return (
    <div>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        USAFA Spaces Scheduler
      </Typography>
      <Paper variant="outlined" sx={{ padding: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={12}>
            <Typography>
              You are reserving as <strong>FirstName LastName</strong>{" "}
              (C00FirstName.LastName@afacademy.af.edu)
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: "grow" }}>
            <Autocomplete
              disablePortal
              value={space}
              options={spaces.map((space) => space.name)}
              onChange={(event: any) => {
                setStartTime("");
                setEndTime("");
                setSpace(event.target.textContent);
              }}
              renderInput={(params) => (
                <TextField {...params} fullWidth label="Space Name" />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: "auto" }}>
            <DatePicker
              value={date}
              label="Date"
              onChange={(event) => {
                setDate(dayjs(event));
              }}
              disablePast
            />
          </Grid>
          <Grid size={12}>
            <SpaceTable
              spaces={(() => {
                const match = spaces.find((s) => s.name === space);
                return match ? [match] : [];
              })()}
              day={date}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
            />
          </Grid>
          <Grid size={6}>
            <Autocomplete
              disablePortal
              disabled={space === ""}
              value={startTime}
              options={(() => {
                const match = spaces.find((s) => s.name === space);
                const times = match?.times.find((entry) =>
                  entry.date.isSame(date, "day")
                )?.times;
                let start = dayjs(endTime, "HHmm")
                  .subtract(30, "minutes")
                  .format("HHmm");
                let filteredTimes: string[] = [];
                while (times?.includes(start)) {
                  filteredTimes.push(start);
                  start = dayjs(start, "HHmm")
                    .subtract(30, "minutes")
                    .format("HHmm");
                }

                return endTime === "" ? (times ? times : []) : filteredTimes;
              })()}
              onChange={(event: any) => setStartTime(event.target.textContent)}
              renderInput={(params) => (
                <TextField {...params} fullWidth label="Start Time" />
              )}
            />
          </Grid>
          <Grid size={6}>
            <Autocomplete
              disablePortal
              disabled={space === ""}
              value={endTime}
              options={(() => {
                const match = spaces.find((s) => s.name === space);
                const times = match?.times.find((entry) =>
                  entry.date.isSame(date, "day")
                )?.times;
                let start = startTime;
                let filteredTimes: string[] = [];
                while (times?.includes(start)) {
                  start = dayjs(start, "HHmm")
                    .add(30, "minutes")
                    .format("HHmm");
                  filteredTimes.push(start);
                }

                return startTime === ""
                  ? times
                    ? times.map((time) =>
                        dayjs(time, "HHmm").add(30, "minutes").format("HHmm")
                      )
                    : []
                  : filteredTimes;
              })()}
              onChange={(event: any) => setEndTime(event.target.textContent)}
              renderInput={(params) => (
                <TextField {...params} fullWidth label="End Time" />
              )}
            />
          </Grid>
          <Grid size="grow">
            <Button type="submit" variant="contained">
              Reserve
            </Button>
          </Grid>
          <Grid size="auto">
            <Button
              onClick={() => router.push("/")}
              type="button"
              variant="contained"
              color="secondary"
            >
              Home
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
