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

export default function Schedule() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get("name");
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const [space, handleSpace] = useState<string>(name ? name : "");
  const [startTime, handleStartTime] = useState<string>(start ? start : "");
  const [endTime, handleEndTime] = useState<string>(end ? end : "");

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
                handleStartTime("");
                handleEndTime("");
                handleSpace(event.target.textContent);
              }}
              renderInput={(params) => (
                <TextField {...params} fullWidth label="Space Name" />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: "auto" }}>
            <DatePicker label="Date" />
          </Grid>
          <Grid size={12}>
            <SpaceTable
              spaces={(() => {
                const match = spaces.find((s) => s.name === space);
                return match ? [match] : [];
              })()}
              handleStartTime={handleStartTime}
              handleEndTime={handleEndTime}
            />
          </Grid>
          <Grid size={6}>
            <Autocomplete
              disablePortal
              disabled={space === ""}
              value={startTime}
              options={(() => {
                const match = spaces.find((s) => s.name === space);
                return match
                  ? (() => {
                      const availableTimes = match.times.map(Number);
                      const end = Number(endTime);
                      const result: string[] = [];

                      let next = end;
                      let minutes = next % 100;

                      if (minutes === 30) {
                        next -= 30;
                      } else {
                        next -= 70;
                      }

                      while (availableTimes.includes(next)) {
                        minutes = next % 100;
                        console.log(next, minutes, result);

                        if (minutes === 30) {
                          result.push(
                            next < 1000
                              ? "0" + next.toString()
                              : next.toString()
                          );
                          next -= 30;
                        } else {
                          result.push(
                            next < 1000
                              ? "0" + next.toString()
                              : next.toString()
                          );
                          next -= 70;
                        }
                      }
                      return endTime !== "" ? result : match.times;
                    })()
                  : [];
              })()}
              onChange={(event: any) =>
                handleStartTime(event.target.textContent)
              }
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
                return match
                  ? (() => {
                      const availableTimes = match.times.map(Number); // convert to numbers
                      const start = Number(startTime);
                      const result: string[] = [];

                      let next = start;

                      while (availableTimes.includes(next)) {
                        const minutes = next % 100;

                        // Calculate next time in 30-minute steps
                        if (minutes === 0) {
                          next += 30;
                          result.push(
                            next < 1000
                              ? "0" + next.toString()
                              : next.toString()
                          );
                        } else {
                          next += 70; // 30 + 40 to roll over the hour
                          result.push(
                            next < 1000
                              ? "0" + next.toString()
                              : next.toString()
                          );
                        }
                      }
                      return startTime != ""
                        ? result
                        : availableTimes.map((t) => {
                            const minutes = t % 100;

                            if (minutes === 0) {
                              t += 30;
                              return t < 1000
                                ? "0" + t.toString()
                                : t.toString();
                            } else {
                              t += 70;
                              return t < 1000
                                ? "0" + t.toString()
                                : t.toString();
                            }
                          });
                    })()
                  : [];
              })()}
              onChange={(event: any) => handleEndTime(event.target.textContent)}
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
