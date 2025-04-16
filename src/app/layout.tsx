import type { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./_components/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Box, CssBaseline } from "@mui/material";
import Footer from "./_components/Footer";
import DatePickerProvider from "./_components/DatePickerProvider";

export const metadata: Metadata = {
  title: "USAFA Spaces Scheduler",
  description: "Scheduler for USAFA Spaces",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <DatePickerProvider>
              <CssBaseline />
              <Box sx={{ py: "4vh", px: "4vw", width: "100%" }}>{children}</Box>
              <Footer />
            </DatePickerProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
