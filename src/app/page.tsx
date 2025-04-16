"use client";
import { Typography } from "@mui/material";
import SpaceTable from "./_components/SpaceTable";
import { spaces } from "./_components/spaces";

export default function Home() {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        USAFA Spaces Scheduler
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        sx={{ fontWeight: "bold" }}
        gutterBottom
      >
        McDermott Library Spaces:
      </Typography>
      <SpaceTable spaces={spaces} />
    </div>
  );
}
