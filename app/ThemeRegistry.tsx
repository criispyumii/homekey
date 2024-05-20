"use client";
import * as React from "react";
import {
  CssVarsProvider,
  extendTheme,
  getInitColorSchemeScript,
} from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";

const theme = extendTheme({
  fontFamily: {
    display: "DM Serif Display",
    body: "DM Serif Display",
  },
});

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CssVarsProvider theme={theme} disableTransitionOnChange>
      <CssBaseline />
      {getInitColorSchemeScript()}
      {children}
    </CssVarsProvider>
  );
}
