"use client";
import * as React from "react";
import Button from "@mui/joy/Button";
import Drawer from "@mui/joy/Drawer";
import DialogTitle from "@mui/joy/DialogTitle";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import ModalClose from "@mui/joy/ModalClose";
import Stack from "@mui/joy/Stack";
import Slider, { sliderClasses } from "@mui/joy/Slider";
import FilterAltOutlined from "@mui/icons-material/FilterAltOutlined";
import OrderSelector from "./OrderSelector";
import { useAppSelector } from "../redux/hooks";
import { selectHomes, selectPages } from "../redux/features/searchHomes.slice";
import { Typography } from "@mui/joy";

function valueText(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

export default function Filters() {
  const [open, setOpen] = React.useState(false);
  const { currentPage, totalPages } = useAppSelector(selectPages);
  const homes = useAppSelector(selectHomes);

  return (
    <Stack
      useFlexGap
      direction="row"
      spacing={{ xs: 0, sm: 2 }}
      justifyContent={{ xs: "space-between" }}
      alignItems={"center"}
      flexWrap="wrap"
      sx={{ minWidth: 0 }}
    >
      <Button
        variant="soft"
        color="neutral"
        startDecorator={<FilterAltOutlined />}
        onClick={() => setOpen(true)}
      >
        Filters
      </Button>
      {homes && homes.length > 0 && (
        <Typography sx={{ color: "black" }}>
          Page {currentPage} of {totalPages}{" "}
        </Typography>
      )}
      <OrderSelector />
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Stack useFlexGap spacing={3} sx={{ p: 2 }}>
          <DialogTitle>Filters</DialogTitle>
          <ModalClose />
          <FormControl>
            <FormLabel>Price range</FormLabel>
            <Slider
              defaultValue={[2000, 4900]}
              step={100}
              min={0}
              max={10000}
              getAriaValueText={valueText}
              valueLabelDisplay="auto"
              valueLabelFormat={valueText}
              marks={[
                { value: 0, label: "$0" },
                { value: 5000, label: "$5,000" },
                { value: 10000, label: "$10,000" },
              ]}
              sx={{
                [`& .${sliderClasses.markLabel}[data-index="0"]`]: {
                  transform: "none",
                },
                [`& .${sliderClasses.markLabel}[data-index="2"]`]: {
                  transform: "translateX(-100%)",
                },
              }}
            />
          </FormControl>
        </Stack>
      </Drawer>
    </Stack>
  );
}
