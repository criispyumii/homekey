"use client";

import { Home } from "@mui/icons-material";
import { Box, IconButton } from "@mui/joy";
import Avatar from "@mui/joy/Avatar";
import Typography from "@mui/joy/Typography";
import ColorSchemeToggle from "../components/ColorSchemeToggle";

export default function Navbar() {
  return (
    <Box
      sx={{
        gridColumn: "1 / 5",
        gridRow: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        top: 0,
        px: 1.5,
        py: 1,
        zIndex: 10000,
        backgroundColor: "transparent",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <IconButton
          size="sm"
          variant="soft"
          onClick={() => window.location.reload()}
        >
          <Home />
        </IconButton>
        <Typography component="h1" fontWeight="xl" sx={{ color: "black" }}>
          HomeKey
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
        <Box
          sx={{
            gap: 1,
            alignItems: "center",
            display: { xs: "none", sm: "flex" },
          }}
        >
          <Avatar
            variant="outlined"
            size="sm"
            src="https://lh3.googleusercontent.com/ogw/AF2bZygrZCAWemMcvwfvgff4YSdz85IRr64BUTkjXNdKd0fd2g=s64-c-mo"
          />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography level="title-sm" sx={{ color: "black" }}>
              Daniel S.
            </Typography>
            <Typography level="body-xs" sx={{ color: "black" }}>
              dshaby@berkeley.edu
            </Typography>
          </Box>
        </Box>
        <ColorSchemeToggle variant="soft" sx={{ alignSelf: "center" }} />
      </Box>
    </Box>
  );
}
