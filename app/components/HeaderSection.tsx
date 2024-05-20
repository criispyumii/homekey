import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

export default function HeaderSection() {
  return (
    <Stack
      sx={{
        pb: 2,
        textAlign: "center",
      }}
    >
      <Stack justifyContent="space-between" sx={{ width: "100%" }}>
        <Typography level="h1" fontSize={80}>
          <span style={{ color: "#F7A599" }}>Home</span>
          <span style={{ color: "#42c079" }}>Key</span>
        </Typography>
      </Stack>
      <Typography level="title-lg" fontSize={24}>
        Search for any type of home you want to buy
      </Typography>
    </Stack>
  );
}
