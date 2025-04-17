"use client";
import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { times } from "./times";
import { Space } from "./spaces";
import { useRouter } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";

type SpaceTableProps = {
  spaces: Space[];
  day: Dayjs;
};

export default function SpaceTable({ spaces, day }: SpaceTableProps) {
  const router = useRouter();

  return (
    <Paper variant="outlined" sx={{ padding: 2 }}>
      <Grid container>
        <Grid
          container
          direction="column"
          size={{ xs: 4, sm: 2 }}
          spacing={0.5}
          sx={{ py: 0.5 }}
        >
          <Typography
            variant="body1"
            component="h2"
            sx={{ fontWeight: "bold" }}
          >
            Space
          </Typography>
          <Divider />
          {spaces.map((space) => (
            <>
              <Typography variant="body1" component="h2">
                {space.name}
              </Typography>
              <Divider />
            </>
          ))}
        </Grid>

        <Grid size={{ xs: 8, sm: 10 }}>
          <Box sx={{ overflowX: "auto" }}>
            <Grid container direction="column" sx={{ minWidth: "max-content" }}>
              <Stack>
                <Grid container wrap="nowrap">
                  {times.map((time) => (
                    <Grid
                      size={0.75}
                      key={`header-${time}`}
                      sx={{
                        minWidth: 50,
                        pr: 2,
                        py: 0.5,
                      }}
                    >
                      <Typography variant="body1">{time}</Typography>
                    </Grid>
                  ))}
                </Grid>
                <Divider />
              </Stack>

              {spaces.map((space) => {
                const matchedEntry = space.times.find((entry) =>
                  dayjs(entry.date).isSame(day, "day")
                );

                return (
                  <Stack key={space.name}>
                    <Grid container wrap="nowrap">
                      {times.map((time) => {
                        const halfHourTime =
                          time.slice(0, 2) + "3" + time.slice(3);
                        const isTimeAvailable =
                          matchedEntry?.times.includes(time);
                        const isHalfHourAvailable =
                          matchedEntry?.times.includes(halfHourTime);

                        return (
                          <Grid
                            key={time}
                            size={0.75}
                            sx={{
                              minWidth: 50,
                              flexShrink: 0,
                              height: 32,
                            }}
                          >
                            <Box
                              sx={{
                                width: "100%",
                                height: "100%",
                                position: "relative",
                                display: "flex",
                              }}
                            >
                              {[
                                { isAvailable: isTimeAvailable, time },
                                {
                                  isAvailable: isHalfHourAvailable,
                                  time: halfHourTime,
                                },
                              ].map(({ isAvailable, time: slotTime }, i) =>
                                isAvailable ? (
                                  <Box
                                    key={i}
                                    sx={(theme) => ({
                                      width: "50%",
                                      m: 0.1,
                                      backgroundColor:
                                        theme.palette.success.main,
                                      color: theme.palette.getContrastText(
                                        theme.palette.success.main
                                      ),
                                      cursor: "pointer",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      "&:hover": {
                                        backgroundColor:
                                          theme.palette.success.dark,
                                      },
                                    })}
                                    onClick={() => {
                                      const start = slotTime;
                                      const end = dayjs(slotTime, "HHmm")
                                        .add(30, "minutes")
                                        .format("HHmm");

                                      router.push(
                                        `/schedule?name=${space.name}&start=${start}&end=${end}`
                                      );
                                    }}
                                  >
                                    &nbsp;
                                  </Box>
                                ) : (
                                  <Box
                                    key={i}
                                    sx={(theme) => ({
                                      width: "50%",
                                      opacity: "50%",
                                      m: 0.1,
                                      backgroundImage: `repeating-linear-gradient(45deg, ${theme.palette.grey[400]} 0px, ${theme.palette.grey[400]} 5px, ${theme.palette.grey[100]} 5px, ${theme.palette.grey[100]} 10px)`,
                                    })}
                                  />
                                )
                              )}
                            </Box>
                          </Grid>
                        );
                      })}
                    </Grid>
                    <Divider />
                  </Stack>
                );
              })}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
