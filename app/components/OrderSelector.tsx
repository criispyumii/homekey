import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";

export default function OrderSelector() {
  return (
    <Dropdown>
      <MenuButton
        variant="soft"
        color="primary"
        endDecorator={<ArrowDropDown />}
        sx={{ whiteSpace: "nowrap" }}
      >
        Order by
      </MenuButton>
      <Menu sx={{ minWidth: 120 }}>
        <MenuItem>Price</MenuItem>
        <MenuItem>Date</MenuItem>
        <MenuItem>Distance</MenuItem>
      </Menu>
    </Dropdown>
  );
}
