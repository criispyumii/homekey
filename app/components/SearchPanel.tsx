"use client";
import { Stack } from "@mui/joy";
import HeaderSection from "./HeaderSection";
import Search from "./Search";

interface Props {
  isDefaultPage: boolean;
}

export const SearchPanel = ({ isDefaultPage }: Props) => {
  return (
    <Stack
      sx={{
        px: { xs: 2, md: 4 },
        gridRow: "3 / 5",
        gridColumn: "1 / 5",
        transition: "transform 1.5s ease-in-out",
        transform: isDefaultPage ? "translateY(0)" : "translateY(-180px)",
      }}
    >
      <HeaderSection />
      <Search />
    </Stack>
  );
};
