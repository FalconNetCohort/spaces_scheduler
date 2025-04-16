"use client";
import { Divider, Grid, Typography, IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useColorScheme } from "@mui/material/styles";

export default function Footer() {
  const { mode, setMode } = useColorScheme();
  if (!mode) return null;
  return (
    <>
      <Divider />
      <footer>
        <Grid
          container
          sx={{ px: "4vw", alignItems: "center", pt: 1 }}
          spacing={2}
        >
          <Grid size="grow">
            <Typography variant="caption" component="p">
              © 2025 FalconNet
            </Typography>
          </Grid>
          <Grid size="auto">
            {mode === "dark" ? (
              <IconButton
                onClick={() => {
                  setMode("light");
                }}
              >
                <DarkMode />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  setMode("dark");
                }}
              >
                <LightMode />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </footer>
    </>
  );
}
