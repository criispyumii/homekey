"use client";
import { Box } from "@mui/joy";
import { SearchPanel } from "./components/SearchPanel";
import { HomesList } from "./components/HomesList";
import Navbar from "./components/Navbar";
import { useAppSelector } from "./redux/hooks";
import {
  selectHomes,
  selectIsLoadingHomes,
} from "./redux/features/searchHomes.slice";
import bg from "../public/homes-background.jpg";

export const App = () => {
  const isLoadingHomes = useAppSelector(selectIsLoadingHomes);
  const homes = useAppSelector(selectHomes);
  const isDefaultPage = !homes.length && !isLoadingHomes;

  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        width: "100%",
        display: "grid",
        gridTemplateRows: "55px 130px 100px 70px auto 60px",
        gridTemplateColumns: "1fr 2fr 0.7fr 100px",
        background: "#9CD5CF",
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${bg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          gridRow: "1 / 7",
          gridColumn: "1 / 5",
        }}
      />
      {!isDefaultPage && <Navbar />}
      <SearchPanel isDefaultPage={isDefaultPage} />
      {!isDefaultPage && <HomesList />}
    </Box>
  );
};
