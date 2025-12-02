"use client";
import React, { useState, useMemo } from "react";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, IconButton, Box, Typography } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import HomeWorkIcon from "@mui/icons-material/HomeWork"; // modern real estate icon
import { getTheme } from "./theme";

export default function RootLayout({ children }) {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {/* HEADER */}
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 24px",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              backdropFilter: "blur(6px)",
              position: "sticky",
              top: 0,
              zIndex: 20,
            }}
          >
            {/* Logo + Title */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <HomeWorkIcon sx={{ fontSize: 34, color: "#1976d2" }} />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  background: "linear-gradient(45deg, #1976d2, #0d47a1)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                LandMarkX
              </Typography>
            </Box>

            {/* Dark / Light Toggle */}
            <IconButton
              onClick={() => setMode(prev => (prev === "light" ? "dark" : "light"))}
              sx={{ color: theme.palette.text.primary }}
            >
              {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </header>

          {/* MAIN CONTENT */}
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
